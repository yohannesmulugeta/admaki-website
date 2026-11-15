/** Content, privacy and ordering regressions; no new test dependency. */
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import ts from 'typescript';

function loadData(path) {
  const source = readFileSync(path, 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  new Function('exports', compiled)(exports);
  return exports;
}
const { workProjects, orderedWorkProjects, socialBrands, orderPortfolioProjects } = loadData('src/data/portfolio.ts');
const { projectsData } = loadData('src/data/projects.ts');
const priority = ['sibu', 'maison-debrah', 'universal', 'kkgt-coffee', 'kkgt-trade', 'bethager'];
assert.deepEqual(orderedWorkProjects.slice(0, 6).map(p => p.id), priority);
assert.equal(new Set(orderedWorkProjects.map(p => p.id)).size, 16);
assert.equal(orderedWorkProjects.length, workProjects.length);
assert.deepEqual(orderedWorkProjects.slice(6), workProjects.filter(p => !priority.includes(p.id)));
const reversed = [...workProjects].reverse();
const snapshot = [...reversed];
const reordered = orderPortfolioProjects(reversed);
assert.deepEqual(reversed, snapshot, 'Ordering must not mutate input');
assert.deepEqual(reordered.slice(6), reversed.filter(p => !priority.includes(p.id)), 'Unranked entries must keep their relative order');
assert.deepEqual(socialBrands[0].videos.map(v => v.id), ['universal-03', 'universal-01', 'universal-02']);
assert.deepEqual(socialBrands[0].videos.map(v => v.url.split('/').at(-1)), ['7618627966997695751', '7697672470446345504', '7684533828672670994']);
assert.deepEqual(socialBrands.find(b => b.id === 'finder-social').videos.map(v => v.id), ['finder-01', 'finder-02', 'finder-03']);
assert.deepEqual(socialBrands.find(b => b.id === 'kkgt-social').videos.map(v => v.id), ['7687193464877960481', '7682077657965612320', '7677607760153922849']);
for (const brand of socialBrands) for (const video of brand.videos) {
  for (const asset of [video.poster, video.videoSrc].filter(Boolean)) assert(existsSync(`public${asset}`), `Missing media: ${asset}`);
}
const warehouse = projectsData.find(p => p.id === 'project-01');
assert.equal(warehouse.title, 'Coffee Processing & Warehouse Management System');
assert.equal(warehouse.category, 'Custom ERP / Business Software');
assert.equal(warehouse.liveUrl, undefined, 'Do not expose the private ERP');
assert(!/hayked/i.test(JSON.stringify(warehouse)));
const card = workProjects.find(p => p.id === 'coffee-warehouse-erp');
assert.equal(card.title, warehouse.title);
assert.equal(card.description, warehouse.description);
assert.equal(card.caseStudyUrl, warehouse.href);
assert.equal(card.screenshot, warehouse.image);
assert(existsSync(`public${warehouse.image}`));
assert(!existsSync('public/images/projects/hayked-coffee-warehouse-erp.webp'), 'Do not ship branded ERP artwork');
assert(!warehouse.solution.points.some(p => /quality verification|dispatch documentation/i.test(p)), 'Unverified features must not be promoted');
console.log('PASS: shared stable ordering, all 16 projects, nine video identities and assets, and anonymized ERP content.');
