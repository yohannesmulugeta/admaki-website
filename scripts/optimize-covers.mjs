/**
 * Re-encode captured homepage screenshots to responsive, progressive WebP.
 * No runtime conversion or paid image service. The result ships with the site.
 * Generated files replace the original full-resolution JPEG captures.
 */
import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

const directory = path.resolve('public/images/covers');
const sources = (await readdir(directory)).filter((name) => name.endsWith('.jpg'));
let before = 0, after = 0;
for (const source of sources) {
  const original = path.join(directory, source);
  const target = path.join(directory, source.replace(/\.jpg$/, '.webp'));
  const input = (await stat(original)).size;
  await sharp(original, { failOn: 'error' })
    .resize({ width: 1040, withoutEnlargement: true })
    .webp({ quality: 67, effort: 5 })
    .toFile(target);
  const output = (await stat(target)).size;
  console.log(source + ' ' + Math.round(input / 1024) + ' KiB → ' +
    Math.round(output / 1024) + ' KiB');
  if (output < 1000) throw new Error('Unexpectedly small cover: ' + source);
  await unlink(original);
  before += input;
  after += output;
}
console.log('Optimized', sources.length, 'covers:',
  Math.round(before / 1024) + ' KiB → ' + Math.round(after / 1024) + ' KiB (' +
  Math.round((1 - after / before) * 100) + '% smaller)');
