/*
 * POST /api/track   body: {"e":"telefon"}
 *
 * Egy aggregált napi számlálót növel. A kérésről SEMMIT nem tárolunk:
 * se IP-t, se user agentet, se azonosítót. Nem tesz le sütit.
 */
import { EVENTS, increment, cleanPath } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let event, page = null;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    event = body?.e;
    page = cleanPath(body?.p);   // melyik oldalról jött – érvénytelen útvonal esetén null
  } catch {
    event = undefined;
  }

  if (!EVENTS.includes(event)) {
    res.status(400).json({ error: 'Unknown event' });
    return;
  }

  try {
    await increment(event, page);
  } catch (err) {
    console.error('track failed:', err?.message);
    // A látogató felé sose hibázzunk – a mérés nem funkció.
  }

  res.status(204).end();
}
