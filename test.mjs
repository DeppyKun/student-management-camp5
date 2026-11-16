import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  const html = renderToStaticMarkup(createElement(App));

  assert.match(html, /<h1>Student Management<\/h1>/);
  assert.match(html, /<h2>Daftar Data Mahasiswa<\/h2>/);
  assert.match(html, /5 Mahasiswa/);
  assert.match(html, /\b\d{2}:\d{2}:\d{2}\b/);

  for (const col of [
    'NIM',
    'Nama Mahasiswa',
    'No. Hp',
    'Email',
    'Alamat',
    'Program Studi',
    'Tahun Masuk',
  ]) {
    assert.ok(html.includes(`<th>${col}</th>`), `Missing column: ${col}`);
  }

  const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/);
  assert.ok(tbodyMatch, 'Missing tbody');
  const rowCount = (tbodyMatch[1].match(/<tr>/g) || []).length;
  assert.ok(rowCount >= 5, `Expected at least 5 student rows, got ${rowCount}`);

  console.log(`PASS: rendered Student Management with ${rowCount} rows`);
} finally {
  await vite.close();
}
