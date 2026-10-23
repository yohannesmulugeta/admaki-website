/**
 * Guard against broken or oversized portfolio covers in GitHub Pages.
 * Every referenced screenshot must exist and the hero-cover set must remain
 * small enough for typical mobile connections.
 */
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const projectFile = await readFile('src/data/portfolio.ts', 'utf8');
const references = [...projectFile.matchAll(/screenshot:\s*['"]\/images\/covers\/([^'"]+)['"]/g)]
  .map((match) => match[1]);

let total = 0;
for (const relative of references) {
  const file = path.join('public/images/covers', relative);
  if (!relative.endsWith('.webp')) throw new Error('Not an optimized WebP: ' + file);
  const info = await stat(file);
  total += info.size;
  if (info.size > 145 * 1024) throw new Error('Oversized portfolio cover: ' + file);
  console.log(relative + ': ' + Math.round(info.size / 1024) + ' KiB');
}
if (references.length < 10) throw new Error('Missing portfolio cover references');
if (total > 850 * 1024) throw new Error('Portfolio covers exceed 850 KiB budget');
console.log('Verified', references.length, 'website covers, total', Math.round(total / 1024), 'KiB');
