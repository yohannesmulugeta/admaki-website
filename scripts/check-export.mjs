/** Production regression checks for directory routes and on-demand campaign assets. */
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

for (const route of ['social', 'websites', 'erp', 'work', 'work/coffee-processing-warehouse-management-system', 'work/beanledger']) {
  const html = await readFile(`out/${route}.html`, 'utf8');
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  assert.equal(canonical, `https://admakidigital.com/${route}`, `${route} must not canonicalize to the homepage`);
  assert(html.includes('<h1'), `${route} is missing its main heading`);
  for (const asset of [...html.matchAll(/(?:src|href)="(\/_next\/[^"?]+)"/g)].map(match => match[1])) {
    assert((await stat(`out${asset}`)).isFile(), `${route} references a missing bundle: ${asset}`);
  }
}
const gallery = await readFile('out/social.html', 'utf8');
assert(!/<video\b/i.test(gallery), 'Gallery must not attach videos before a visitor chooses a preview');
const source = await readFile('src/data/portfolio.ts', 'utf8');
const videos = [...source.matchAll(/videoSrc:\s*['"]([^'"]+)['"]/g)].map(match => match[1]);
for (const video of videos) {
  const info = await stat(`out${video}`);
  assert(info.size > 0 && info.size < 25 * 1024 * 1024, `Video missing or exceeds Cloudflare static asset limit: ${video}`);
}
const home = await readFile('out/index.html', 'utf8');
const priority = ['sibu', 'maison-debrah', 'universal', 'kkgt-coffee', 'kkgt-trade', 'bethager'];
assert.deepEqual([...home.matchAll(/data-project="([^"]+)"/g)].map(match => match[1]), priority,
  'Homepage must feature the six requested projects in order');
for (const route of ['websites', 'work']) {
  const html = await readFile(`out/${route}.html`, 'utf8');
  const titles = [...html.matchAll(/<h2 class="website-title">(.*?)<\/h2>/g)].map(match => match[1]);
  assert.deepEqual(titles.slice(0, 6), ['Sibu Trading PLC', 'Maison Debrah Ethiopia', 'Universal Electronics', 'KKGT Coffee', 'KKGT Import &amp; Export', 'Bethager Furniture']);
}
for (const route of ['erp', 'work/coffee-processing-warehouse-management-system', 'services/custom-software-ethiopia']) {
  const html = await readFile(`out/${route}.html`, 'utf8');
  assert(!/hayked/i.test(html), `${route} still exposes the warehouse client`);
  assert(html.includes('Coffee Processing &amp; Warehouse Management System'), `${route} is missing the generic project title`);
}
for (const url of ['https://nfc.admakidigital.com/', 'https://menu.admakidigital.com/', 'https://app.admakidigital.com/#/r/abol-coffee']) {
  assert(home.includes(url), `Homepage product link is missing: ${url}`);
}
console.log(`Verified 6 portfolio routes, unique canonicals, local bundles, ${videos.length} campaign assets, on-demand gallery, and product links.`);
