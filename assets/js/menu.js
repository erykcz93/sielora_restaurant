/*
  Karta menu: renderowanie z MENU_DATA oraz filtrowanie bez przeładowania strony.
  Te same funkcje renderujące wykorzystuje tools/build-menu.js, który zapisuje statyczny HTML
  w menu.html. Dzięki temu karta jest widoczna także bez JavaScriptu i nie przesuwa układu.
*/
(function () {
  'use strict';

  const NBSP = ' ';
  const CATEGORY_ALL = 'wszystko';
  const DIET_ALL = 'wszystkie';

  const ICONS = {
    leaf: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="m5 19 8-8"/></svg>',
    chevron: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>'
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/ /g, '&nbsp;');
  }

  // Polska typografia: jednoliterowe spójniki i przyimki nie mogą zostać na końcu wiersza.
  // Drugi przebieg obsługuje sąsiadujące wyrazy jednoliterowe („i w”).
  function typo(text) {
    const rule = /(^|[\s( ])([aiouwzAIOUWZ]) +/g;
    return String(text).replace(rule, '$1$2' + NBSP).replace(rule, '$1$2' + NBSP);
  }

  function text(value) {
    return escapeHtml(typo(value));
  }

  function formatPrice(value) {
    return value + NBSP + 'zł';
  }

  function sortedAllergens(data) {
    return Object.keys(data.allergens)
      .map(function (code) { return Object.assign({ code: code }, data.allergens[code]); })
      .sort(function (a, b) { return a.no - b.no; });
  }

  function renderDish(item, data, pad) {
    const allergens = item.allergens
      .map(function (code) { return Object.assign({ code: code }, data.allergens[code]); })
      .sort(function (a, b) { return a.no - b.no; });
    const portion = item.portion ? ' <span class="dish__portion">' + escapeHtml(item.portion) + '</span>' : '';
    const lines = [
      '<li class="dish" id="' + item.id + '" data-category="' + item.category + '" data-diet="' + (item.diet || '') + '" data-allergens="' + item.allergens.join(' ') + '">',
      '  <div class="dish__head">',
      '    <h3 class="dish__name">' + text(item.name) + portion + '</h3>',
      '    <span class="dish__dots" aria-hidden="true"></span>',
      '    <p class="dish__price"><data value="' + item.price + '">' + escapeHtml(formatPrice(item.price)) + '</data></p>',
      '  </div>',
      '  <p class="dish__desc">' + text(item.description) + '</p>',
      '  <p class="dish__ingredients"><span class="dish__label">Skład:</span> ' + text(item.ingredients.join(', ')) + '</p>'
    ];
    if (item.note) {
      lines.push('  <p class="dish__note">' + text(item.note) + '</p>');
    }
    lines.push('  <div class="dish__meta">');
    if (item.diet) {
      lines.push('    <p class="dish__diet">' + ICONS.leaf + escapeHtml(data.diets[item.diet]) + '</p>');
    }
    if (allergens.length) {
      lines.push('    <div class="dish__allergens"><span class="dish__label">Alergeny:</span><ul>' +
        allergens.map(function (a) {
          return '<li class="allergen"><span class="allergen__no" aria-hidden="true">' + a.no + '</span>' + escapeHtml(a.name) + '</li>';
        }).join('') + '</ul></div>');
    } else {
      lines.push('    <p class="dish__allergens"><span class="dish__label">Alergeny:</span> brak alergenów z' + NBSP + 'wykazu UE</p>');
    }
    lines.push('  </div>', '</li>');
    return lines.map(function (line) { return pad + line; }).join('\n');
  }

  function renderList(data, pad) {
    pad = pad || '';
    return data.categories.map(function (category) {
      const items = data.items.filter(function (item) { return item.category === category.id; });
      return [
        pad + '<section class="menu-category" id="kategoria-' + category.id + '" data-category-section="' + category.id + '" aria-labelledby="kategoria-' + category.id + '-tytul">',
        pad + '  <div class="menu-category__head">',
        pad + '    <h2 id="kategoria-' + category.id + '-tytul">' + text(category.name) + '</h2>',
        pad + '    <p class="menu-category__desc">' + text(category.description) + '</p>',
        pad + '  </div>',
        pad + '  <ul class="dishes">',
        items.map(function (item) { return renderDish(item, data, pad + '    '); }).join('\n'),
        pad + '  </ul>',
        pad + '</section>'
      ].join('\n');
    }).join('\n');
  }

  function renderFilters(data, pad) {
    pad = pad || '';
    const chip = function (name, value, label, checked) {
      return '<label class="chip"><input type="radio" name="' + name + '" id="filtr-' + name + '-' + value + '" value="' + value + '"' +
        (checked ? ' checked' : '') + '><span>' + text(label) + '</span></label>';
    };
    const lines = [
      '<form class="menu-filters" data-menu-filters aria-labelledby="filtry-tytul">',
      '  <h2 class="menu-filters__title" id="filtry-tytul">Filtruj kartę</h2>',
      '  <fieldset class="filter-group">',
      '    <legend>Kategoria</legend>',
      '    <div class="chips">',
      '      ' + chip('kategoria', CATEGORY_ALL, 'Całe menu', true)
    ];
    data.categories.forEach(function (category) {
      lines.push('      ' + chip('kategoria', category.id, category.name, false));
    });
    lines.push(
      '    </div>',
      '  </fieldset>',
      '  <fieldset class="filter-group">',
      '    <legend>Dieta</legend>',
      '    <div class="chips">',
      '      ' + chip('dieta', DIET_ALL, 'Bez ograniczeń', true)
    );
    Object.keys(data.diets).forEach(function (code) {
      lines.push('      ' + chip('dieta', code, data.diets[code], false));
    });
    lines.push(
      '    </div>',
      '  </fieldset>',
      '  <details class="filter-group filter-group--allergens">',
      '    <summary>Ukryj alergeny<span data-allergen-count></span>' + ICONS.chevron + '</summary>',
      '    <fieldset>',
      '      <legend>Ukryj pozycje, które zawierają:</legend>',
      '      <div class="checks">'
    );
    sortedAllergens(data).forEach(function (a) {
      lines.push('        <label class="check"><input type="checkbox" name="alergen" id="filtr-alergen-' + a.code + '" value="' + a.code + '">' +
        '<span class="check__no" aria-hidden="true">' + a.no + '</span>' + escapeHtml(a.name) + '</label>');
    });
    lines.push(
      '      </div>',
      '      <p class="filter-note">' + text('Filtr opiera się na składzie podanym w karcie. W kuchni pracujemy ze wszystkimi alergenami z wykazu, dlatego przy alergii zawsze poinformuj obsługę.') + '</p>',
      '    </fieldset>',
      '  </details>',
      '  <button type="reset" class="button button--ghost button--small">Wyczyść filtry</button>',
      '</form>'
    );
    return lines.map(function (line) { return pad + line; }).join('\n');
  }

  function renderLegend(data, pad) {
    pad = pad || '';
    return [
      pad + '<summary>Wykaz 14 alergenów</summary>',
      pad + '<ol>',
      sortedAllergens(data).map(function (a) {
        return pad + '  <li><strong>' + escapeHtml(a.name) + '</strong>. ' + text(a.full) + '</li>';
      }).join('\n'),
      pad + '</ol>'
    ].join('\n');
  }

  function renderStatus(visible, total) {
    return 'Widoczne pozycje: ' + visible + ' z' + NBSP + total + '.';
  }

  // Skrót danych pozwala wykryć, że menu-data.js zmieniono bez ponownego zbudowania HTML.
  function dataVersion(data) {
    const source = JSON.stringify(data);
    let hash = 0x811c9dc5;
    for (let i = 0; i < source.length; i += 1) {
      hash ^= source.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash.toString(16).padStart(8, '0');
  }

  function enhance(root, data) {
    const form = root.querySelector('[data-menu-filters]');
    const status = root.querySelector('[data-menu-status]');
    const empty = root.querySelector('[data-menu-empty]');
    const dishes = Array.prototype.slice.call(root.querySelectorAll('.dish'));
    const sections = Array.prototype.slice.call(root.querySelectorAll('[data-category-section]'));
    const allergenCount = form.querySelector('[data-allergen-count]');
    const categoryIds = data.categories.map(function (category) { return category.id; });
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function readState() {
      const values = new FormData(form);
      return {
        category: values.get('kategoria') || CATEGORY_ALL,
        diet: values.get('dieta') || DIET_ALL,
        excluded: values.getAll('alergen')
      };
    }

    function matches(dish, state) {
      if (state.category !== CATEGORY_ALL && dish.dataset.category !== state.category) {
        return false;
      }
      const diet = dish.dataset.diet;
      if (state.diet === 'vegan' && diet !== 'vegan') {
        return false;
      }
      if (state.diet === 'vegetarian' && diet !== 'vegan' && diet !== 'vegetarian') {
        return false;
      }
      if (state.excluded.length) {
        const contained = dish.dataset.allergens ? dish.dataset.allergens.split(' ') : [];
        if (contained.some(function (code) { return state.excluded.indexOf(code) !== -1; })) {
          return false;
        }
      }
      return true;
    }

    function syncHash(category) {
      const url = category === CATEGORY_ALL ? location.pathname + location.search : '#' + category;
      history.replaceState(null, '', url);
    }

    function apply(options) {
      const state = readState();
      let visible = 0;
      dishes.forEach(function (dish) {
        const show = matches(dish, state);
        if (show && dish.hidden && !reduceMotion.matches && dish.animate) {
          dish.hidden = false;
          dish.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 240, easing: 'ease-out' });
        }
        dish.hidden = !show;
        if (show) {
          visible += 1;
        }
      });
      sections.forEach(function (section) {
        section.hidden = !section.querySelector('.dish:not([hidden])');
      });
      empty.hidden = visible > 0;
      const message = renderStatus(visible, dishes.length);
      if (status.textContent !== message) {
        status.textContent = message;
      }
      allergenCount.textContent = state.excluded.length ? ' (' + state.excluded.length + ')' : '';
      if (options && options.updateHash) {
        syncHash(state.category);
      }
    }

    function applyHash() {
      const id = decodeURIComponent(location.hash.slice(1));
      if (categoryIds.indexOf(id) !== -1) {
        form.elements.kategoria.value = id;
        apply();
      }
    }

    form.addEventListener('change', function () {
      apply({ updateHash: true });
    });

    form.addEventListener('reset', function () {
      // Wartości pól wracają do domyślnych dopiero po obsłudze zdarzenia reset.
      setTimeout(function () { apply({ updateHash: true }); }, 0);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    root.querySelector('[data-menu-reset]').addEventListener('click', function () {
      form.reset();
      form.querySelector('input').focus();
    });

    window.addEventListener('hashchange', applyHash);
    applyHash();
  }

  function init() {
    const root = document.querySelector('[data-menu]');
    if (!root || typeof MENU_DATA === 'undefined') {
      return;
    }
    const version = dataVersion(MENU_DATA);
    if (root.getAttribute('data-menu-version') !== version) {
      root.querySelector('[data-menu-filters]').outerHTML = renderFilters(MENU_DATA);
      root.querySelector('[data-menu-list]').innerHTML = renderList(MENU_DATA);
      root.querySelector('[data-menu-legend]').innerHTML = renderLegend(MENU_DATA);
      root.querySelector('[data-menu-status]').textContent = renderStatus(MENU_DATA.items.length, MENU_DATA.items.length);
      root.setAttribute('data-menu-version', version);
    }
    enhance(root, MENU_DATA);
  }

  if (typeof module === 'object' && module.exports) {
    module.exports = {
      renderFilters: renderFilters,
      renderList: renderList,
      renderLegend: renderLegend,
      renderStatus: renderStatus,
      dataVersion: dataVersion
    };
  } else {
    init();
  }
})();
