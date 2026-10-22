/**
 * Capture each project's actual homepage at desktop hero viewport.
 * Public sites are visited first. KKGT's production firewall may block CI
 * browsers, so those two can be captured from a locally served checkout of
 * the very same public source repo as a fallback.
 */
import { chromium } from 'playwright';
import { mkdir, mkdtemp, stat } from 'node:fs/promises';
import { spawn, execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

const sites = [
  { id: 'kkgt-coffee', url: 'https://kkgtcoffee.com/', sourceRepo: 'KKGTCOFFEEwebsite' },
  { id: 'universal', url: 'https://universalelectronicet.com/' },
  { id: 'kkgt-trade', url: 'https://kkgtimportexport.com/', sourceRepo: 'KKGTIMPORTEXPORT' },
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
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

function run(command, args, cwd) {
  execFileSync(command, args, { cwd, stdio: 'inherit', timeout: 110000 });
}

async function openLocalSource(page, site, port) {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'admaki-cover-'));
  const destination = path.join(temp, 'site');
  const gitUrl = 'https://github.com/yohannesmulugeta/' + site.sourceRepo + '.git';
  console.log('Production capture blocked; generating hero from public source:', site.sourceRepo);
  run('git', ['clone', '--depth', '1', gitUrl, destination], temp);
  run('npm', ['ci', '--no-audit', '--no-fund'], destination);
  const child = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: destination, stdio: 'ignore', detached: true,
  });

  try {
    let ready = false;
    for (let attempt = 0; attempt < 25; attempt++) {
      try {
        const response = await page.goto('http://127.0.0.1:' + port, { waitUntil: 'domcontentloaded', timeout: 1900 });
        if (response && response.status() < 400) { ready = true; break; }
      } catch { /* dev server is still starting */ }
      await page.waitForTimeout(500);
    }
    if (!ready) throw new Error('Local preview failed to start');
    return child;
  } catch (error) {
    if (child.pid) process.kill(-child.pid, 'SIGTERM');
    throw error;
  }
}

let success = 0;
const failures = [];
try {
  for (let index = 0; index < sites.length; index++) {
    const site = sites[index];
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1, colorScheme: 'light', reducedMotion: 'reduce', locale: 'en-US',
    });
    let localServer;
    try {
      console.log('Capturing:', site.id, site.url);
      const response = await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      if (!response || response.status() >= 400) {
        if (!site.sourceRepo) throw new Error('HTTP ' + (response?.status() ?? 'none'));
        localServer = await openLocalSource(page, site, 4180 + index);
      }
      await page.evaluate(() => document.fonts.ready).catch(() => {});
      await page.waitForTimeout(2900);
      await page.evaluate(() => window.scrollTo({ top: 0, left: 0 })).catch(() => {});
      const bodyText = await page.locator('body').innerText({ timeout: 3500 }).catch(() => '');
      if (/Website error|This page could not load correctly|This site can.t be reached|Application error:/i.test(bodyText.slice(0, 350))) {
        throw new Error('Website is displaying an error screen');
      }
      if (bodyText.trim().length < 40) throw new Error('Insufficient rendered content');
      const file = path.join(output, site.id + '.jpg');
      await page.screenshot({ path: file, type: 'jpeg', quality: 82, fullPage: false, animations: 'disabled', timeout: 18000 });
      const size = (await stat(file)).size;
      if (size < 7500) throw new Error('Suspiciously small screenshot: ' + size);
      success++;
      console.log('Saved', file, Math.round(size / 1024) + ' KiB');
    } catch (error) {
      failures.push(site.id + ': ' + String(error));
      console.warn('Skipped', site.id, error);
    } finally {
      if (localServer?.pid) {
        try { process.kill(-localServer.pid, 'SIGTERM'); } catch { /* already exited */ }
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}
console.log('Captured', success, '/', sites.length, 'homepage covers');
if (failures.length) console.log('Failures:\n' + failures.join('\n'));
if (success < 7) process.exitCode = 1;
