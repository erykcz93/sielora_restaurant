# SIELORA — Kuchnia Sezonowa

Demonstracyjna strona internetowa fikcyjnej restauracji z kuchnią sezonową. Projekt do portfolio, przygotowany tak, aby po uzupełnieniu danych można go było wdrożyć dla prawdziwego lokalu.

> **Projekt demonstracyjny.** Restauracja, adres, e-mail i wszystkie dane kontaktowe są fikcyjne. Każda podstrona ma `noindex, nofollow`.

- Technologie: HTML5, CSS3, JavaScript bez bibliotek, własne grafiki SVG.
- Brak zależności, frameworków, czcionek zewnętrznych, skryptów analitycznych i plików cookies.
- Statyczna witryna gotowa do publikacji w GitHub Pages, także w podkatalogu repozytorium.

## Spis treści

1. [Struktura projektu](#struktura-projektu)
2. [Najważniejsze funkcje](#najważniejsze-funkcje)
3. [Uruchomienie lokalne](#uruchomienie-lokalne)
4. [Publikacja w GitHub Pages](#publikacja-w-github-pages)
5. [Edycja treści](#edycja-treści)
6. [Dodawanie fotografii](#dodawanie-fotografii)
7. [Wyniki testów](#wyniki-testów)
8. [SEO po wdrożeniu dla prawdziwej restauracji](#seo-po-wdrożeniu-dla-prawdziwej-restauracji)
9. [Bezpieczeństwo](#bezpieczeństwo)
10. [Lista kontrolna przed prawdziwym wdrożeniem](#lista-kontrolna-przed-prawdziwym-wdrożeniem)

## Struktura projektu

```text
/
├── index.html                   strona główna
├── menu.html                    pełna karta z filtrami (HTML generowany z menu-data.js)
├── o-nas.html                   historia nazwy, sposób pracy, pory roku
├── rezerwacje.html              demonstracyjny formularz rezerwacji
├── kontakt.html                 dane kontaktowe, mapa poglądowa, spotkania, dostępność
├── faq.html                     najczęstsze pytania
├── polityka-prywatnosci.html    projekt polityki prywatności z polami do uzupełnienia
├── 404.html                     samodzielna strona błędu (działa pod dowolnie głębokim adresem)
├── robots.txt
├── .nojekyll                    wyłącza przetwarzanie Jekyll w GitHub Pages
├── README.md
├── ASSET_PROVENANCE.md          pochodzenie grafik, warunki licencji, zdjęcia do pozyskania
├── tools/
│   └── build-menu.js            generuje statyczny HTML karty w menu.html (Node.js, bez zależności)
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── main.js              nawigacja mobilna, godziny otwarcia i status „dziś”
    │   ├── menu-data.js         dane karty: pozycje, ceny, skład, alergeny, diety
    │   ├── menu.js              renderowanie i filtrowanie karty
    │   └── reservations.js      walidacja formularza rezerwacji
    └── images/
        ├── branding/            logo, favicon, ikona iOS, obraz Open Graph
        ├── hero/                ilustracja „talerz-kalendarz”
        ├── ingredients/         ilustracje składników sezonowych
        ├── interior/            ilustracje stołów (poglądowe)
        ├── map/                 mapa poglądowa
        └── icons/               ikona listy rozwijanej
```

Struktura różni się od wstępnej propozycji w dwóch miejscach: grafiki są pogrupowane według przeznaczenia (`ingredients`, `map`, `icons`), a katalog `dishes/` powstanie dopiero wtedy, gdy pojawią się zdjęcia dań — pusty katalog nie byłby zapisany w repozytorium. Doszedł też `tools/build-menu.js`, opisany niżej.

## Najważniejsze funkcje

**Identyfikacja wizualna.** Logo zbudowane od podstaw: pierścień z czterech łuków (pory roku) i gałązka w kształcie litery S z czterema listkami; znak słowny narysowany jako ścieżki. Paleta: ciemna zieleń `#253C32`, ciepły krem `#F5F0E6`, terakota `#A76B46`, grafit `#242521`, piaskowe złoto `#C7A77E` oraz odcienie pochodne dobrane pod kontrast WCAG. Terakota ma stałe znaczenie: oznacza „teraz” — bieżący sezon, dzisiejszy dzień i aktywną podstronę.

**Strona główna.** Hero z „talerzem-kalendarzem”: na rancie talerza wypisano miesiące, a łuk zaznacza miesiące obecnej karty. Przy pierwszym wyświetleniu talerz obraca się do jesieni (animacja wyłączona przy `prefers-reduced-motion`). Dalej: idea kuchni, „Jesień w karcie” (składnik → danie z linkiem do pozycji w menu), wnętrze, kameralne wydarzenia, godziny otwarcia jako oś czasu z wyróżnionym dzisiejszym dniem oraz zaproszenie do rezerwacji. Linia pod przyciskami podaje aktualny status („Teraz otwarte…”) liczony w strefie czasowej Europe/Warsaw.

**Menu.** 24 pozycje z ceną, opisem, składem, alergenami (14 kategorii z załącznika II do rozporządzenia UE 1169/2011) i oznaczeniem diety tylko tam, gdzie wynika ono ze składu (np. panna cotta z żelatyną nie jest oznaczona jako wegetariańska). Filtry bez przeładowania strony: kategoria, dieta, wykluczenie wybranych alergenów; licznik wyników ogłaszany czytnikom ekranu; wybrana kategoria trafia do adresu (`menu.html#desery`), a linki do dań przewijają i wyróżniają pozycję (`menu.html#risotto-z-borowikami`). Karta jest zapisana w statycznym HTML, więc działa bez JavaScriptu, a styl druku drukuje pełną kartę.

**Rezerwacje.** Walidacja wszystkich pól z komunikatami przy polach i podsumowaniem błędów z linkami, ograniczenie dat (od dziś do 60 dni, bez poniedziałków), godziny co 30 minut zgodne z godzinami otwarcia (ostatnia rezerwacja 90 minut przed zamknięciem, dziś co najmniej godzinę naprzód), licznik znaków w uwagach. Po zatwierdzeniu strona pokazuje komunikat: „To demonstracja formularza. Żadna rezerwacja nie została wysłana ani zapisana.” Dane nie opuszczają przeglądarki i nie są zapisywane w cookies, localStorage ani sessionStorage. Bez JavaScriptu przycisk jest nieaktywny, a CSP (`form-action 'none'`) blokuje wysłanie formularza.

**Dostępność.** Semantyczne znaczniki i punkty orientacyjne, link „Przejdź do treści”, jedna hierarchia nagłówków na stronie, widoczny fokus, cele dotykowe co najmniej 24×24 px (przyciski 44–48 px), menu mobilne z `aria-expanded` i obsługą klawisza Escape, natywne `details/summary`, `fieldset/legend`, pola radiowe i checkboksy, `role="status"` i `aria-live` tam, gdzie treść zmienia się dynamicznie, obsługa `prefers-reduced-motion`, układ bez poziomego przewijania od 320 px oraz przy powiększeniu 200% i 400%.

**Polska typografia.** Twarde spacje po jednoliterowych spójnikach i przyimkach, między liczbą a jednostką i po skrótach (`ul.`, `art.`), półpauzy w zakresach godzin, cudzysłowy „…”.

## Uruchomienie lokalne

Strona nie wymaga instalacji ani kompilacji.

**Sposób 1.** Otwórz `index.html` bezpośrednio w przeglądarce. Wszystkie odwołania są względne, a skrypty nie są modułami ES, więc strona działa także z adresu `file://`.

**Sposób 2 (zalecany do testów).** Uruchom prosty serwer w katalogu projektu:

```bash
python3 -m http.server 8000
```

i otwórz <http://localhost:8000/>. Lokalny serwer nie podstawia strony `404.html` dla brakujących adresów — to robi dopiero GitHub Pages.

## Publikacja w GitHub Pages

1. Utwórz nowe repozytorium, np. `sielora`, i wgraj do niego **zawartość** tego katalogu (plik `index.html` ma się znaleźć w katalogu głównym repozytorium):

   ```bash
   git init
   git add .
   git commit -m "Strona SIELORA"
   git branch -M main
   git remote add origin https://github.com/TWOJA-NAZWA/sielora.git
   git push -u origin main
   ```

2. W repozytorium wejdź w **Settings → Pages**. W sekcji **Build and deployment** wybierz **Source: Deploy from a branch**, gałąź **main** i folder **/ (root)**, a następnie **Save**.
3. Po kilku minutach strona będzie dostępna pod adresem `https://TWOJA-NAZWA.github.io/sielora/`. Zaznacz **Enforce HTTPS**, jeśli opcja jest dostępna.
4. Nic nie trzeba przestawiać: ścieżki są względne, `.nojekyll` wyłącza Jekyll, a `404.html` jest automatycznie używany dla brakujących adresów. Pod głębszymi adresami (np. `/sielora/a/b`) skrypt w `404.html` sam ustala katalog witryny i poprawia linki.
5. Po publikacji uzupełnij `og:image` adresem bezwzględnym (patrz sekcja SEO) i zmierz wydajność w [PageSpeed Insights](https://pagespeed.web.dev/).

Plik `robots.txt` działa tylko w katalogu głównym domeny. W witrynie projektu (`/sielora/`) roboty go nie odczytają, dlatego za brak indeksacji odpowiada znacznik `meta robots` na każdej stronie.

## Edycja treści

### Menu

1. Edytuj `assets/js/menu-data.js`. Każda pozycja ma pola: `id` (adres kotwicy), `category`, `name`, opcjonalnie `portion`, `price` (zł brutto), `description`, `ingredients`, `allergens` (kody z obiektu `allergens`), `diet` (`'vegan'`, `'vegetarian'` lub `null`) i opcjonalnie `note`.
2. Uruchom w katalogu projektu (Node.js 18 lub nowszy, bez instalowania pakietów):

   ```bash
   node tools/build-menu.js
   ```

   Skrypt zapisuje aktualną kartę w statycznym HTML w `menu.html`. Jeśli o tym zapomnisz, `menu.js` porówna sumę kontrolną danych z zapisaną w HTML i wyrenderuje aktualną kartę w przeglądarce — strona pokaże dobre dane, ale bez zalet statycznego HTML (dostępność bez JavaScriptu, brak przesunięć układu).
3. Nowa kategoria: dodaj ją w tablicy `categories`; przycisk filtra powstanie automatycznie.

Oznaczenie wegetariańskie zakłada sery z podpuszczką mikrobiologiczną — przy zmianie dostawcy sprawdź skład.

### Godziny otwarcia

Godziny są w obiekcie `OPENING_HOURS` w `assets/js/main.js` (z niego korzystają status „dziś” i formularz rezerwacji) oraz w tekście stron: stopka, sekcja „Godziny otwarcia” na stronie głównej, `kontakt.html`, `rezerwacje.html` i `faq.html`. Szerokości pasków na osi czasu ustawiają klasy `hours__fill--20/21/23` w CSS.

### Sezon

Karta jest jesienna. Przy zmianie sezonu zaktualizuj: dane menu, sekcję „Jesień w karcie”, opis w `menu.html`, wyróżnienie `is-current` w `o-nas.html` oraz ilustrację w hero (łuk na rancie generuje się z listy miesięcy; najłatwiej przygotować nową wersję pliku SVG).

## Dodawanie fotografii

Obecna wersja nie zawiera zdjęć — z powodów opisanych w `ASSET_PROVENANCE.md` zastosowano autorskie ilustracje. Lista potrzebnych zdjęć, warunki licencji serwisów i procedura weryfikacji znajdują się w tym samym pliku. Po pozyskaniu i zweryfikowaniu zdjęcia przygotuj warianty, np. biblioteką [sharp](https://sharp.pixelplumbing.com/) (Node.js). Instalacja jest tymczasowa i nie dodaje zależności do projektu:

```bash
npm install --no-save sharp
node -e "const sharp = require('sharp');
for (const w of [640, 1024, 1600]) for (const [fmt, q] of [['avif', 62], ['webp', 78], ['jpeg', 80]])
  sharp('risotto.jpg').resize(w).toFormat(fmt, { quality: q })
    .toFile('assets/images/dishes/risotto-borowiki-' + w + '.' + (fmt === 'jpeg' ? 'jpg' : fmt));"
```

Następnie wstaw je z wariantami rozdzielczości:

```html
<picture>
  <source type="image/avif" srcset="assets/images/dishes/risotto-borowiki-640.avif 640w, assets/images/dishes/risotto-borowiki-1024.avif 1024w" sizes="(min-width: 64em) 22rem, (min-width: 40em) 45vw, 90vw">
  <source type="image/webp" srcset="assets/images/dishes/risotto-borowiki-640.webp 640w, assets/images/dishes/risotto-borowiki-1024.webp 1024w" sizes="(min-width: 64em) 22rem, (min-width: 40em) 45vw, 90vw">
  <img src="assets/images/dishes/risotto-borowiki-1024.jpg" width="1024" height="1024" alt="Risotto z borowikami, zdjęcie poglądowe" loading="lazy" decoding="async">
</picture>
```

Zdjęcie w hero wczytuj bez `loading="lazy"` i z `fetchpriority="high"`. Każde zdjęcie wpisz do rejestru w `ASSET_PROVENANCE.md`.

## Wyniki testów

Testy wykonano 28 października 2026 r. w środowisku lokalnym (Chromium 153 sterowany przez Playwright, serwer `python3 -m http.server`). Nie było dostępu do sieci zewnętrznej, więc **nie uruchomiono** PageSpeed Insights, Lighthouse, walidatora W3C ani axe — poniżej są wyniki własnych testów automatycznych.

**Kontrola statyczna (skrypt w Pythonie):** poprawne zagnieżdżenie i zamknięcie znaczników, unikalne `id`, istniejące cele `aria-describedby`/`aria-labelledby`/`aria-controls` i `label for`, `alt` oraz `width`/`height` przy każdym obrazie, jeden `<h1>` i brak przeskoków poziomów nagłówków, brak atrybutów `style` (blokowanych przez CSP), istniejące pliki i kotwice dla wszystkich linków, brak ścieżek bezwzględnych, brak nieużywanych plików i klas CSS. Wynik: 0 problemów na 8 stronach.

**Testy w przeglądarce (73 przypadki):** brak błędów konsoli i naruszeń CSP na 8 stronach przez `http://` i `file://`; brak poziomego przewijania na 8 stronach × 9 szerokościach (320–1920 px) i przy powiększeniu 200%/400%; kontrast tekstu AA (obliczony dla każdego widocznego tekstu) przy 390 i 1280 px; cele dotykowe ≥ 24×24 px; skip link; menu mobilne (Enter, Tab, Escape, kliknięcie poza menu); widoczny fokus dla wszystkich elementów osiąganych klawiszem Tab; filtry menu (kategorie, klawiatura, diety, 14 alergenów, stan pusty, reset, adres `#kategoria`, kotwice dań, wersja bez JavaScriptu); formularz rezerwacji (błędy, podsumowanie, daty, godziny, e-mail, komunikat końcowy, brak wstrzykiwania HTML, brak zapisu danych i żądań sieciowych); animacja tylko bez `prefers-reduced-motion`; strona 404 w symulowanym podkatalogu GitHub Pages.

**Pomiar laboratoryjny wydajności** (profil zbliżony do mobilnego Lighthouse: 412×823 px, RTT 150 ms, 1,6 Mb/s, CPU ×4, pusta pamięć podręczna; mediana z 3 pomiarów):

| Strona | FCP | LCP | CLS | TBT | Transfer* | Żądania |
| --- | --- | --- | --- | --- | --- | --- |
| index.html | 0,65 s | 0,90 s | 0 | 2 ms | 88 KB | 5 |
| menu.html | 0,73 s | 0,73 s | 0 | 0 ms | 126 KB | 6 |
| o-nas.html | 0,63 s | 0,63 s | 0 | 0 ms | 60 KB | 4 |
| rezerwacje.html | 0,65 s | 0,65 s | 0 | 0 ms | 72 KB | 6 |
| kontakt.html | 0,63 s | 0,63 s | 0 | 0 ms | 64 KB | 5 |
| faq.html | 0,61 s | 0,61 s | 0 | 0 ms | 65 KB | 5 |
| polityka-prywatnosci.html | 0,64 s | 0,64 s | 0 | 0 ms | 61 KB | 4 |

\* bez kompresji; GitHub Pages wysyła HTML, CSS, JS i SVG skompresowane (np. `style.css` 41 KB → ok. 8 KB w gzip). Najdłuższa zmierzona interakcja (Event Timing, CPU ×4): 40 ms przy filtrach menu i 48 ms w formularzu i nawigacji.

To pomiar lokalny, a nie wynik PageSpeed Insights: nie uwzględnia DNS, TLS ani odległości od serwera. Po publikacji zmierz stronę w PageSpeed Insights.

**Czego nie sprawdzono automatycznie:** działania z czytnikami ekranu (NVDA, JAWS, VoiceOver, TalkBack), przeglądarek Safari i Firefox, rzeczywistych urządzeń mobilnych i walidatora W3C. Projekt nie deklaruje pełnej zgodności z WCAG 2.2 — przed wdrożeniem warto przeprowadzić audyt z udziałem technologii wspomagających.

## SEO po wdrożeniu dla prawdziwej restauracji

Wersja demonstracyjna celowo blokuje indeksację i nie zawiera danych strukturalnych. Przy wdrożeniu:

1. Usuń `<meta name="robots" content="noindex, nofollow">` ze wszystkich stron (w `404.html` może zostać).
2. Dodaj adres kanoniczny na każdej stronie, np. `<link rel="canonical" href="https://www.twojarestauracja.pl/menu.html">`.
3. Zmień `og:image` na adres bezwzględny i dodaj `og:url`, np. `<meta property="og:image" content="https://www.twojarestauracja.pl/assets/images/branding/og-image.png">`. Przygotuj nowy obraz Open Graph z prawdziwym zdjęciem.
4. Dodaj `sitemap.xml` i wpis `Sitemap: https://www.twojarestauracja.pl/sitemap.xml` w `robots.txt` w katalogu głównym domeny.
5. Uzupełnij tytuły i opisy o miasto i dzielnicę, a treści o prawdziwe dane (adres, telefon, dojazd, parking).
6. Dodaj dane strukturalne JSON-LD **wyłącznie z prawdziwymi, sprawdzonymi danymi**, np.:

   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "Restaurant",
     "name": "NAZWA RESTAURACJI",
     "url": "https://www.twojarestauracja.pl/",
     "telephone": "+48 …",
     "address": { "@type": "PostalAddress", "streetAddress": "…", "postalCode": "…", "addressLocality": "…", "addressCountry": "PL" },
     "servesCuisine": "Kuchnia europejska",
     "menu": "https://www.twojarestauracja.pl/menu.html",
     "acceptsReservations": "True",
     "openingHoursSpecification": [
       { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday", "Wednesday", "Thursday"], "opens": "12:00", "closes": "21:00" }
     ]
   }
   </script>
   ```

7. Załóż i zweryfikuj profil firmy w Google oraz Google Search Console; dbaj o identyczne dane adresowe we wszystkich serwisach.

## Bezpieczeństwo

- Każda strona ma politykę CSP w znaczniku `meta`: `default-src 'none'`, skrypty i style tylko z tej samej domeny, `form-action 'none'`, `base-uri 'none'`. Jedyny skrypt w kodzie strony (dodanie klasy `js`) jest dopuszczony skrótem SHA-256. Strona 404 ma własne skróty dla wbudowanego stylu i skryptu.
- Po zmianie wbudowanego skryptu oblicz nowy skrót i wpisz go do CSP:

  ```bash
  printf '%s' "document.documentElement.classList.add('js');" | openssl dgst -sha256 -binary | openssl base64
  ```

- Brak skryptów zewnętrznych, trackerów, cookies, Web Storage, kluczy API i sekretów. Dane z formularza są wstawiane do strony wyłącznie jako tekst.
- GitHub Pages nie pozwala ustawiać nagłówków HTTP. W docelowym hostingu ustaw nagłówki: `Content-Security-Policy` (z `frame-ancestors 'none'`, którego nie da się ustawić w `meta`), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` oraz HSTS.
- Dodanie map, systemu rezerwacji, analityki czy czcionek z zewnętrznych serwerów wymaga zmiany CSP, aktualizacji polityki prywatności i — w przypadku narzędzi zapisujących dane w urządzeniu — zgody użytkownika.

## Lista kontrolna przed prawdziwym wdrożeniem

- [ ] Prawdziwe dane firmy: nazwa, adres, telefon, e-mail, dane rejestrowe; usunięcie paska „Projekt demonstracyjny” i notatek o fikcyjności.
- [ ] Polityka prywatności: uzupełnienie pól „do uzupełnienia” i weryfikacja prawna.
- [ ] Skład, alergeny i oznaczenia diet sprawdzone z rzeczywistymi recepturami; procedura aktualizacji przy zmianie karty.
- [ ] Prawdziwy system rezerwacji (backend lub zewnętrzna usługa) z klauzulą informacyjną przy formularzu, zabezpieczeniem przed spamem i aktualizacją CSP.
- [ ] Zweryfikowany na miejscu opis dostępności lokalu (wejście, przejścia, toaleta, parking).
- [ ] Audyt dostępności strony z udziałem technologii wspomagających i sprawdzenie obowiązujących wymagań prawnych.
- [ ] Zdjęcia: pozyskanie, weryfikacja licencji i wpis w `ASSET_PROVENANCE.md`; docelowo zdjęcia z prawdziwej restauracji.
- [ ] Mapa z rzeczywistą lokalizacją (link lub osadzenie po zmianie CSP i polityki prywatności).
- [ ] Konfiguracja SEO z sekcji powyżej i pomiar w PageSpeed Insights po publikacji.
- [ ] Wybór licencji dla kodu i grafik (repozytorium nie zawiera pliku licencji).
