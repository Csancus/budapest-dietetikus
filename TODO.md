# TODO – budapest-dietetikus.hu

Állapot: **2026-09-04** (GBP újra-ellenőrizve) · ág: `main` · utolsó commit: **lokál, NINCS pusholva**
Előző pusholt állapot: `ca673fc` (= `origin/main`) — az élő oldalon még ez van

Ez a fájl a Google cégprofil (GBP) beállítása körüli munkamenetet rögzíti, hogy
gépújraindítás után folytatható legyen.

---

## 1. Döntésre vár (ezek blokkolnak mindent) 🔴

### 1.1 Cím-ütközés

| Hol | Érték |
|---|---|
| Google cégprofil | Budapest, **Vágóhíd utca 12-16, 1097** (IX. kerület) |
| Weboldal (mind a 104 oldal) | **Váli u. 5. 1. em. 103. (az Allee oldalában), 1117** (XI. kerület) |

A weboldal teljesen a Váli utcára épül: JSON-LD `streetAddress`, geo `47.4762 / 19.0491`
(= Allee), footer, és a 72 városoldal útbaigazítása is („Allee mélygarázsában tudsz
parkolni", „Móricz Zsigmond körtér közelében"). A beágyazott térkép viszont a GBP-listát
mutatja (`cid=7848903939045467291`) → a szövegben Váli, a térképen Vágóhíd.

🔥 **SÚLYOSBODOTT (2026-09-04): a cégprofil most önmagával mond ellent.** A beírt GBP-leírás
azt állítja, hogy „**Budapest XI. kerületében, az Allee mellett** fogadlak", miközben a
profil „Vállalkozás helye" mezője **Vágóhíd utca 12-16, 1097** (IX. kerület). A látogató
magán a profilon két különböző helyszínt lát: a térkép a Vágóhídra navigál, a szöveg az
Allee-ba hívja. **Ez már nem várhat.**
- Ha **Váli u. 5.** a valódi → GBP-cím átírása; a leírás jó, ahogy van.
- Ha **Vágóhíd u. 12-16.** a valódi → a leírásból ki kell venni az „XI. kerületében, az
  Allee mellett" részt, **és a weboldal 104 oldalát is át kell írni**.

**Döntés kell:** hol fogadja valójában a pácienseket?

- Ha **Váli u. 5.** → a GBP címét kell átírni (felülvizsgálat 1–3 nap, lehet videós verifikáció).
- Ha **Vágóhíd u. 12-16.** → a 104 oldalt kell átírni (cím, geo, schema, városoldalak
  útbaigazítása, parkolás-szöveg) → scripttel megoldható.
- Ha **mindkettő él** → GBP-be az, ahol több a rendelés; a webre „Rendelőim" szekció
  mindkettővel; hosszabb távon 2 külön GBP-lista + 2 külön aloldal.

### 1.2 Telefonszám-ütközés

| Hol | Érték |
|---|---|
| Google cégprofil | **06 70 794 9434** |
| Weboldal (fejléc, 72 városoldal, schema) | **+36 20 936 8458** |
| **README „Teendők élesítés előtt"** (eredeti brief) | **+36 70 794 9434** + Váli u. 5. |

⚠️ A README az eredeti briefben a **70-es** számot rendeli a Váli utcai rendelőhöz →
elképzelhető, hogy a weboldalra került 20-as szám a hibás. **Meg kell kérdezni Barbarát.**

A kiválasztott szám legyen mindenhol az elsődleges (GBP + web + schema), a másik
menjen a GBP-be „további telefonszám"-ként. GBP-ben nemzetközi formátum: `+36 70 794 9434`.

### 1.3 Vállalkozás neve – felfüggesztés-kockázat

A Google neve-szabálya: csak a valós, kint használt cégnév; kulcsszó, szlogen,
tapasztalat-évszám tilos.

**2026-09-04 állapot:** az 5-kulcsszavas változat eltűnt (ez javulás ✅), de most ez az
**ÉLŐ** név, és továbbra is sérti a szabályt:

> `Rónay Barbara klinikai dietetikus és hormontanácsadó - 25 év tapasztalat`

- a `- 25 év tapasztalat` **szlogen** → kizárja a neve-szabály
- a `klinikai` képesítés-állítás → csak akkor maradhat, ha tényleg megvan (→ 1.4)

Bárki bejelentheti → nevet visszaállítják vagy **felfüggesztik a listát** (visszaszerzés
hetek, a vélemények is veszélyben). A kulcsszó a névben **nem** ad rangsorelőnyt.

**Javaslat:** `Naturmed Health – Rónay Barbara dietetikus`
(vagy pontosan az, ami a rendelő ajtaján / a számlán szerepel).

### 1.6 ⚠️ SORREND-SZABÁLY a GBP-módosításokhoz

**Ne módosítsd egyszerre a nevet, a címet és a telefont.** A Google több egyidejű
alapadat-változásra hajlamos felülvizsgálatot/felfüggesztést indítani. Egyenként,
a jóváhagyást megvárva:

1. **Cím** (a legkockázatosabb, videós verifikációt is kérhet) →
2. **Telefon** →
3. **Név**

### 1.4 „Klinikai dietetikus" – igaz-e?

Megvan-e a klinikai dietetikus képesítés? Ha nem, ki kell venni:

- GBP névből/leírásból
- **a weboldal schemájából is**: `Person.jobTitle` = „Klinikai dietetikus, funkcionális
  táplálkozási és hormontanácsadó" (104 fájl)

### 1.5 ronaybarbara.hu

Mind a 104 oldal hivatkozik rá (`sameAs` + footer). Két weboldal ugyanarra a
vállalkozásra megosztja a jeleket. Ha az a régi oldal → **301 átirányítás** ide a legjobb.
Döntés + hosting-hozzáférés kell.

---

## 2. Kész ebben a munkamenetben ✅

### Weboldal (commit `4045656`, 104 fájl, lokál)

- `openingHoursSpecification` a `MedicalClinic`/`LocalBusiness` (`#clinic`) node-ba:
  H–P 10:00–20:00, szo/vas zárva (a GBP-vel egyezően) — eddig **egy fájlban sem volt**
- `hasMap` → `https://www.google.com/maps?cid=7848903939045467291`
- `sameAs` 3 → **6**: + Instagram, LinkedIn, TikTok
- Látható nyitvatartás: új sor a kapcsolat-listában (óra-ikon) + a footer Kapcsolat oszlopában
- Footer: Instagram / TikTok / LinkedIn linkek a Facebook + YouTube mellé
- **Self-serving `review[]` + `aggregateRating` (4.5 / 22) eltávolítva 73 oldalról**
  (a Google 2019 óta ignorálja/szankcionálja a saját oldalon beírt véleményjelölést);
  a *látható* vélemény-szekció (`class="rev"`) változatlan
- CRLF sorvégek megőrizve, minden JSON-LD blokk újra-validálva, tag-egyenleg változatlan

### Google cégprofil (user oldalán — 2026-09-04-én ellenőrizve, ÉL)

- Elsődleges kategória → **Dietetikus** ✅; másodlagos: Egészségközpont,
  Táplálkozási szakértő, Fogyasztás; **Szépségszalon törölve** ✅
- Leírás beírva ✅ (E/1 + tegezés, 25 év, elírások javítva) — ⚠️ de a helymegjelölése
  ütközik a profil címével, lásd 1.1
- Mind az 5 közösségi profil él ✅ (a Google átvette; a weboldal `sameAs`-e is 6 elemű)
- Szolgáltatási terület: Budapest + Pest megye ✅ (fizikai címmel nem érdemes bővíteni)
- Nyitvatartás: H–P 10:00–20:00, szo/vas zárva ✅ (a weboldalon is, `4045656`)
- Foglalási link + UTM beállítva ✅
- Rövid név: `ronaybarbara` → a vélemény-link **https://g.page/ronaybarbara** működik ✅

---

## 3. Következő lépések – weboldal (Claude csinálja, szólásra) 🛠️

1. **Halott form-fallback javítása** (független a fenti döntésektől, mehet azonnal)
   Mind a **101** űrlap `action`-je `https://formsubmit.co/csanad.peter.czarth@gmail.com`,
   pedig a **FormSubmit 2026-07-15-én leállt**. A `main.js` elfogja a küldést és
   Web3Forms-ra megy (`WEB3FORMS_KEY` a `main.js` tetején), tehát normál esetben működik —
   de ha a JS nem fut le, a beküldés a semmibe megy.
   → `action` átírása `https://api.web3forms.com/submit`-re + rejtett `access_key` mező,
   hogy JS nélkül is átmenjen.
2. **Márkanév egységesítése** → `Naturmed Health`
   Jelenleg 4-féleképp: `Naturmed Health` (1058×), `Naturmed-health` (77×),
   `naturmed-health` (666×), `naturmedhealth` (176×)
3. **`jobTitle` javítása**, ha nincs klinikai dietetikus képesítés (→ 1.4)
4. **NAP-javítás** az 1.1 / 1.2 döntés szerint (cím és/vagy telefon a 104 oldalon)
5. Foglalási linkek UTM-esítése az oldalon is, hogy a `/szamok` mérni tudja a GBP-forgalmat

---

## 4. Következő lépések – Google cégprofil (user csinálja) 📋

### 4.1 Szolgáltatások felvitele (a legnagyobb kihasználatlan lehetőség)

⚠️ Nem az attribútumok „Szolgáltatások" alszekciója (mosdó/WC) — az felszereltség.
A *kínált* szolgáltatások szerkesztője:

- **Google Search**, bejelentkezve: keress rá a cégre (vagy `my business`) → felül a
  cégprofil-panel → akciógombok között **„Szolgáltatások szerkesztése"**
- **Google Maps app**: alul „Vállalkozás" → Szolgáltatások
- A szerkesztő **kategóriafüggő** — a `Dietetikus` elsődleges kategória
  **2026-09-04-re jóváhagyva**, tehát a szerkesztőnek most már meg kell jelennie;
  a mobilappban gyakran ott van, amikor a weben nem
- Ha egyáltalán nincs: a **Termékek** szekció a helyettesítő (kép + név + ár + leírás + link)

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

### 4.2 Attribútumok felülvizsgálata

- 🔴 **„Ingyenes termékeket vagy szolgáltatásokat nyújt" — BE VAN JELÖLVE.**
  (A Google a *nem* beállított attribútumokat „Nem jelenik meg, hogy…" formában írja ki;
  ez nem úgy szerepel.) Ha Barbara nem ad ingyenes szolgáltatást, **vedd ki** — a
  megtévesztő attribútum bejelenthető, és ingyenes-keresésekbe sorolja be.
- **A „Van WC" attribútum eltűnt** (2026-09-03-án még ott volt a „Van nemsemleges mosdó"
  mellett) → tedd vissza, magánrendelőnél triviálisan igaz és a Google kiírja.
- **Parkolás**: az Allee-nál a helyes = *Fizetős parkolóház* + *Fizetős utcai parkolás*;
  díjmentes egyik sem. Ellenőrizd, hogy ne legyen ellentmondás
- **„Női tulajdonú"** ✅ hagyd — a Google jelvényként kiírja, konverziót javít
- **Megnyitás ideje: 1999** = 27 év, miközben mindenhol 25 évet írunk →
  a „több mint 25 év" mindkettőt lefedi, de legyen egységes

### 4.3 Folyamatos (hatás szerint sorban)

1. **Vélemények** — a kategória után a második legerősebb rangsortényező.
   Link: **https://g.page/ronaybarbara** → tedd a Web3Forms köszönő-üzenetbe,
   e-mail aláírásba, QR-kóddal a rendelőbe. Válaszolj **minden** véleményre.
2. **Fotók** — min. 10–15: bejárat kívülről, váró, rendelő, portré, BODY SHAPE mérés,
   logó a logó-slotba, borítókép. A rendszeres feltöltés önmagában is jel.
3. **Kérdések és válaszok** — a saját GYIK 5 kérdését te magad kérdezd fel és
   válaszold meg (tulajdonosi Q&A engedélyezett, megjelenik a profilon).
4. **Bejegyzések** — hetente 1, a 12 blogcikkből, közvetlen linkkel a cikkre.
5. **Videók** — a 3 média-megjelenés (Trendmánia, Beauty Fórum, Belfóra) mehet a profilra is.
6. **GSC**: a videó-riportban „Érvényesítés kérése" (a `/media/*` watch page-ek után),
   ha még nem történt meg.

---

## 5. Hasznos tudnivalók a repóról

- Statikus HTML + közös `/styles.css` + `/main.js`; Vercel `cleanUrls: true`
  (`vercel.json` **kell**, nélküle minden URL 404)
- **Minden HTML fájl CRLF sorvégű** → tömeges string-cseréhez CRLF-aware script kell
  (LF-re normalizál → csere → CRLF-fel visszaír)
- CSS/JS módosítás után `?v=N` bump kell **mind a 104 HTML fájlban** (cache-bust)
- Foglalórendszer: `naturmed-health.salonic.hu`
- Saját statisztika: `/szamok` (jelszóvédett, `noindex`) — `api/track.js` + `api/stats.js`
- Web3Forms anti-bot **403-mal blokkolja a headless böngészőt/curl-t** → az űrlap CSAK
  valódi (headful) böngészőből tesztelhető
- ⚠️ Régebben előfordult, hogy **párhuzamosan futó másik Claude-session újragenerálta a
  városoldalakat** és letörölte a módosításokat → tömeges városoldal-editet azonnal commitolj
