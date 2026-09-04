# TODO – budapest-dietetikus.hu

Állapot: **2026-09-04** · ág: `main` · pusholt: `05b00a1` · lokál: `9a69ee3` (NAP-szinkron, **még nincs pusholva**)

---

## 1. Döntések – MEGVANNAK ✅

| Kérdés | Döntés (2026-09-04) |
|---|---|
| Cím | **Vágóhíd utca 12-16., 1097 Budapest** (IX. ker., Ferencváros) — a GBP címe marad, a **weboldal** lett hozzáigazítva |
| Telefon | **+36 70 794 9434** (a GBP száma) — a weboldal lett átírva; a 20-as mehet a GBP-be „további telefonszám"-ként |
| „Klinikai dietetikus" | **megvan a képesítés** → marad a schemában és a szövegekben |

### 1.1 Nyitva maradt: cégnév 🔴

A Google **elutasította** a névmódosítást („A vállalkozás identitása megváltozott"), mert a
beadott név *átrendezte* a nevet és új blokkot tett bele.

Élő név: `Naturmed-health magánrendelő, Rónay Barbara dietetikus, hormonterapeuta, Táplálkozási szakértő, Zsirbontó kezelések`

**Módszer: csak törölni szabad, változtatni nem.** Az elejét karakterre pontosan hagyd meg:

```
Naturmed-health magánrendelő, Rónay Barbara dietetikus
```

- ne írd át `Naturmed Health`-re (nagybetű/kötőjel = módosítás, nem törlés)
- ne told előre a „Rónay Barbara"-t, ne tegyél bele újat
- ne fellebbezz az elutasított néven — add be újra a rövidebbet
- ha átment és megült (2–4 hét), jöhet egy második apró lépés: `Naturmed Health – Rónay Barbara dietetikus`

### 1.2 Nyitva maradt: ronaybarbara.hu

Mind a 105 oldal hivatkozik rá (`sameAs` + footer). Két weboldal ugyanarra a vállalkozásra
megosztja a jeleket. Ha az a régi oldal → **301 átirányítás** ide. Döntés + hosting-hozzáférés kell.

---

## 2. Kész ✅

### 2.1 Űrlap-fallback (commit `05b00a1`, **pusholva + élő**)

Mind a 104 űrlap `action`-je a 2026-07-15-én leállt `formsubmit.co`-ra ment; JS nélkül minden
beküldés elveszett.

- `action` → `https://api.web3forms.com/submit`, rejtett `access_key` + `subject` + `from_name` + `redirect`
- honeypot `_honey` → `botcheck` (a Web3Forms saját mezőneve, szerveroldalon is szűr)
- új **`/koszonom`** oldal (noindex) a JS nélküli beküldés landolásához
- `main.js`: a `redirect` nem kerül az AJAX payloadba; `main.js?v=30 → v=31` mind a 105 HTML-ben
- adatkezelési tájékoztató: adatfeldolgozó FormSubmit → Web3Forms

### 2.2 NAP-szinkron (commit `9a69ee3`, **lokál, nincs pusholva**)

- schema `streetAddress` / `postalCode` `1097` + geo **47.47176 / 19.07559** (a házszámra geokódolva)
  + `geo.position` / `ICBM` meta — 105 fájl
- telefon `+36 20 936 8458` → **`+36 70 794 9434`** (1271 előfordulás: látható, `tel:`, schema)
- látható cím a kapcsolat-listában, a footerben és a jogi oldalon
- **72 városoldal útbaigazítása újraírva**: az új végpont a **Közvágóhíd** (H6 HÉV végállomás +
  2-es villamos, pár perc séta); a fővárosi útvonalak Fővám tér / Boráros tér átszállással;
  a „Petőfi hídon Budára" autós útvonalak a pesti oldalra javítva; Allee mélygarázs →
  fizetős utcai parkolás
- kerületi oldalak: a **XI. (Újbuda) már nem a rendelő helye**, a **IX. igen** — a szöveg átírva
- **távolságok újraszámolva** városonként (geokódolt légvonal-delta): 40 helyen változott
- README kapcsolati adatok
- ellenőrizve: 105/105 JSON-LD blokk parse-olható, **0 régi NAP-előfordulás**, tag-egyensúly változatlan
- a beágyazott térkép (`cid=7848903939045467291`) eddig is a Vágóhíd utcát mutatta → most a szöveg is egyezik

### 2.3 Korábbi GBP-szinkron (commit `4045656`)

`openingHoursSpecification` (H–P 10–20), `hasMap`, `sameAs` 3→6, látható nyitvatartás,
footer közösségi linkek, a self-serving `review[]` + `aggregateRating` kivezetve 73 oldalról.

---

## 3. Következő lépések – weboldal 🛠️

1. **`9a69ee3` pusholása** → Vercel deploy (a NAP-váltás csak utána él)
2. **Márkanév egységesítése** → `Naturmed Health`
   Jelenleg 4-féleképp: `Naturmed Health`, `Naturmed-health`, `naturmed-health`, `naturmedhealth`
   (URL-eket és fájlneveket nem szabad bántani)
3. Foglalási linkek UTM-esítése az oldalon is, hogy a `/szamok` mérni tudja a GBP-forgalmat
4. **GSC**: a NAP-váltás után érdemes újra beküldeni a sitemapet; a videó-riportban
   „Érvényesítés kérése" a `/media/*` watch page-ekre, ha még nem történt meg

---

## 4. Következő lépések – Google cégprofil (user csinálja) 📋

### 4.0 SÜRGŐS: a leírás helymegjelölése

A GBP-leírás azt állítja, hogy „**Budapest XI. kerületében, az Allee mellett** fogadlak",
miközben a profil címe **Vágóhíd utca 12-16., 1097** (IX. kerület). **Ki kell venni**
az „XI. kerületében, az Allee mellett" részt — a weboldal már a IX. kerületre íródott át.

### 4.1 Név (lásd 1.1) — csak törléses módosítás

### 4.2 Telefon

A 70-es szám az elsődleges (a weboldal + schema is ezt írja). A 20-as mehet be
„további telefonszám"-ként.

### 4.3 Szolgáltatások felvitele (a legnagyobb kihasználatlan lehetőség)

⚠️ Nem az attribútumok „Szolgáltatások" alszekciója (mosdó/WC) — az felszereltség.
A *kínált* szolgáltatások szerkesztője:

- **Google Search**, bejelentkezve: keress rá a cégre (vagy `my business`) → cégprofil-panel →
  **„Szolgáltatások szerkesztése"**
- **Google Maps app**: alul „Vállalkozás" → Szolgáltatások
- A szerkesztő kategóriafüggő; a `Dietetikus` elsődleges kategória jóvá van hagyva
- Ha egyáltalán nincs: a **Termékek** szekció a helyettesítő

A nevek szándékosan egyeznek az aloldalak címeivel (entitás-egyezés):

| Szolgáltatás | Leírás |
|---|---|
| START konzultáció – 29.000 Ft | Első felmérés: BODY SHAPE testösszetétel-mérés, hormonprofil és ásványianyag-vizsgálat, majd terápiás terv és írásos jegyzet. |
| Holisztikus dietetika – terápiás étrend beállítás – 90.000 Ft | Személyre szabott terápiás étrend a kiváltó okok feltárása után, folyamatos kontrollal. |
| Hozd magad formába kívül, belül – online csomag – 120.000 Ft | Teljes online program: konzultációk, étrend, hormon- és emésztés-támogatás, végig kísérés. |
| Testsúlykontroll, fogyás | Nem diéta: az anyagcsere, a hormonok és az emésztés rendezése után indul a fogyás. |
| Emésztőrendszeri panaszok | IBS, puffadás, reflux, székrekedés — a bélflóra és az intoleranciák célzott vizsgálatával. |
| Táplálékintolerancia | Laktóz-, glutén-, hisztamin- és egyéb érzékenységek felmérése és étrendi kezelése. |
| Hormonális problémák | Inzulinrezisztencia, PCOS, pajzsmirigy-alulműködés táplálkozásterápiás támogatása. |
| Hajhullás, hajgyógyászat | A hajhullás mögötti hiányállapotok és hormonális okok feltárása, célzott pótlás. |
| Zsírbontó kezelések | Készülékes zsírbontás étrendi és hormonális háttérrendezéssel kombinálva. |
| Online konzultáció | Ugyanaz a teljes program, videóhívásban, bárhonnan. |

### 4.4 Attribútumok felülvizsgálata

- 🔴 **„Ingyenes termékeket vagy szolgáltatásokat nyújt" — BE VAN JELÖLVE.**
  Ha Barbara nem ad ingyenes szolgáltatást, **vedd ki**.
- **„Van WC"** eltűnt → tedd vissza.
- **Parkolás**: a Vágóhíd utcánál a helyes = *Fizetős utcai parkolás* (az Allee-s parkolóház
  már nem releváns) — a weboldal is így írja
- **„Női tulajdonú"** ✅ hagyd
- **Megnyitás ideje: 1999** = 27 év, miközben mindenhol 25 évet írunk → a „több mint 25 év"
  mindkettőt lefedi, de legyen egységes

### 4.5 Folyamatos (hatás szerint sorban)

1. **Vélemények** — a kategória után a második legerősebb rangsortényező.
   Link: **https://g.page/ronaybarbara** → tedd a Web3Forms köszönő-üzenetbe és a `/koszonom`
   oldalra, e-mail aláírásba, QR-kóddal a rendelőbe. Válaszolj **minden** véleményre.
2. **Fotók** — min. 10–15: bejárat kívülről, váró, rendelő, portré, BODY SHAPE mérés, logó, borítókép.
3. **Kérdések és válaszok** — a saját GYIK 5 kérdését te magad kérdezd fel és válaszold meg.
4. **Bejegyzések** — hetente 1, a 12 blogcikkből, közvetlen linkkel a cikkre.
5. **Videók** — a 3 média-megjelenés (Trendmánia, Beauty Fórum, Belfóra) mehet a profilra is.

---

## 5. Hasznos tudnivalók a repóról

- Statikus HTML + közös `/styles.css` + `/main.js`; Vercel `cleanUrls: true`
  (`vercel.json` **kell**, nélküle minden URL 404)
- **Minden HTML fájl CRLF sorvégű** → tömeges string-cseréhez CRLF-aware script kell
  (LF-re normalizál → csere → CRLF-fel visszaír)
- CSS/JS módosítás után `?v=N` bump kell **mind a 105 HTML fájlban** (cache-bust)
- A `#clinic` JSON-LD node `@type`-ja **tömb** (`["MedicalClinic","LocalBusiness"]`) → a
  `"@type": "..."` grep nem találja meg
- Foglalórendszer: `naturmed-health.salonic.hu`
- Saját statisztika: `/szamok` (jelszóvédett, `noindex`) — `api/track.js` + `api/stats.js`
- Űrlap: **Web3Forms** (`WEB3FORMS_KEY` a `main.js` tetején + rejtett `access_key` az űrlapokban).
  Az anti-bot **403-mal blokkolja a headless böngészőt/curl-t** → CSAK valódi (headful)
  böngészőből tesztelhető
- ⚠️ Régebben előfordult, hogy **párhuzamosan futó másik Claude-session újragenerálta a
  városoldalakat** és letörölte a módosításokat → tömeges városoldal-editet azonnal commitolj
