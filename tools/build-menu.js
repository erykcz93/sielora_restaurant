#!/usr/bin/env node
/*
  Odświeża statyczny HTML karty w menu.html na podstawie assets/js/menu-data.js.
  Użycie (z katalogu głównego projektu): node tools/build-menu.js
  Skrypt nie ma zależności; wymaga Node.js 18 lub nowszego.
*/
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const data = require(path.join(root, 'assets', 'js', 'menu-data.js'));
const menu = require(path.join(root, 'assets', 'js', 'menu.js'));
const file = path.join(root, 'menu.html');

function replaceBlock(source, name, render) {
  const pattern = new RegExp('([ \\t]*)<!-- ' + name + ':START -->[\\s\\S]*?<!-- ' + name + ':END -->');
  const match = source.match(pattern);
  if (!match) {
    throw new Error('Nie znaleziono znaczników ' + name + ' w menu.html');
  }
  const pad = match[1];
  const block = pad + '<!-- ' + name + ':START -->\n' + render(pad) + '\n' + pad + '<!-- ' + name + ':END -->';
  return source.replace(pattern, function () { return block; });
}

let html = fs.readFileSync(file, 'utf8');
html = replaceBlock(html, 'MENU-FILTERS', function (pad) { return menu.renderFilters(data, pad); });
html = replaceBlock(html, 'MENU-LIST', function (pad) { return menu.renderList(data, pad); });
html = replaceBlock(html, 'MENU-LEGEND', function (pad) { return menu.renderLegend(data, pad); });
html = html.replace(/data-menu-version="[^"]*"/, 'data-menu-version="' + menu.dataVersion(data) + '"');
html = html.replace(/(<p class="menu-status"[^>]*>)[^<]*(<\/p>)/, function (match, open, close) {
  return open + menu.renderStatus(data.items.length, data.items.length).replace(/ /g, '&nbsp;') + close;
});

fs.writeFileSync(file, html);
console.log('Zaktualizowano menu.html (' + data.items.length + ' pozycji, wersja danych ' + menu.dataVersion(data) + ').');
