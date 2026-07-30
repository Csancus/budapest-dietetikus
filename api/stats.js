/*
 * GET /api/stats?pw=...            – napi számok + oldalankénti bontás
 * GET /api/stats?pw=...&marktest=1 – az eddigi állást teszt-alapvonalnak jelöli
 *
 * A jelszó a SZAMOK_PW környezeti változóból jön.
 */
import { EVENTS, PAGES_KEY, TEST_KEY, META_KEYS, readCounters, markAsTest } from './_store.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const expected = process.env.SZAMOK_PW;
  if (!expected) {
    res.status(500).json({ error: 'A SZAMOK_PW környezeti változó nincs beállítva.' });
    return;
  }
  if ((req.query?.pw ?? '').toString() !== expected) {
    res.status(401).json({ error: 'Hibás jelszó' });
    return;
  }

  try {
    if (req.query?.marktest === '1') await markAsTest();

    const data = await readCounters();
    const test = data[TEST_KEY] || { days: {}, pages: {} };
    const testDays = test.days || {};
    const testPages = test.pages || {};
    const allPages = data[PAGES_KEY] || {};

    const days = Object.keys(data).filter(d => !META_KEYS.includes(d)).sort().reverse();

    const total = {}, testTotal = {};
    EVENTS.forEach(e => {
      total[e] = days.reduce((s, d) => s + (data[d]?.[e] || 0), 0);
      testTotal[e] = days.reduce((s, d) => s + (testDays[d]?.[e] || 0), 0);
    });

    // oldalankénti bontás, a teszt-alapvonal levonva
    const pageRows = {};
    EVENTS.forEach(e => {
      const src = allPages[e] || {};
      Object.entries(src).forEach(([p, n]) => {
        const net = n - ((testPages[e] || {})[p] || 0);
        if (net <= 0) return;
        pageRows[p] = pageRows[p] || {};
        pageRows[p][e] = net;
      });
    });

    res.status(200).json({
      events: EVENTS, days, data,
      test: testDays, testTotal, total,
      pages: pageRows,
    });
  } catch (err) {
    console.error('stats failed:', err?.message);
    res.status(500).json({ error: 'Nem sikerült beolvasni a számlálókat.' });
  }
}
