/* Wspólne skrypty witryny: nawigacja mobilna i informacje o godzinach otwarcia. */
(function () {
  'use strict';

  const TIME_ZONE = 'Europe/Warsaw';

  // Klucz to numer dnia tygodnia jak w Date#getDay (0 = niedziela). null oznacza dzień zamknięty.
  const OPENING_HOURS = Object.freeze({
    0: { open: '12:00', close: '20:00' },
    1: null,
    2: { open: '12:00', close: '21:00' },
    3: { open: '12:00', close: '21:00' },
    4: { open: '12:00', close: '21:00' },
    5: { open: '12:00', close: '23:00' },
    6: { open: '12:00', close: '23:00' }
  });

  const WHEN_PHRASES = ['w niedzielę', 'w poniedziałek', 'we wtorek', 'w środę', 'w czwartek', 'w piątek', 'w sobotę'];

  function toMinutes(time) {
    const parts = time.split(':');
    return Number(parts[0]) * 60 + Number(parts[1]);
  }

  // Data i godzina w strefie czasowej restauracji, niezależnie od strefy odwiedzającego.
  function restaurantNow() {
    const parts = {};
    new Intl.DateTimeFormat('en-GB', {
      timeZone: TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date()).forEach(function (part) {
      parts[part.type] = part.value;
    });
    const year = Number(parts.year);
    const month = Number(parts.month);
    const day = Number(parts.day);
    return {
      year: year,
      month: month,
      day: day,
      weekday: new Date(Date.UTC(year, month - 1, day)).getUTCDay(),
      minutes: Number(parts.hour) * 60 + Number(parts.minute)
    };
  }

  function describeToday(now) {
    const today = OPENING_HOURS[now.weekday];
    if (today) {
      if (now.minutes < toMinutes(today.open)) {
        return 'Dziś otwieramy o ' + today.open + ' i zapraszamy do ' + today.close + '.';
      }
      if (now.minutes < toMinutes(today.close)) {
        return 'Teraz otwarte. Dziś zapraszamy do ' + today.close + '.';
      }
    }
    for (let offset = 1; offset <= 7; offset += 1) {
      const weekday = (now.weekday + offset) % 7;
      const hours = OPENING_HOURS[weekday];
      if (hours) {
        const when = offset === 1 ? 'jutro' : WHEN_PHRASES[weekday];
        const intro = today ? 'Na dziś już zamknęliśmy.' : 'W poniedziałki restauracja jest nieczynna.';
        return intro + ' Zapraszamy ' + when + ' od ' + hours.open + '.';
      }
    }
    return '';
  }

  function initOpeningInfo() {
    const status = document.querySelector('[data-today-status]');
    const rows = document.querySelectorAll('[data-day]');
    if (!status && !rows.length) {
      return;
    }
    const now = restaurantNow();
    if (status) {
      status.textContent = describeToday(now);
    }
    Array.prototype.forEach.call(rows, function (row) {
      if (Number(row.getAttribute('data-day')) === now.weekday) {
        row.classList.add('is-today');
        const label = document.createElement('span');
        label.className = 'visually-hidden';
        label.textContent = ' (dziś)';
        row.querySelector('th').appendChild(label);
      }
    });
  }

  function initNavigation() {
    const header = document.querySelector('[data-header]');
    const toggle = document.querySelector('[data-nav-toggle]');
    if (!header || !toggle) {
      return;
    }
    const nav = document.getElementById(toggle.getAttribute('aria-controls'));

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    function setOpen(open, returnFocus) {
      header.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (!open && returnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false, true);
      }
    });

    document.addEventListener('click', function (event) {
      if (isOpen() && !header.contains(event.target)) {
        setOpen(false);
      }
    });

    nav.addEventListener('focusout', function (event) {
      if (isOpen() && event.relatedTarget && !header.contains(event.relatedTarget)) {
        setOpen(false);
      }
    });

    const desktop = window.matchMedia('(min-width: 62em)');
    desktop.addEventListener('change', function (event) {
      if (event.matches) {
        setOpen(false);
      }
    });
  }

  window.Sielora = Object.freeze({
    TIME_ZONE: TIME_ZONE,
    OPENING_HOURS: OPENING_HOURS,
    restaurantNow: restaurantNow,
    toMinutes: toMinutes
  });

  initNavigation();
  initOpeningInfo();
})();
