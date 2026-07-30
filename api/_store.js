/*
 * Közös Blob-tároló a kattintásméréshez.
 *
 * A tárolt JSON alakja:
 *   {
 *     "2026-07-30": { "telefon": 4, "foglalas": 1 },   // napi összesítés
 *     "_oldalak":   { "telefon": { "/dietetikus-vac": 3, "/": 1 } },
 *     "_teszt":     { days: {...}, pages: {...} }      // fejlesztői alapvonal
 *   }
 *
 * FONTOS – adatvédelem: kizárólag aggregált darabszámot tárolunk, esemény és
 * oldal szerint. Se IP, se user agent, se azonosító, se süti, se localStorage.
 * Az oldal útvonala a saját site-unk URL-je, nem a látogatóról szóló adat.
 */
import { head, get, put, BlobPreconditionFailedError } from '@vercel/blob';

export const PATH = 'szamok/counters.json';
export const PAGES_KEY = '_oldalak';
export const TEST_KEY = '_teszt';

/** Engedélyezett eseménynevek – bármi más elutasítva. */
export const EVENTS = ['foglalas', 'foglalas_gomb', 'telefon', 'form_kuldes', 'form_siker'];

/** Nem naptári nap kulcsok – a napi listából ki kell hagyni őket. */
export const META_KEYS = [PAGES_KEY, TEST_KEY];

/** Budapest szerinti YYYY-MM-DD (a szerver UTC-ben jár). */
export function today() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Budapest',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
}

/**
 * Útvonal-tisztítás. Csak a saját oldalaink útvonalait fogadjuk el, hogy
 * szemét ne tudja felfújni a tárolót. Query stringet és hash-t eldobunk.
 */
export function cleanPath(raw) {
  if (typeof raw !== 'string') return null;
  let p = raw.split('?')[0].split('#')[0].trim();
  if (!p.startsWith('/')) return null;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  if (p === '') p = '/';
  if (p.length > 80) return null;
  if (!/^\/[a-z0-9/\-._]*$/i.test(p)) return null;
  return p;
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

async function write(data, etag) {
  await put(PATH, JSON.stringify(data), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
    ...(etag ? { ifMatch: etag } : {}),
  });
}

export async function readCounters() {
  const { data } = await readWithEtag();
  return data;
}

/** Atomi növelés: feltételes írás ETag-gel, ütközés esetén újrapróbál. */
export async function increment(event, page) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const { data, etag } = await readWithEtag();
    const day = today();

    data[day] = data[day] || {};
    data[day][event] = (data[day][event] || 0) + 1;

    if (page) {
      data[PAGES_KEY] = data[PAGES_KEY] || {};
      data[PAGES_KEY][event] = data[PAGES_KEY][event] || {};
      data[PAGES_KEY][event][page] = (data[PAGES_KEY][event][page] || 0) + 1;
    }

    try {
      await write(data, etag);
      return true;
    } catch (err) {
      if (err instanceof BlobPreconditionFailedError) continue; // párhuzamos írás
      throw err;
    }
  }
  return false;
}

/**
 * Az aktuális állást fejlesztői teszt-alapvonalként rögzíti: ami eddig
 * összejött, az próbálgatás volt, nem valódi látogató. A /szamok oldal
 * ezt külön jelöli és levonja.
 */
export async function markAsTest() {
  for (let attempt = 0; attempt < 4; attempt++) {
    const { data, etag } = await readWithEtag();

    const days = {};
    for (const [k, v] of Object.entries(data)) {
      if (META_KEYS.includes(k)) continue;
      days[k] = { ...v };
    }
    const pages = JSON.parse(JSON.stringify(data[PAGES_KEY] || {}));
    data[TEST_KEY] = { days, pages };

    try {
      await write(data, etag);
      return data[TEST_KEY];
    } catch (err) {
      if (err instanceof BlobPreconditionFailedError) continue;
      throw err;
    }
  }
  return null;
}
