# Pochodzenie zasobów graficznych — SIELORA

Data ostatniej weryfikacji: **28 października 2026 r.**

Ten plik jest wewnętrzną dokumentacją źródeł. Nie zastępuje podpisów pod zdjęciami tam, gdzie licencja by ich wymagała (żadna z obecnie użytych grafik tego nie wymaga).

---

## 1. Stan obecny: projekt nie zawiera fotografii

W tej wersji **nie wykorzystano żadnych fotografii stockowych**.

Podczas budowy strony środowisko robocze nie miało dostępu do serwisów Pexels, Unsplash i Pixabay — połączenia z nimi były blokowane przez serwer pośredniczący (odpowiedź 403). Nie dało się więc pobrać ani obejrzeć konkretnych plików, a tym samym zweryfikować ich zawartości (znaki wodne, logotypy, rozpoznawalne osoby, zgodność z opisem dania).

Zgodnie z punktem 4.6 wymagań:

- nie wstawiono żadnych linków do zdjęć ani niezweryfikowanych plików,
- żadna grafika nie jest oznaczona jako zweryfikowana fotografia,
- w miejscach przewidzianych na zdjęcia zastosowano **autorskie ilustracje SVG**,
- w sekcji 4 opisano, jakie fotografie trzeba jeszcze pozyskać.

Wszystkie ilustracje są na stronie podpisane jako poglądowe i nie przedstawiają rzeczywistego wnętrza ani rzeczywiście serwowanych dań.

---

## 2. Zasoby autorskie zawarte w repozytorium

Wszystkie poniższe pliki przygotowano od podstaw na potrzeby tego projektu jako kod SVG (proste kształty geometryczne). Nie wykorzystują cudzych grafik, zdjęć, ikon, szablonów ani osadzonych fontów. Litery logo narysowano jako własne ścieżki, a nie jako tekst w kroju pisma.

| Plik | Rodzaj | Opis | Użycie |
| --- | --- | --- | --- |
| `assets/images/branding/logo.svg` | logo | emblemat (pierścień czterech pór roku z gałązką w kształcie litery S) i znak słowny SIELORA | nagłówek wszystkich stron |
| `assets/images/branding/logo-inverse.svg` | logo | wersja na ciemne tło | stopka |
| `assets/images/branding/favicon.svg` | ikona | emblemat na ciemnozielonym tle | karta przeglądarki |
| `assets/images/branding/apple-touch-icon.png` | ikona PNG 180×180 | raster wygenerowany z `favicon.svg` | ekran główny iOS |
| `assets/images/branding/og-image.png` | grafika 1200×630 | logo, hasło i ilustracja talerza | podgląd linku (Open Graph) |
| `assets/images/hero/talerz-jesien.svg` | ilustracja | „talerz-kalendarz”: gnocchi z dynią i szałwią, na rancie miesiące, łuk jesiennej karty | hero strony głównej |
| `assets/images/ingredients/*.svg` (7 plików) | ilustracje | dynia, borowik, burak, gruszka, szparagi, pomidor, pasternak | „Jesień w karcie”, „Rok w naszej kuchni” |
| `assets/images/interior/stol-dla-dwojga.svg` | ilustracja | stolik dla dwojga widziany z góry | sekcja o wnętrzu |
| `assets/images/interior/stol-biesiadny.svg` | ilustracja | długi stół na 14 nakryć widziany z góry | sekcja o wydarzeniach |
| `assets/images/map/mapa-pogladowa.svg` | ilustracja | mapa fikcyjnej okolicy | strona Kontakt |
| `assets/images/icons/chevron.svg` | ikona | strzałka listy rozwijanej | pola `select` |
| ikony w kodzie HTML | ikony SVG | zegar, pinezka, koperta, liść, kalendarz itp. | cały serwis |

**Fonty w grafikach rastrowych.** Hasło na `og-image.png` zostało wyrenderowane krojem TeX Gyre Pagella (licencja GUST Font License), a podpis krojem Inter (SIL Open Font License). Oba fonty posłużyły wyłącznie do rasteryzacji tekstu — nie są dołączone do projektu ani osadzone w plikach. Strona korzysta z czcionek systemowych (Georgia, system-ui).

---

## 3. Warunki licencyjne serwisów ze zdjęciami (stan na 28.10.2026)

Poniżej streszczenie **ogólnych** warunków, sprawdzonych na oficjalnych stronach serwisów. Nie zastępuje weryfikacji każdego konkretnego zdjęcia (sekcja 5).

### Pexels

- Licencja: <https://www.pexels.com/license/>, regulamin: <https://www.pexels.com/terms-of-service> (wersja z 20 października 2026 r.).
- Dozwolone: pobieranie, używanie, kopiowanie, modyfikowanie i kadrowanie w celach komercyjnych i niekomercyjnych, bezpłatnie.
- Atrybucja: niewymagana (mile widziana).
- Zakazane m.in.: sprzedaż lub dystrybucja zdjęć w niezmienionej postaci (wydruki, tapety, merch, banki zdjęć), komercyjne użycie zdjęć z widocznymi znakami towarowymi i logotypami, sugerowanie poparcia przez osoby lub marki widoczne na zdjęciu, użycie zdjęcia jako elementu znaku towarowego lub nazwy firmy, masowe pobieranie i scraping.
- Uwaga: Pexels nie gwarantuje, że uzyskano zgody osób, właścicieli marek lub obiektów widocznych na zdjęciach.

### Unsplash

- Licencja: <https://unsplash.com/license>.
- Dozwolone: bezpłatne użycie komercyjne i niekomercyjne, kopiowanie i modyfikowanie, bez pytania autora o zgodę.
- Atrybucja: niewymagana (mile widziana).
- Zakazane: kompilowanie zdjęć w celu stworzenia podobnej lub konkurencyjnej usługi.
- **Nie używać zdjęć Unsplash+** — mają odrębną, płatną licencję (<https://unsplash.com/plus/license>).
- Strona licencji nie omawia zdjęć z rozpoznawalnymi osobami ani znakami towarowymi, dlatego takie zdjęcia trzeba ocenić indywidualnie lub ich unikać.

### Pixabay

- Podsumowanie licencji: <https://pixabay.com/en/service/license/>, pełna treść (Content License, pkt 5) w regulaminie: <https://pixabay.com/service/terms/> (wersja z 20 października 2026 r.).
- Dozwolone: użycie komercyjne i niekomercyjne, modyfikowanie, bez opłat.
- Atrybucja: niewymagana (mile widziana).
- Zakazane m.in.: sprzedaż lub dystrybucja treści w niezmienionej postaci, komercyjne użycie treści z rozpoznawalnymi znakami towarowymi, logotypami i markami, użycie niemoralne, niezgodne z prawem lub wprowadzające w błąd, użycie jako części znaku towarowego lub nazwy firmy.
- **Treści sponsorowane** (np. wyniki z innych banków zdjęć wyświetlane w Pixabay) nie są objęte licencją Pixabay — nie korzystać z nich.
- Uwaga: treści mogą podlegać innym prawom (wizerunek, prawa do obiektów, znaki towarowe); obowiązek oceny, czy potrzebna jest dodatkowa zgoda, spoczywa na użytkowniku.

---

## 4. Fotografie do pozyskania

Zdjęcia powinny tworzyć jedną historię: ciepłe, naturalne światło, ciemne lub drewniane tła, dużo powietrza w kadrze, bez mocnych filtrów. Unikać mieszania stylów (studyjne białe tło obok nastrojowych zdjęć). Wystarczy 6–8 starannie wybranych zdjęć.

| ID | Miejsce na stronie | Docelowe pliki | Motyw i kadr | Proporcje / min. rozmiar | Propozycja `alt` |
| --- | --- | --- | --- | --- | --- |
| F1 | Hero (`index.html`) — opcjonalnie | `assets/images/hero/hero-{640,1024,1600}.{avif,webp,jpg}` | sezonowe danie z góry na ciemnym blacie, ciepłe światło, bez ludzi i logo | 1:1, min. 1600 px | „Gnocchi z pieczoną dynią i szałwią, zdjęcie poglądowe” |
| F2 | „Jesień w karcie”, menu | `assets/images/dishes/gnocchi-dynia-*.{avif,webp,jpg}` | gnocchi z dynią i szałwią — **musi przedstawiać to danie** | 1:1, min. 1200 px | „Gnocchi z pieczoną dynią, zdjęcie poglądowe” |
| F3 | jw. | `assets/images/dishes/risotto-borowiki-*` | risotto z borowikami | 1:1, min. 1200 px | „Risotto z borowikami, zdjęcie poglądowe” |
| F4 | jw. | `assets/images/dishes/tatar-burak-*` | tatar z buraka | 1:1, min. 1200 px | „Tatar z pieczonego buraka, zdjęcie poglądowe” |
| F5 | jw. | `assets/images/dishes/panna-cotta-*` | panna cotta z gruszką lub owocami jesieni | 1:1, min. 1200 px | „Panna cotta z owocami, zdjęcie poglądowe” |
| F6 | „Miejsce na długie rozmowy” | `assets/images/interior/stolik-*` | nakryty stolik, świeca, len, drewno; **bez rozpoznawalnych osób, dzieł sztuki i logotypów** | 4:3, min. 1600 px | „Nakryty stolik przy świecy, zdjęcie poglądowe” |
| F7 | „Kameralne spotkania” | `assets/images/interior/stol-dlugi-*` | długi stół nakryty dla gości, zieleń, świece | 16:9, min. 1600 px | „Długi stół nakryty na przyjęcie, zdjęcie poglądowe” |
| F8 | opcjonalnie: składniki | `assets/images/ingredients/*.{avif,webp,jpg}` | dynia, borowiki, buraki, gruszki na prostym tle | 1:1, min. 800 px | puste `alt=""` (nazwa składnika jest w tekście obok) |

Przykładowe frazy wyszukiwania: *pumpkin gnocchi overhead*, *porcini risotto top view*, *beetroot tartare plate*, *panna cotta pear*, *candlelit restaurant table*, *long dinner table setting*.

Rekomendacja projektowa: talerz-kalendarz w hero jest elementem identyfikacji marki — warto go zachować, a zdjęcia wprowadzić w sekcjach „Jesień w karcie”, „Miejsce na długie rozmowy” i „Kameralne spotkania”.

---

## 5. Procedura weryfikacji każdego zdjęcia

1. Otwórz stronę **konkretnego** zdjęcia w serwisie (nie wynik sponsorowany, nie Unsplash+, nie treści iStock lub Getty Images wyświetlane w Pixabay).
2. Sprawdź oznaczenie licencji na stronie zdjęcia i aktualną wersję regulaminu serwisu.
3. Obejrzyj zdjęcie w pełnej rozdzielczości: brak znaków wodnych, widocznych logotypów i marek, rozpoznawalnych osób, dzieł sztuki i chronionych wnętrz.
4. Upewnij się, że zdjęcie dania przedstawia to danie, przy którym zostanie użyte.
5. Zapisz stronę zdjęcia (PDF lub zrzut ekranu z widoczną datą) w archiwum projektu poza repozytorium.
6. Uzupełnij rejestr w sekcji 6 **przed** publikacją strony.
7. Na stronie oznacz zdjęcia wnętrz i potraw jako poglądowe, dopóki nie zostaną zastąpione zdjęciami z prawdziwej restauracji.

---

## 6. Rejestr fotografii

Obecnie pusty — projekt nie zawiera fotografii. Każde dodane zdjęcie wpisz według wzoru:

| Plik lokalny | Autor | Serwis | Link do strony zdjęcia | Licencja | Link do warunków | Data weryfikacji | Użycie komercyjne bez obowiązkowej atrybucji | Ograniczenia | Sposób użycia w projekcie |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| — | — | — | — | — | — | — | — | — | — |

---

## 7. Optymalizacja po pozyskaniu zdjęć

- Przygotuj warianty 640, 1024 i 1600 px szerokości w AVIF i WebP oraz JPEG jako zapasowy (np. `sharp`, `squoosh-cli`, `cwebp`, `avifenc`). Jakość ok. 60–70 (AVIF) i 75–80 (WebP) zwykle nie daje widocznych artefaktów.
- Zachowaj proporcje i podaj `width`/`height`, aby uniknąć przesunięć układu.
- Zdjęcia poniżej pierwszego ekranu: `loading="lazy" decoding="async"`. Zdjęcie w hero: bez `lazy`, z `fetchpriority="high"`.
- Wzór znacznika znajdziesz w `README.md` (sekcja „Dodawanie fotografii”).
