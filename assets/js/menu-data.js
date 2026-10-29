/*
  Karta SIELORY — jedyne źródło danych o menu.
  Po edycji uruchom `node tools/build-menu.js`, aby odświeżyć statyczny HTML w menu.html
  (strona i tak wyświetli nowe dane od razu, gdy zmiany wykryje skrypt menu.js).

  Skład, alergeny i oznaczenia diet mają charakter demonstracyjny. Przed użyciem
  w prawdziwej restauracji należy je sprawdzić z rzeczywistymi recepturami.
*/
'use strict';

const MENU_DATA = {
  season: 'Karta jesienna',

  // 14 alergenów wymienionych w załączniku II do rozporządzenia (UE) nr 1169/2011
  allergens: {
    gluten: { no: 1, name: 'Gluten', full: 'Zboża zawierające gluten: pszenica (w tym orkisz i pszenica khorasan), żyto, jęczmień, owies oraz produkty pochodne' },
    crustaceans: { no: 2, name: 'Skorupiaki', full: 'Skorupiaki i produkty pochodne' },
    eggs: { no: 3, name: 'Jaja', full: 'Jaja i produkty pochodne' },
    fish: { no: 4, name: 'Ryby', full: 'Ryby i produkty pochodne' },
    peanuts: { no: 5, name: 'Orzeszki ziemne', full: 'Orzeszki ziemne (arachidowe) i produkty pochodne' },
    soy: { no: 6, name: 'Soja', full: 'Soja i produkty pochodne' },
    milk: { no: 7, name: 'Mleko', full: 'Mleko i produkty pochodne (łącznie z laktozą)' },
    nuts: { no: 8, name: 'Orzechy', full: 'Orzechy: migdały, laskowe, włoskie, nerkowca, pekan, brazylijskie, pistacjowe, makadamia oraz produkty pochodne' },
    celery: { no: 9, name: 'Seler', full: 'Seler i produkty pochodne' },
    mustard: { no: 10, name: 'Gorczyca', full: 'Gorczyca i produkty pochodne' },
    sesame: { no: 11, name: 'Sezam', full: 'Nasiona sezamu i produkty pochodne' },
    sulphites: { no: 12, name: 'Siarczyny', full: 'Dwutlenek siarki i siarczyny w stężeniu powyżej 10 mg/kg lub 10 mg/l w przeliczeniu na SO₂' },
    lupin: { no: 13, name: 'Łubin', full: 'Łubin i produkty pochodne' },
    molluscs: { no: 14, name: 'Mięczaki', full: 'Mięczaki i produkty pochodne' }
  },

  diets: {
    vegetarian: 'Wegetariańskie',
    vegan: 'Wegańskie'
  },

  categories: [
    { id: 'przystawki', name: 'Przystawki', description: 'Na początek, do podziału albo dla jednej osoby.' },
    { id: 'dania-glowne', name: 'Dania główne', description: 'Mięso, ryba i warzywa w roli głównej, z dodatkami z bieżącego sezonu.' },
    { id: 'makarony', name: 'Makarony i dania mączne', description: 'Makarony, ravioli i gnocchi przygotowujemy na miejscu, każdego dnia.' },
    { id: 'desery', name: 'Desery', description: 'Pieczone i schładzane u nas, w niewielkich porcjach na każdy dzień.' },
    { id: 'napoje', name: 'Napoje', description: 'Kawa, herbata i napoje bezalkoholowe.' }
  ],

  items: [
    {
      id: 'focaccia-z-oliwa-ziolowa',
      category: 'przystawki',
      name: 'Focaccia z oliwą ziołową',
      price: 18,
      description: 'Pieczona każdego ranka na długo wyrastającym cieście, z chrupiącą skórką i miękkim środkiem. Podajemy ją ciepłą, z oliwą aromatyzowaną rozmarynem i tymiankiem.',
      ingredients: ['mąka pszenna', 'oliwa z oliwek extra virgin', 'drożdże', 'sól morska', 'rozmaryn', 'tymianek', 'czosnek'],
      allergens: ['gluten'],
      diet: 'vegan'
    },
    {
      id: 'krem-z-pieczonych-pomidorow',
      category: 'przystawki',
      name: 'Krem z pieczonych pomidorów',
      price: 25,
      description: 'Pomidory i czerwoną paprykę pieczemy do lekkiego przypieczenia, a potem miksujemy na gładko z bulionem warzywnym. Na wierzchu kleks śmietany, oliwa bazyliowa i prażone pestki dyni.',
      ingredients: ['pomidory', 'czerwona papryka', 'cebula', 'czosnek', 'bulion warzywny z selerem', 'śmietana 18%', 'oliwa z oliwek', 'bazylia', 'pestki dyni'],
      allergens: ['celery', 'milk'],
      diet: 'vegetarian'
    },
    {
      id: 'burrata-z-pomidorami',
      category: 'przystawki',
      name: 'Burrata z pomidorami',
      price: 39,
      description: 'Kremowa burrata na pomidorach malinowych i koktajlowych, skropiona zieloną oliwą i redukcją z octu balsamicznego. Do tego listki bazylii i szczypta soli morskiej.',
      ingredients: ['burrata (podpuszczka mikrobiologiczna)', 'pomidory malinowe', 'pomidory koktajlowe', 'oliwa z oliwek extra virgin', 'redukcja z octu balsamicznego', 'bazylia', 'sól morska'],
      allergens: ['milk', 'sulphites'],
      diet: 'vegetarian'
    },
    {
      id: 'tatar-z-pieczonego-buraka',
      category: 'przystawki',
      name: 'Tatar z pieczonego buraka',
      price: 32,
      description: 'Buraki pieczone w soli siekamy jak klasyczny tatar i doprawiamy szalotką, kaparami, musztardą Dijon i chrzanem. Podajemy z prażonymi orzechami włoskimi i chrupkim pieczywem żytnim.',
      ingredients: ['pieczony burak', 'szalotka', 'kapary', 'musztarda Dijon', 'chrzan', 'oliwa z oliwek', 'koperek', 'orzechy włoskie', 'pieczywo żytnie'],
      allergens: ['gluten', 'mustard', 'nuts', 'sulphites'],
      diet: 'vegan'
    },
    {
      id: 'krewetki-z-czosnkiem-i-cytryna',
      category: 'przystawki',
      name: 'Krewetki z czosnkiem i cytryną',
      price: 46,
      description: 'Krewetki smażone krótko na maśle z czosnkiem, chili i natką pietruszki, z odrobiną białego wina i soku z cytryny. Sos najlepiej zebrać kawałkiem focaccii, którą podajemy obok.',
      ingredients: ['krewetki tygrysie', 'masło', 'czosnek', 'papryczka chili', 'białe wino', 'cytryna', 'natka pietruszki', 'focaccia'],
      allergens: ['crustaceans', 'milk', 'sulphites', 'gluten'],
      diet: null
    },
    {
      id: 'risotto-z-borowikami',
      category: 'dania-glowne',
      name: 'Risotto z borowikami',
      price: 57,
      description: 'Ryż carnaroli gotowany powoli na bulionie warzywnym, z podsmażonymi borowikami, tymiankiem i dojrzewającym serem. Na koniec dodajemy masło, żeby risotto było kremowe, ale nie ciężkie.',
      ingredients: ['ryż carnaroli', 'borowiki', 'szalotka', 'białe wino', 'bulion warzywny z selerem', 'masło', 'ser dojrzewający (podpuszczka mikrobiologiczna)', 'tymianek', 'natka pietruszki'],
      allergens: ['milk', 'celery', 'sulphites'],
      diet: 'vegetarian'
    },
    {
      id: 'piers-z-kurczaka-z-puree',
      category: 'dania-glowne',
      name: 'Pierś z kurczaka z puree',
      price: 62,
      description: 'Pierś z kurczaka pieczona ze skórą, podana na maślanym puree ziemniaczanym, z glazurowaną marchewką i sosem z pieczenia z tymiankiem.',
      ingredients: ['pierś z kurczaka', 'ziemniaki', 'masło', 'mleko', 'marchew', 'miód', 'sos z pieczenia na wywarze z selerem', 'tymianek'],
      allergens: ['milk', 'celery'],
      diet: null
    },
    {
      id: 'poledwiczka-wieprzowa-z-rozmarynem',
      category: 'dania-glowne',
      name: 'Polędwiczka wieprzowa z rozmarynem',
      price: 69,
      description: 'Polędwiczka pieczona z rozmarynem i czosnkiem, krojona w grube medaliony. Podajemy ją z pieczonym jabłkiem, ziemniakami z pieca i kremowym sosem musztardowym.',
      ingredients: ['polędwiczka wieprzowa', 'rozmaryn', 'czosnek', 'jabłka', 'ziemniaki', 'śmietanka 30%', 'musztarda ziarnista', 'białe wino'],
      allergens: ['milk', 'mustard', 'sulphites'],
      diet: null
    },
    {
      id: 'pstrag-pieczony-z-warzywami',
      category: 'dania-glowne',
      name: 'Pstrąg pieczony z warzywami',
      price: 74,
      description: 'Filet z pstrąga pieczony z masłem ziołowym i cytryną. Podajemy go na pieczonej marchwi, pietruszce i selerze korzeniowym.',
      ingredients: ['filet z pstrąga', 'masło', 'koperek', 'natka pietruszki', 'cytryna', 'marchew', 'korzeń pietruszki', 'seler korzeniowy', 'oliwa z oliwek'],
      allergens: ['fish', 'milk', 'celery'],
      diet: null
    },
    {
      id: 'stek-z-kalafiora-z-sosem-tahini',
      category: 'dania-glowne',
      name: 'Stek z kalafiora z sosem tahini',
      price: 52,
      description: 'Gruby plaster kalafiora pieczony w wysokiej temperaturze, aż zbrązowieje na brzegach. Podajemy go z sosem tahini, prażoną ciecierzycą, granatem i natką.',
      ingredients: ['kalafior', 'pasta tahini', 'cytryna', 'czosnek', 'ciecierzyca', 'granat', 'natka pietruszki', 'oliwa z oliwek', 'kumin', 'wędzona papryka'],
      allergens: ['sesame'],
      diet: 'vegan'
    },
    {
      id: 'wolno-duszona-wolowina',
      category: 'dania-glowne',
      name: 'Wolno duszona wołowina',
      price: 78,
      description: 'Policzki wołowe duszone przez kilka godzin w czerwonym winie z warzywami korzeniowymi, aż mięso rozpada się pod widelcem. Podajemy z puree z pasternaku i glazurowanymi szalotkami.',
      ingredients: ['policzki wołowe', 'czerwone wino', 'marchew', 'seler korzeniowy', 'cebula', 'czosnek', 'liść laurowy', 'pasternak', 'masło', 'szalotki'],
      allergens: ['celery', 'sulphites', 'milk'],
      diet: null
    },
    {
      id: 'tagliatelle-z-pesto-bazyliowym',
      category: 'makarony',
      name: 'Tagliatelle z pesto bazyliowym',
      price: 51,
      description: 'Świeże tagliatelle na jajach, wymieszane z pesto z bazylii, orzeszków piniowych i dojrzewającego sera. Podajemy z pomidorkami confit i świeżą bazylią.',
      ingredients: ['mąka pszenna', 'jaja', 'bazylia', 'orzeszki piniowe', 'ser dojrzewający (podpuszczka mikrobiologiczna)', 'oliwa z oliwek extra virgin', 'czosnek', 'pomidorki koktajlowe'],
      allergens: ['gluten', 'eggs', 'milk'],
      diet: 'vegetarian'
    },
    {
      id: 'ravioli-z-ricotta-i-szpinakiem',
      category: 'makarony',
      name: 'Ravioli z ricottą i szpinakiem',
      price: 55,
      description: 'Ręcznie lepione ravioli z nadzieniem z ricotty, szpinaku i gałki muszkatołowej. Podajemy z masłem szałwiowym, prażonymi orzechami laskowymi i tartym serem.',
      ingredients: ['mąka pszenna', 'jaja', 'ricotta', 'szpinak', 'ser dojrzewający (podpuszczka mikrobiologiczna)', 'gałka muszkatołowa', 'masło', 'szałwia', 'orzechy laskowe'],
      allergens: ['gluten', 'eggs', 'milk', 'nuts'],
      diet: 'vegetarian'
    },
    {
      id: 'gnocchi-z-pieczona-dynia',
      category: 'makarony',
      name: 'Gnocchi z pieczoną dynią',
      price: 49,
      description: 'Ziemniaczane gnocchi z karmelizowaną dynią hokkaido, chrupiącą szałwią i prażonymi pestkami dyni, polane oliwą ze skórką cytryny. Danie w całości roślinne.',
      ingredients: ['ziemniaki', 'mąka pszenna', 'dynia hokkaido', 'szałwia', 'pestki dyni', 'oliwa z oliwek', 'czosnek', 'skórka z cytryny'],
      allergens: ['gluten'],
      diet: 'vegan'
    },
    {
      id: 'sernik-waniliowy',
      category: 'desery',
      name: 'Sernik waniliowy',
      price: 29,
      description: 'Gęsty, kremowy sernik z laską wanilii na kruchym, maślanym spodzie. Podajemy go schłodzonego, z odrobiną skórki cytrynowej.',
      ingredients: ['twaróg', 'jaja', 'cukier', 'laska wanilii', 'masło', 'mąka pszenna', 'skórka z cytryny'],
      allergens: ['milk', 'eggs', 'gluten'],
      diet: 'vegetarian'
    },
    {
      id: 'mus-czekoladowy',
      category: 'desery',
      name: 'Mus czekoladowy',
      price: 28,
      description: 'Puszysty mus z gorzkiej czekolady z kryształkami soli morskiej. Podajemy go z bitą śmietaną i kruszonką z orzechów laskowych.',
      ingredients: ['gorzka czekolada 70% z lecytyną sojową', 'jaja', 'śmietanka 30%', 'cukier', 'sól morska', 'orzechy laskowe'],
      allergens: ['eggs', 'milk', 'soy', 'nuts'],
      diet: 'vegetarian'
    },
    {
      id: 'panna-cotta-z-owocami',
      category: 'desery',
      name: 'Panna cotta z owocami',
      price: 27,
      description: 'Delikatna panna cotta z wanilią, podana z pieczoną gruszką i jeżynami. Owoce zmieniamy razem z sezonem.',
      ingredients: ['śmietanka 30%', 'mleko', 'cukier', 'wanilia', 'żelatyna wieprzowa', 'gruszka', 'jeżyny'],
      allergens: ['milk'],
      diet: null
    },
    {
      id: 'sorbet-sezonowy',
      category: 'desery',
      name: 'Sorbet sezonowy',
      price: 23,
      description: 'Lekki sorbet bez nabiału, przygotowywany z owoców, które akurat są w sezonie. Tej jesieni robimy go z gruszek i pigwy.',
      ingredients: ['przecier z gruszek', 'pigwa', 'cukier', 'woda', 'sok z cytryny'],
      allergens: [],
      diet: 'vegan'
    },
    {
      id: 'espresso',
      category: 'napoje',
      name: 'Espresso',
      price: 12,
      description: 'Krótkie, intensywne espresso z ziaren arabiki, z nutą kakao i suszonych owoców.',
      ingredients: ['kawa 100% arabika'],
      allergens: [],
      diet: 'vegan'
    },
    {
      id: 'flat-white',
      category: 'napoje',
      name: 'Flat white',
      price: 17,
      description: 'Podwójne espresso z cienką warstwą aksamitnie spienionego mleka.',
      ingredients: ['podwójne espresso', 'mleko krowie'],
      allergens: ['milk'],
      diet: 'vegetarian',
      note: 'Na życzenie przygotujemy je na napoju owsianym. Ta wersja nie zawiera mleka, ale może zawierać gluten.'
    },
    {
      id: 'herbata-lisciasta',
      category: 'napoje',
      name: 'Herbata liściasta',
      price: 15,
      description: 'Herbata parzona z całych liści w dzbanku. Do wyboru mamy czarną, zieloną i napar ziołowy, a aktualny wybór poda obsługa.',
      ingredients: ['herbata liściasta lub mieszanka ziół'],
      allergens: [],
      diet: 'vegan'
    },
    {
      id: 'lemoniada-domowa',
      category: 'napoje',
      name: 'Lemoniada domowa',
      portion: '400 ml',
      price: 19,
      description: 'Lemoniada na świeżo wyciskanych cytrynach, słodzona syropem z trzciny cukrowej, z miętą i plasterkami imbiru.',
      ingredients: ['woda', 'sok z cytryn', 'syrop z trzciny cukrowej', 'mięta', 'imbir'],
      allergens: [],
      diet: 'vegan'
    },
    {
      id: 'woda-mineralna',
      category: 'napoje',
      name: 'Woda mineralna',
      portion: '330 ml',
      price: 9,
      description: 'Niegazowana lub gazowana, podawana schłodzona.',
      ingredients: ['woda mineralna'],
      allergens: [],
      diet: 'vegan'
    },
    {
      id: 'herbata-mrozona',
      category: 'napoje',
      name: 'Herbata mrożona',
      portion: '400 ml',
      price: 18,
      description: 'Zimny napar z czarnej herbaty z pieczonym jabłkiem, cytryną i odrobiną cynamonu, słodzony z umiarem.',
      ingredients: ['czarna herbata', 'jabłko', 'cytryna', 'cynamon', 'cukier trzcinowy'],
      allergens: [],
      diet: 'vegan'
    }
  ]
};

// Udostępnienie danych skryptowi tools/build-menu.js (Node.js); w przeglądarce ten warunek nie jest spełniony.
if (typeof module === 'object' && module.exports) {
  module.exports = MENU_DATA;
}
