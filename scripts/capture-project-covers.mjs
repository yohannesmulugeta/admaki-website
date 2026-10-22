/**
 * Capture the visible homepage hero of real ADMAKI portfolio websites.
 * Run on GitHub's Ubuntu runner where Chromium/Chrome and internet are available.
 * Screenshots are local assets, not third-party hotlinked thumbnail services.
 *
 * Refresh with the "Capture website cover screenshots" workflow.
 */
import { chromium } from 'playwright';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const sites = [
  { id: 'kkgt-coffee', url: 'https://kkgtcoffee.com/' },
  { id: 'universal', url: 'https://universalelectronicet.com/' },
  { id: 'kkgt-trade', url: 'https://kkgtimportexport.com/' },
  { id: 'sibu', url: 'https://yohannesmulugeta.github.io/SIBU-TRADING-PLC/' },
  { id: 'gurshamenu', url: 'https://yohannesmulugeta.github.io/gurshamenu/' },
  { id: 'getfit', url: 'https://yohannesmulugeta.github.io/GET-FIT-WITH-JO/' },
  { id: 'orbit', url: 'https://yohannesmulugeta.github.io/orbiths/' },
  { id: 'lobelia', url: 'https://yohannesmulugeta.github.io/Hotel-Lobelia/' },
  { id: 'ephrem', url: 'https://yohannesmulugeta.github.io/ephremart/' },
  { id: 'bethager', url: 'https://yohannesmulugeta.github.io/bethager-furniture/' },
];

const output = path.resolve('public/images/covers');
await mkdir(output, { recursive: true });

const browserPath = process.env.CHROME_PATH || undefined;
const browser = await chromium.launch({
  headless: true,
  ...(browserPath ? { executablePath: browserPath } : {}),
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
let success = 0;
const failures = [];
try {
  for (const site of sites) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: 'light',
      reducedMotion: 'reduce',
      locale: 'en-US',
    });
    try {
      console.log('Capturing:', site.id, site.url);
      const response = await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      if (!response || response.status() >= 400) throw new Error('HTTP ' + (response?.status() ?? 'none'));
      await page.evaluate(() => document.fonts.ready).catch(() => {});
      await page.waitForTimeout(2600);
      await page.evaluate(() => window.scrollTo({ top: 0, left: 0 })).catch(() => {});
      const content = await page.locator('body').innerText({ timeout: 3500 }).catch(() => '');
      if (/Website error|This page could not load correctly|This site can.t be reached|Application error:/i.test(content.slice(0, 300))) {
        throw new Error('The website is displaying its error screen, not its hero');
      }
      if (content.trim().length < 40) throw new Error('Insufficient visible content');
      const file = path.join(output, site.id + '.jpg');
      await page.screenshot({ path: file, type: 'jpeg', quality: 82, fullPage: false, animations: 'disabled', timeout: 16000 });
      const size = (await stat(file)).size;
      if (size < 7500) throw new Error('Suspiciously small screenshot: ' + size);
      success++;
      console.log('Saved', file, Math.round(size / 1024) + ' KiB');
    } catch (error) {
      failures.push(site.id + ': ' + String(error));
      console.warn('Skipped', site.id, error);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
console.log('Captured', success, '/', sites.length, 'homepage covers');
if (failures.length) console.log('Failures:\n' + failures.join('\n'));
if (success < 4) process.exitCode = 1;
