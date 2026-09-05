# SEO-átvizsgálás – budapest-dietetikus.hu
**Dátum:** 2026-09-05 · 155 HTML oldal, 152 indexelhető, sitemap beküldve

---

## Összegzés

A technikai alapok **kifogástalanok**. A tartalmi lefedettség az elmúlt hetekben
sokat erősödött (38 új oldal, 7 témaklaszter). Egyetlen komoly, strukturális
kockázat van: a **78 helyi oldal egymáshoz való hasonlósága**.

| Terület | Állapot |
|---|---|
| Technikai SEO (canonical, schema, alt, sitemap, robots) | ✅ hibátlan |
| Tartalmi mélység (átlag 1000+ szó/oldal) | ✅ erős |
| Belső linkelés | ✅ jó (átlag 5,0 törzs-link/klaszteroldal) |
| **Helyi oldalak egyedisége** | 🔴 **kockázat** |
| Title/description hossza | 🟡 vágódik a SERP-ben |
| Off-page (GBP, értékelések, NAP) | 🟡 rajtad múlik |

---

## 🔴 1. A legfontosabb: 78 helyi oldal túl hasonló

**Mit mértem:** 5-szavas szövegblokk-egyezést (shingle Jaccard) minden párra.

| Csoport | Oldal | Átlagos hasonlóság | Legrosszabb pár |
|---|---|---|---|
| Budapesti kerületek | 23 | **69,3%** | 82,7% (XV. ↔ IV.) |
| Agglomeráció | 55 | **61,4%** | 84,0% (Kerepes ↔ Kistarcsa) |

Konkrét bontás (Kerepes vs. Kistarcsa): **71 szövegblokkból 12 egyedi (17%)** —
és annak nagy része is csak névcsere („Kerepesen" → „Kistarcsán").
Valóban egyedi tartalom: 1 bekezdés a közlekedésről.

**Miért baj:** a Google ezt doorway page mintázatként ismerheti fel. Ez nem
elméleti — a helyi oldalak a site **51%-át** teszik ki, tehát a minőségi jelzés
az egész domainre visszahat. Tünete jellemzően: „Feltérképezve – jelenleg nincs
indexelve" a Search Console-ban.

**Mit csinálj — ellenőrzés először, ne vakon vágj bele:**

1. **GSC → Oldalak → nézd meg, hány `/dietetikus-*` oldal van ténylegesen
   indexelve.** Ez dönti el a lépés súlyát.
   - Ha 80-ból 60+ indexelve van és hoz forgalmat → hagyd, működik.
   - Ha nagy részük „Feltérképezve, nincs indexelve" → cselekedni kell.
2. Ha cselekedni kell, a sorrend:
   - **Tartsd meg** azt a ~15-20 oldalt, ahol valós a kereslet
     (Budapest IX./VIII./XIII., Budaörs, Budakeszi, Érd, Szentendre, Gödöllő…).
     Ezeket írd át 60-70%-ban egyedire: helyi közlekedés részletesen, konkrét
     útvonal a rendelőig, helyi vonatkozás, más-más beteg-példa.
   - A maradékot **301-gyel** irányítsd a `/dietetikus-budapest-es-kornyeke`
     gyűjtőoldalra. Nem veszítesz semmit: ezek most sem hoznak forgalmat.

> Nem javaslom a tömeges törlést vizsgálat nélkül. Az adat dönt, nem a szabály.

---

## 🟡 2. Title és meta description hossza

- **58 title > 60 karakter** (leghosszabb: 90) → a Google levágja
- **38 description > 160 karakter** (leghosszabb: 191) → levágja

Nem rangsorolási tényező, de **átkattintási arányt (CTR) ront**: a levágott
címből eltűnik a márkanév vagy a lényeg.

**Mit csinálj:** a 20 legfontosabb oldalon (klaszter-pillérek + pénzoldalak)
rövidítsd 55-58 karakterre úgy, hogy a kulcsszó elöl maradjon. A többi ráér.
→ Ezt meg tudom csinálni, szólj.

---

## 🟡 3. E-E-A-T: egy állítást ellenőrizni kell

A site **82 oldalán** szerepel: *„MSc táplálkozástudomány"*, a `/rolam` oldalon
pedig *„MSc táplálkozástudományi szakember, sportdietetikus, hormonterapeuta"*.

Amit te mondtál Barbara végzettségéről: **2006, Semmelweis Egyetem dietetikus
szakirány + Funkcionális Táplálkozási Referens (2014-től)**. Az MSc nem szerepelt.

Ez a szöveg még a régi oldalról öröklődött. **Kérdezd meg Barbarát, megvan-e
ténylegesen az MSc.** Ha nincs, 82 oldalon javítani kell — egészségügyi témában
(YMYL) egy nem valós képesítés a legnagyobb E-E-A-T kockázat, amit vállalni lehet.

---

## 🟡 4. 5 oldalra alig mutat belső link

| Oldal | Bejövő link |
|---|---|
| `/blog/tartos-faradtsag-etrend-vercukor` | 1 |
| `/media/ronay-barbara-trendmania` | 1 |
| `/media/hormonalis-bortunetek-beauty-forum` | 1 |
| `/media/rostfogyasztas-belfora-magyarosi-csaba` | 1 |
| `/blog/hajhullas-noknel-hormonalis-okok-labor` | 3 |

A médiaoldalak amúgy is vékonyak (194-279 szó). Két lehetőség:
**(a)** kösd be őket a `/rolam` és a kapcsolódó témaoldalak szövegébe, vagy
**(b)** olvaszd össze a hármat egyetlen `/mediamegjelenesek` oldalba, 301-gyel.
Az utóbbit javaslom — kevesebb, de erősebb oldal.

---

## ✅ 5. Ami rendben van (ne nyúlj hozzá)

- 0 duplikált title, description és H1
- 0 hibás vagy hiányzó canonical (152/152)
- 0 kép alt nélkül, 0 kép width/height nélkül (CLS-védelem)
- BreadcrumbList minden aloldalon, FAQPage minden klaszteroldalon
- 154 JSON-LD blokk, mind érvényes
- Nincs törött belső link, nincs árva oldal
- Nincs 450 szónál vékonyabb cikkoldal
- Képek összesen 1,9 MB, legnagyobb 241 KB
- robots.txt + sitemap rendben, sitemap beolvasva (152 URL)
- Űrlap mind a 153 nyilvános oldalon, böngészőben végigtesztelve

---

## 📋 Prioritási sorrend

### Most (te)
1. **GSC → Oldalak riport**: hány `/dietetikus-*` oldal van indexelve? Írd meg,
   és eldöntjük a helyi oldalak sorsát. ← *ez a legnagyobb tétel*
2. **Kérdezd meg Barbarát az MSc-ről.**
3. **GBP-teendők** (a `KULCSSZAVAK.md`-ben részletezve): leírásból a
   „XI. kerület/Allee" kivétele, Rife törlése, 8 szolgáltatás leírása + árak.
4. **ronaybarbara.hu** – még mindig más címet és telefonszámot ír, mint ez az
   oldal. A Google számára ez ellentmondó NAP. Vagy frissítsd, vagy 301-eld ide.
5. **Értékelés-gyűjtés**: a mostani 5 Google-vélemény kevés. Kérj minden
   konzultáció után. Ez hat a lokális rangsorra is.

### Utána (én)
6. Az 5 legfontosabb oldal kézi indexeltetése *(a lista már megvan)*
7. Title/description rövidítés a top 20 oldalon
8. Médiaoldalak összevonása
9. Új klaszterek a `KULCSSZAVAK.md` 2. részéből, sorrendben:
   **epe diéta (~6500 SV)** → koleszterin diéta (~3200) → hasmenés diéta (~1700)
   → hasnyálmirigy-gyulladás diéta

### Ne csináld
- ❌ Ne gyárts újabb helyi oldalakat, amíg a mostaniak sorsa nem dőlt el
- ❌ Ne tegyél `review`/`aggregateRating` schemát saját oldalra – a Google
  a saját magadról írt értékelést nem jeleníti meg gazdag találatként
- ❌ Ne bontsd tovább a klasztereket – a mostani mélység elég

---

## Mit mértem

Minden szám ebben a dokumentumban ebből a repóból, ma generált méréssel készült:
title/description/H1/canonical-kigyűjtés 155 fájlból, 5-gram shingle-hasonlóság
minden helyi oldalpárra (78 oldal, 3003 pár), belső link-gráf, kép- és
schema-ellenőrzés, valamint élő HTTP-ellenőrzés a Vercel deploy után.
