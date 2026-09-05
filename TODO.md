# TODO – budapest-dietetikus.hu

Állapot: **2026-09-05** · ág: `main` · pusholt: `e6017c3` · **lokál: több commit, NINCS pusholva**

---

## 1. Nyitott döntések 🔴

### 1.1 ronaybarbara.hu — a legnagyobb tétel

**Két aktív weboldal verseng ugyanazért a márkáért.** A `ronaybarbara.hu` **nem elhagyatott**: 2026 augusztusi–szeptemberi blogbejegyzések, webshop, e-book, hírlevél, ~10 csomag.

⚠️ **És ellentmond ennek az oldalnak:**

| | budapest-dietetikus.hu | ronaybarbara.hu |
|---|---|---|
| Cím | Vágóhíd u. 12-16., 1097 (IX.) | Váli u. 5., 1117 (XI.) + Szigetszentmiklós |
| Telefon | +36 70 794 9434 | +36 20 936 8458 |

Amíg ez fennáll, minden jel (linkek, márkaemlítés, tekintély) megfeleződik, és a NAP-egyezés — a helyi rangsorolás alapköve — sérül.

**Döntés kell:** melyik legyen *a* weboldal? Ha ez, akkor 301 oldalról oldalra a `ronaybarbara.hu`-ról ide. Hosting-hozzáférés szükséges.

### 1.2 Google cégprofil — hátralévő teendők

- **Leírás:** ki kell venni az „XI. kerületében, az Allee mellett" részt (a cím IX. kerület)
- **Telefon:** a 20-as felvétele „további telefonszám"-ként
- **Szolgáltatások:** a 8 felvitt tételhez **leírás** + a 3 csomaghoz **ár mező**
- **Rife rezgés harmonizálás törlése** — gyógyhatás-állítás cáfolt eljárásról, bejelenthető
- **Attribútumok:** „Ingyenes szolgáltatás" ki (ha nem igaz), „Van WC" vissza, parkolás → *fizetős utcai*
- **Név:** 2–4 hét múlva jöhet a kozmetikai lépés (`Naturmed Health – Rónay Barbara dietetikus`), csak törléses módszerrel

### 1.3 Vélemények

A térképes találatokban a kategória után a **legerősebb tényező**, és az egyetlen, amit korlátlanul növelhetsz. Link: **https://g.page/ronaybarbara** → e-mail aláírásba, a `/koszonom` oldalra, QR-kóddal a rendelőbe. Válaszolj mindre.

---

## 2. Lighthouse-audit (2026-09-05) 🟡

| Mérés | Pont |
|---|---|
| Performance | **69** ⚠️ |
| Accessibility | 97 |
| Best Practices | 100 |
| SEO | 100 |

⚠️ **A 69 alulmért:** a futtatás jelezte, hogy *„Chrome extensions negatively affected this page's load performance"*. **Újra kell mérni inkognitóban, bővítmények nélkül** — reális becslés 80+.

**Teendő:** elemzés után konkrét javítási lista. Várható tételek (nem mérve, csak feltételezés):
- képek: a `/images/blog/*.webp` fájlok 100–250 KB-osak, `srcset` nincs
- a hero-képek nem `fetchpriority="high"`
- a Google Maps iframe minden oldalon betölt (már `loading="lazy"`)
- a 3 pont hiányzó Accessibility okát meg kell nézni

---

## 3. Kész ✅

### 3.1 NAP + űrlap + IX. kerület (pusholva, él)

- Cím **Vágóhíd utca 12-16., 1097**, telefon **+36 70 794 9434** mind a 139 oldalon; 72 városoldal útbaigazítása a Közvágóhídra átírva, távolságok újraszámolva
- Űrlap **Web3Forms**-ra, JS nélkül is kézbesít, `/koszonom` köszönőoldallal — végponttól végpontig tesztelve
- `/dietetikus-budapest-9-kerulet` a saját kerület oldalaként átírva, ellenőrzött közlekedési adatokkal

### 3.2 Magas vérnyomás klaszter — 10 oldal (pusholva, él)

`/magas-vernyomas` pillér + `tunetei` · `okai` · `csokkentese-gyogyszer-nelkul` · `mit-egyek-ellene` · `vernyomascsokkento-etelek` · `also-ertek-magas` · `mi-a-teendo` · `mennyi-szamit-magasnak` · `vernyomas-es-pulzus`

Kulcsszó-lefedettség: **28/30 pontos kifejezés-egyezés**. Kihagyva: `detralex magas vérnyomás` (márkás gyógyszer).

### 3.3 Dietetikus alapcikkek — 3 oldal (pusholva, él)

`/blog/mi-a-dietetikus` · `/blog/ki-a-dietetikus` · `/blog/mi-a-dietetikus-feladata`

### 3.4 **ÚJ, LOKÁL — 17 oldal, 5 témakör**

| Klaszter | Oldalak | Becsült SV |
|---|---|---|
| **IR diéta** | `/ir-dieta` + tiltolista · mintaetrend · mit-lehet-enni · receptek | ~2900 |
| **Autoimmun betegségek** | `/autoimmun-betegsegek` + visszafordithatoak · hashimoto · coliakia · gyulladasos-belbetegsegek · gyulladascsokkento-etrend | ~1700 (KD 2!) |
| **Egészséges életmód** | `/egeszseges-eletmod` + egeszseges-taplalkozas · egeszseges-etelek · alapelvei · gyerekeknek | ~4300 |
| **Testösszetétel-mérés** | `/testosszetetel-meres` + modszerek | ~1250 |
| **Szolgáltatás + egyéb** | `/dietetikai-tanacsadas` · `/szemelyre-szabott-etrend` · `/sziv-es-errendszeri-betegsegek` · `/taplalkozasi-szokasok` | ~1100 |

Minden oldalon: MedicalWebPage/Article schema, FAQPage, 3 szintű breadcrumb, klaszter-navigáció, középső CTA-k, alt textek, kulcsszavas anchor textű kereszthivatkozások.

**Szakmai korlátok, amiket szándékosan tartottam:**
- „30 napos IR mintaétrend" helyett szerkezet + 3 napos példa — kész terv felelősen nem adható
- IR „tiltólista" helyett problémás/bátran fogyasztható bontás
- Autoimmun: **csak dietetikai hatókör** (Hashimoto, cöliákia, IBD, gyulladáscsökkentő étrend). Sclerosis multiplex, lupus, neurológiai és ritka autoimmun kórképek **nincsenek** betegségként tárgyalva
- „Az autoimmun betegségek visszafordíthatóak" (450 SV): az őszinte válasz — remisszió igen, gyógyulás nem
- InBody: tényszerű ismertetés, de **kimondva, hogy a rendelőben BODY SHAPE van**
- „táplálkozási tanácsadó" (700 SV) **nem cél** — a szándék dominánsan képzés/állás

### 3.5 Egyéb javítások (lokál)

- **Czárth Csanád kredit + czarth.com link eltávolítva** mind a 123 oldalról
- Márkanév egységesítve: 1326 „Naturmed Health" (a térkép-iframe volt az egyetlen kilógó)
- **Site-szintű képhiba:** a globális `img{}` szabályból hiányzott a `height:auto` → a képek eredeti magasságukkal, torzítva jelentek meg mobilon. Javítva: hero 733px → 248px, mind a 139 oldalon
- Törött „Ugrás a tartalomra" ugrólink javítva 25 oldalon (`#szakteruletek` → `#fo`)
- Örökölt HTML-hiba: 28 oldalon fölösleges `</main>` zárta le a főtartalmat a foglalási szekció előtt

---

## 4. Következő lépések – weboldal 🛠️

1. **Push + sitemap újraküldése** a Search Console-ban (136 URL)
2. **Indexelés kérése** a legjobb esélyű oldalakra: `/ir-dieta`, `/autoimmun-betegsegek` (KD 2!), `/magas-vernyomas/mit-egyek-ellene`, `/magas-vernyomas/vernyomascsokkento-etelek`
3. **Lighthouse újramérés** inkognitóban → javítási lista (2. pont)
4. Foglalási linkek UTM-ezése, hogy a `/szamok` mérni tudja a cégprofilból jövő forgalmat
5. Dél-pesti városoldalakon a **H6-os HÉV** átszállás nélküli kapcsolatának kiemelése (most valós előny)
6. **Ingyenes eszköz** (kalkulátor) — ez az, amiért a versenytárs oldalára hivatkoznak; hosszú távú linkforrás

---

## 5. Hasznos tudnivalók a repóról

- Statikus HTML + közös `/styles.css` + `/main.js`; Vercel `cleanUrls: true` (`vercel.json` **kell**)
- **Minden HTML CRLF sorvégű** → tömeges cseréhez CRLF-aware script
- CSS/JS módosítás után `?v=N` bump **minden HTML-ben** (jelenleg `styles.css?v=160`, `main.js?v=31`)
- ⚠️ **A Vercel nem mindig indít deployt pushra** — 2026-09-05-én egy push kimaradt. Ellenőrzés: `vercel ls budapest-dietetikus`; kényszerítés: `vercel --prod`
- A `#clinic` JSON-LD node `@type`-ja **tömb** → a `"@type": "..."` grep nem találja
- Űrlap: **Web3Forms**. Az anti-bot a böngésző-`Origin`/`Referer` nélküli kérést tiltja (nem a headless böngészőt)
- Klaszter-generátor: `scratchpad/gen-cluster.js` + `<tema>-data.js` — új témakörhöz ezt használd
- ⚠️ Régebben előfordult, hogy párhuzamos Claude-session újragenerálta a városoldalakat → tömeges editet azonnal commitolj
