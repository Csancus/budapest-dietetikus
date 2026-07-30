/*
 * GET /api/stats?pw=...
 *
 * A napi számlálókat adja vissza. A jelszó a SZAMOK_PW környezeti
 * változóból jön (Vercel > Settings > Environment Variables).
 */
import { EVENTS, readCounters } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const expected = process.env.SZAMOK_PW;
  if (!expected) {
    res.status(500).json({ error: 'A SZAMOK_PW környezeti változó nincs beállítva.' });
    return;
  }

  const given = (req.query?.pw ?? '').toString();
  if (given !== expected) {
    res.status(401).json({ error: 'Hibás jelszó' });
    return;
  }

  try {
    const data = await readCounters();
    const days = Object.keys(data).sort().reverse();
    const total = {};
    EVENTS.forEach(e => { total[e] = days.reduce((s, d) => s + (data[d]?.[e] || 0), 0); });
    res.status(200).json({ events: EVENTS, days, data, total });
  } catch (err) {
    console.error('stats failed:', err?.message);
    res.status(500).json({ error: 'Nem sikerült beolvasni a számlálókat.' });
  }
}
