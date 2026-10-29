/*
  Demonstracyjny formularz rezerwacji. Walidacja i komunikaty działają wyłącznie w przeglądarce:
  dane nie są nigdzie wysyłane ani zapisywane (brak żądań sieciowych, cookies i Web Storage).
*/
(function () {
  'use strict';

  const form = document.querySelector('[data-reservation-form]');
  if (!form || !window.Sielora) {
    return;
  }

  const { OPENING_HOURS, restaurantNow, toMinutes } = window.Sielora;
  const BOOKING_WINDOW_DAYS = 60;
  const LAST_BOOKING_BEFORE_CLOSE = 90;
  const SLOT_STEP = 30;
  const MIN_LEAD_TIME = 60;
  const DAY_MS = 24 * 60 * 60 * 1000;

  const fields = {
    name: form.elements.imie,
    email: form.elements.email,
    date: form.elements.data,
    time: form.elements.godzina,
    guests: form.elements['liczba-osob'],
    notes: form.elements.uwagi
  };
  const summary = form.querySelector('[data-error-summary]');
  const summaryList = form.querySelector('[data-error-list]');
  const timeHint = form.querySelector('[data-time-hint]');
  const counter = form.querySelector('[data-counter]');
  const submit = form.querySelector('[data-submit]');
  const result = document.querySelector('[data-result]');
  const resultTitle = result.querySelector('[data-result-title]');
  const resultDetails = result.querySelector('[data-result-details]');
  const resultReset = result.querySelector('[data-result-reset]');

  const dateLabel = new Intl.DateTimeFormat('pl-PL', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  });
  const shortDateLabel = new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric', month: 'long', timeZone: 'UTC'
  });

  let submitted = false;

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function isoDate(time) {
    const date = new Date(time);
    return date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate());
  }

  function parseIsoDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) {
      return null;
    }
    const time = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return isoDate(time) === value ? time : null;
  }

  function formatTime(minutes) {
    return pad(Math.floor(minutes / 60)) + ':' + pad(minutes % 60);
  }

  function guestsLabel(count) {
    if (count === 1) {
      return '1 osoba';
    }
    const lastDigit = count % 10;
    const lastTwo = count % 100;
    const few = lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14);
    return count + (few ? ' osoby' : ' osób');
  }

  const now = restaurantNow();
  const today = Date.UTC(now.year, now.month - 1, now.day);
  const lastDay = today + BOOKING_WINDOW_DAYS * DAY_MS;
  fields.date.min = isoDate(today);
  fields.date.max = isoDate(lastDay);

  // Godziny rezerwacji dla wybranego dnia: co 30 minut, ostatnia 90 minut przed zamknięciem.
  function slotsFor(time) {
    const hours = OPENING_HOURS[new Date(time).getUTCDay()];
    if (!hours) {
      return [];
    }
    const earliest = time === today ? restaurantNow().minutes + MIN_LEAD_TIME : 0;
    const slots = [];
    for (let minutes = toMinutes(hours.open); minutes <= toMinutes(hours.close) - LAST_BOOKING_BEFORE_CLOSE; minutes += SLOT_STEP) {
      if (minutes >= earliest) {
        slots.push(formatTime(minutes));
      }
    }
    return slots;
  }

  function checkDate() {
    const value = fields.date.value.trim();
    if (!value) {
      return 'Wybierz datę wizyty.';
    }
    const time = parseIsoDate(value);
    if (time === null) {
      return 'Wpisz datę w formacie RRRR-MM-DD, na przykład ' + isoDate(today + 7 * DAY_MS) + '.';
    }
    if (time < today) {
      return 'Ta data już minęła. Wybierz dzisiejszą lub późniejszą datę.';
    }
    if (time > lastDay) {
      return 'Rezerwacje przyjmujemy najwyżej ' + BOOKING_WINDOW_DAYS + ' dni naprzód, czyli do ' + shortDateLabel.format(lastDay) + '.';
    }
    if (!OPENING_HOURS[new Date(time).getUTCDay()]) {
      return 'W poniedziałki restauracja jest nieczynna. Wybierz inny dzień.';
    }
    if (!slotsFor(time).length) {
      return 'Na dziś nie przyjmujemy już rezerwacji. Wybierz inny dzień.';
    }
    return '';
  }

  const checks = {
    name: function () {
      const value = fields.name.value.trim();
      if (!value) {
        return 'Wpisz swoje imię.';
      }
      if (value.length < 2) {
        return 'Imię powinno mieć co najmniej 2 znaki.';
      }
      return '';
    },
    email: function () {
      const value = fields.email.value.trim();
      if (!value) {
        return 'Wpisz adres e-mail.';
      }
      if (fields.email.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        return 'Wpisz adres e-mail w formacie nazwa@domena.pl.';
      }
      return '';
    },
    date: checkDate,
    time: function () {
      if (checkDate()) {
        return 'Godzinę wybierzesz po podaniu prawidłowej daty.';
      }
      return fields.time.value ? '' : 'Wybierz godzinę.';
    },
    guests: function () {
      return fields.guests.value ? '' : 'Wybierz liczbę osób.';
    }
  };

  function errorElement(field) {
    return document.getElementById(field.id + '-blad');
  }

  function showError(key, message) {
    const field = fields[key];
    const error = errorElement(field);
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      error.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.2h.01"/></svg>';
      error.appendChild(document.createTextNode(message));
      error.hidden = false;
    } else {
      field.removeAttribute('aria-invalid');
      error.textContent = '';
      error.hidden = true;
    }
  }

  function validate(keys) {
    const errors = [];
    keys.forEach(function (key) {
      const message = checks[key]();
      showError(key, message);
      if (message) {
        errors.push({ key: key, message: message });
      }
    });
    return errors;
  }

  function renderSummary(errors) {
    summaryList.textContent = '';
    errors.forEach(function (error) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#' + fields[error.key].id;
      link.textContent = error.message;
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const field = fields[error.key];
        const label = form.querySelector('label[for="' + field.id + '"]');
        (label || field).scrollIntoView({ block: 'center' });
        field.focus({ preventScroll: true });
      });
      item.appendChild(link);
      summaryList.appendChild(item);
    });
    summary.hidden = errors.length === 0;
  }

  function updateTimeOptions() {
    const previous = fields.time.value;
    const time = parseIsoDate(fields.date.value.trim());
    const dateError = checkDate();
    const slots = dateError ? [] : slotsFor(time);

    fields.time.textContent = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = slots.length ? 'Wybierz godzinę' : 'Najpierw wybierz datę';
    fields.time.appendChild(placeholder);
    slots.forEach(function (slot) {
      const option = document.createElement('option');
      option.value = slot;
      option.textContent = slot;
      fields.time.appendChild(option);
    });
    if (slots.indexOf(previous) !== -1) {
      fields.time.value = previous;
    }

    timeHint.textContent = slots.length
      ? 'Dostępne godziny: ' + slots[0] + '–' + slots[slots.length - 1] + ', co pół godziny.'
      : 'Godziny pojawią się po wybraniu prawidłowej daty.';
  }

  function updateCounter() {
    const max = Number(fields.notes.getAttribute('maxlength'));
    counter.textContent = fields.notes.value.length + ' / ' + max + ' znaków';
  }

  function addDetail(label, value) {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value;
    row.appendChild(term);
    row.appendChild(description);
    resultDetails.appendChild(row);
  }

  function showResult() {
    const time = parseIsoDate(fields.date.value.trim());
    resultDetails.textContent = '';
    addDetail('Imię', fields.name.value.trim());
    addDetail('E-mail', fields.email.value.trim());
    addDetail('Termin', dateLabel.format(time) + ', godz. ' + fields.time.value);
    addDetail('Liczba osób', guestsLabel(Number(fields.guests.value)));
    if (fields.notes.value.trim()) {
      addDetail('Uwagi', fields.notes.value.trim());
    }
    form.hidden = true;
    result.hidden = false;
    resultTitle.focus();
  }

  function resetForm() {
    form.reset();
    submitted = false;
    Object.keys(checks).forEach(function (key) { showError(key, ''); });
    renderSummary([]);
    updateTimeOptions();
    updateCounter();
    resultDetails.textContent = '';
    result.hidden = true;
    form.hidden = false;
    fields.name.focus();
  }

  fields.date.addEventListener('change', function () {
    updateTimeOptions();
    const message = checkDate();
    if (submitted || message) {
      showError('date', message);
    }
    if (submitted) {
      renderSummary(validate(Object.keys(checks)));
    }
  });

  form.addEventListener('input', function (event) {
    if (event.target === fields.notes) {
      updateCounter();
    }
  });

  form.addEventListener('change', function (event) {
    if (!submitted || event.target === fields.date) {
      return;
    }
    renderSummary(validate(Object.keys(checks)));
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    submitted = true;
    const errors = validate(Object.keys(checks));
    renderSummary(errors);
    if (errors.length) {
      summary.focus();
      return;
    }
    showResult();
  });

  resultReset.addEventListener('click', resetForm);

  updateTimeOptions();
  updateCounter();
  submit.disabled = false;
})();
