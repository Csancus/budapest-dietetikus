/*
 * Közös Blob-tároló a kattintásméréshez.
 *
 * Egyetlen privát JSON blob tartja a napi számlálókat:
 *   { "2026-07-30": { "foglalas": 4, "telefon": 7, ... }, ... }
 *
 * FONTOS – adatvédelem: kizárólag aggregált darabszámot tárolunk.
 * Se IP, se user agent, se azonosító, se süti, se localStorage.
 */
import { head, get, put, BlobPreconditionFailedError } from '@vercel/blob';

export const PATH = 'szamok/counters.json';

/** Engedélyezett eseménynevek – bármi más elutasítva. */
export const EVENTS = ['foglalas', 'foglalas_gomb', 'telefon', 'form_kuldes', 'form_siker'];

/** Budapest szerinti YYYY-MM-DD (a szerver UTC-ben jár). */
export function today() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Budapest',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
}

async function readWithEtag() {
  let etag = null;
  try {
    const meta = await head(PATH);
    etag = meta?.etag ?? null;
  } catch {
    return { data: {}, etag: null }; // még nincs blob
  }
  const res = await get(PATH, { access: 'private', useCache: false });
  if (!res) return { data: {}, etag };
  const text = res.stream ? await new Response(res.stream).text() : '';
  try {
    return { data: text ? JSON.parse(text) : {}, etag };
  } catch {
    return { data: {}, etag };
  }
}

export async function readCounters() {
  const { data } = await readWithEtag();
  return data;
}

/** Atomi növelés: feltételes írás ETag-gel, ütközés esetén újrapróbál. */
export async function increment(event) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const { data, etag } = await readWithEtag();
    const day = today();
    data[day] = data[day] || {};
    data[day][event] = (data[day][event] || 0) + 1;

    try {
      await put(PATH, JSON.stringify(data), {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 0,
        ...(etag ? { ifMatch: etag } : {}),
      });
      return true;
    } catch (err) {
      // párhuzamos írás – újraolvasunk és megpróbáljuk megint
      if (err instanceof BlobPreconditionFailedError) continue;
      throw err;
    }
  }
  return false;
}
