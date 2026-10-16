# 🎙️ Vocal DSP Coach & EQ Assistant

Täysin selainpohjainen, reaaliaikainen puheäänen spektrianalysaattori ja DSP-avustaja. Sovellus analysoi mikrofonisi taajuusvastetta, huonekuminoita, ässien terävyyttä ja dynamiikkaa suoraan selaimessa Web Audio API:n avulla ilman mitään ulkoisia palvelimia tai asennuksia.

Suunniteltu toimimaan suoraan **GitHub Pagesissa**!

---

## ✨ Pääominaisuudet

1. **Reaaliaikainen Spektrianalysaattori & Äänialuevyöhykkeet:**
   - 4096-pisteen FFT-taajuusanalyysi (tarkka matalilla taajuuksilla).
   - Logaritminen asteikko (20 Hz – 20 kHz) ja dBFS-asteikko.
   - Vokaalivyöhykkeet: *Sub <80Hz*, *Keho 80-250Hz*, *Mutaisuus 250-500Hz*, *Pahvi 500-1k*, *Nenä 1-2.5k*, *Selkeys 2.5-5k*, *Ässät 5-8.5k*, *Ilma >10k*.
   - Reaaliaikainen **suositellun EQ-käyrän piirto** suoraan spektrin päälle (kuten FabFilter Pro-Q / iZotope Ozone).

2. **10 sekunnin Ohjattu Äänitesti (Voice Diagnostic Test):**
   - 7 sekunnin puhenäytteen tallennus: arvioi puheen perustaajuuden ($F_0$), soinnin tasapainon, dynamiikka-alueen (Crest factor) ja huipputasot.
   - 3 sekunnin huoneen hiljaisuuden mittaus: tarkka pohjakohinan mittaus Noise Gatea varten.
   - Mukautuva diagnoosi: kertoo suoraan onko äänessäsi liikaa läheisyyskuminaa, tunkkaisuutta tai teräviä ässiä.

3. **Tavoitetyylit (Target Sound Profile):**
   - 🎙️ **Selkeä & Erottuva (Podcast / YouTube / Striimi):** leikkaa mutaisuuden, nostaa 3-4 kHz artikulaatiota ja antaa modernin kirkkauden.
   - 📻 **Lämmin & Syvä (Radio / Voiceover / Broadcast Low-End):** säilyttää rintaäänen ja täyteläisyyden, leikkaa vain häiriöt.
   - 🌿 **Luonnollinen & Neutraali:** minimalistiset korjaukset luonnolliseen akustiseen puheeseen.
   - 🎮 **Läpitunkeva (Discord / Peliääni / Meluisa tila):** tiukka portti, voimakas mutaleikkaus ja selkeä preesens.

4. **Kaksitasoiset EQ-Suositukset:**
   - **⚡ Helppo tila (Easy Mode - 3 pistettä):**
     1. HPF (Ylipäästö / Low Cut)
     2. Ongelmataajuuden leikkaus (Mud Cut: Frequency, Gain, Q)
     3. Puheen selkeyden nosto (Presence Boost: Frequency, Gain, Q)
   - **🎛️ Edistynyt tila (Advanced Parametric EQ):**
     - 7-kaistainen täysi parametrinen taulukko (HPF, Keho, Muta, Pahvi, Artikulaatio, Sibilanssi, Ilma).
     - Tarkat arvot: Tyyppi, Taajuus (Hz), Vahvistus (dB), Q-arvo sekä suomenkieliset perustelut.

5. **Täysi Dynamiikkaprosessointi:**
   - **Kompressori (Compressor):** Kynnystaso (Threshold), Suhde (Ratio), Attack, Release ja Makeup Gain mitoitettuna puheesi huippujen ja dynamiikka-alueen mukaan.
   - **De-Esser (Ässävaimennin):** Kohdetaajuus (Hz), Kynnysarvo, Vaimennusmäärä ja Q-arvo kohdistettuna mitattuun ässäpiikkiin.
   - **Kohinaportti (Noise Gate):** Avauskynnys (Open), Sulkukynnys (Close hystereesi), Attack, Hold ja Release huoneesi pohjakohinan mukaan.

6. **🎧 Live A/B Kuuntelutesti:**
   - Voit kuunnella kuulokkeilla miltä äänesi kuulostaa **RAW (puhdas mikki)** vs **PROSESSOITU (suositeltu EQ + kompressio päällä)** reaaliajassa!

7. **Kopiointityökalut:**
   - Yhdellä napilla asetukset tekstinä, suoraan **OBS Studioon** tai **Equalizer APO:on**.

---

## 🚀 Julkaisu GitHub Pagesiin (3 Helppoa Vaihetta)

Koska sovellus koostuu puhtaasta HTML-, CSS- ja JavaScript-koodista (ei vaadi Node.js:ää, tietokantaa tai build-vaihetta), sen julkaiseminen ilmaiseksi nettiin käy käden käänteessä:

1. **Luo uusi repositorio GitHubiin:**
   - Mene osoitteeseen [github.com/new](https://github.com/new).
   - Anna repolle nimeksi esim. `vocal-dsp-coach`.
   - Valitse *Public*.

2. **Lataa nämä tiedostot repoon:**
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   *(Voit vetää tiedostot suoraan GitHubin selaimeen "Upload files" tai ajaa `git push` komennon).*

3. **Kytke GitHub Pages päälle:**
   - Mene GitHub-repositoriossasi kohtaan: **Settings** &rarr; **Pages**.
   - Kohdassa **Build and deployment** &rarr; **Branch**:
     - Valitse haaraksi `main` (tai `master`).
     - Valitse kansioksi `/ (root)`.
     - Klikkaa **Save**.
   - Noin 30 sekunnin kuluttua sivusi on julkisesti auki osoitteessa:
     `https://<käyttäjänimesi>.github.io/<repositorion-nimi>/`

---

## 💻 Paikallinen testaus omalla koneella

Voit avata sivun heti myös omalla koneellasi:
- Tuplaklikkaa `index.html` avataksesi sen selaimessa, TAI
- Käytä VS Coden / Antigravityn Live Serveriä tai komentoa:
  ```bash
  npx serve .
  # tai
  python -m http.server 8000
  ```
  ja avaa `http://localhost:8000`.

*Huom: Selaimen mikrofoniluvat vaativat `localhost`-osoitteen tai `https://`-suojatun yhteyden (jollainen GitHub Pages on aina automaattisesti).*
