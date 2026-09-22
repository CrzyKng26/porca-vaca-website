// Comprehensive website analysis script for https://demopiecee.netlify.app/
// Uses the already-installed @playwright/test package via Node.js

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const SITE_URL = "https://demopiecee.netlify.app/";
const SCREENSHOT_DIR = "C:\\Users\\kanna\\.gemini\\antigravity\\brain\\fa3e1930-3b74-4e62-87aa-c51c1b742656\\scratch";

async function run() {
  const results = {
    url: SITE_URL,
    page_title: "",
    meta_description: "",
    has_favicon: false,
    security: {},
    console_errors: [],
    console_warnings: [],
    network_failures: [],
    headings: [],
    links: [],
    buttons: [],
    images: [],
    images_missing_alt: [],
    forms: [],
    external_scripts: [],
    performance: {},
    responsiveness: {},
    pages_visited: [],
  };

  const browser = await chromium.launch({ headless: true });
  
  // ── DESKTOP ──────────────────────────────────────────────────────────────────
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') results.console_errors.push(msg.text());
    if (msg.type() === 'warning') results.console_warnings.push(msg.text());
  });
  page.on('pageerror', err => results.console_errors.push(String(err)));
  page.on('requestfailed', req => results.network_failures.push({ url: req.url(), failure: req.failure() }));

  console.log("Loading home page (desktop)...");
  const t0 = Date.now();
  await page.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  results.performance.home_load_time_sec = ((Date.now() - t0) / 1000).toFixed(2);
  results.pages_visited.push(SITE_URL);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'homepage_desktop.png'), fullPage: true });
  console.log("  Screenshot: homepage_desktop.png");

  // Metadata
  results.page_title = await page.title();
  const metaEl = await page.$('meta[name="description"]');
  results.meta_description = metaEl ? await metaEl.getAttribute('content') : 'MISSING';

  // Favicon
  const favicon = await page.$('link[rel*="icon"]');
  results.has_favicon = favicon !== null;

  // Security
  results.security = { https: SITE_URL.startsWith('https://'), final_url: page.url() };

  // Headings
  for (const tag of ['h1','h2','h3','h4']) {
    const els = await page.$$(`${tag}`);
    for (const el of els) {
      const txt = (await el.innerText()).trim().substring(0, 100);
      if (txt) results.headings.push({ tag, text: txt });
    }
  }

  // Links
  const links = await page.$$('a[href]');
  for (const l of links) {
    const href = await l.getAttribute('href') || '';
    const text = ((await l.innerText()) || '').trim().substring(0, 60);
    results.links.push({ text, href });
  }

  // Buttons
  const buttons = await page.$$('button, input[type="submit"], input[type="button"], [role="button"]');
  for (const b of buttons) {
    const txt = ((await b.innerText().catch(() => '')) || await b.getAttribute('value') || '').trim().substring(0, 60);
    const ariaLabel = await b.getAttribute('aria-label') || '';
    results.buttons.push({ text: txt, ariaLabel });
  }

  // Images
  const images = await page.$$('img');
  for (const img of images) {
    const src = (await img.getAttribute('src') || '').substring(0, 100);
    const alt = await img.getAttribute('alt');
    results.images.push({ src, alt });
    if (alt === null || alt.trim() === '') results.images_missing_alt.push(src);
  }

  // Forms
  const forms = await page.$$('form');
  for (let i = 0; i < forms.length; i++) {
    const inputs = await forms[i].$$('input, textarea, select');
    const fields = [];
    for (const inp of inputs) {
      fields.push({
        type: await inp.getAttribute('type') || (await inp.evaluate(el => el.tagName.toLowerCase())),
        name: await inp.getAttribute('name') || await inp.getAttribute('placeholder') || '',
      });
    }
    results.forms.push({ form_index: i, fields });
  }

  // External scripts
  const scripts = await page.$$('script[src]');
  for (const s of scripts) {
    const src = await s.getAttribute('src') || '';
    if (src.startsWith('http')) results.external_scripts.push(src.substring(0, 100));
  }

  // ── Navigate nav links ──────────────────────────────────────────────────────
  const navLinks = await page.$$('nav a, header a');
  const visited = new Set([SITE_URL]);
  console.log(`  Found ${navLinks.length} nav/header links`);
  
  for (const linkEl of navLinks.slice(0, 10)) {
    try {
      const href = await linkEl.getAttribute('href') || '';
      const linkText = ((await linkEl.innerText()) || '').trim();
      if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel')) continue;
      const fullUrl = href.startsWith('http') ? href : (SITE_URL.replace(/\/$/, '') + (href.startsWith('/') ? '' : '/') + href.replace(/^\//, ''));
      if (visited.has(fullUrl)) continue;
      visited.add(fullUrl);
      console.log(`  Checking nav page: "${linkText}" -> ${fullUrl}`);
      const t1 = Date.now();
      await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 15000 });
      const loadT = ((Date.now() - t1) / 1000).toFixed(2);
      results.pages_visited.push({ url: fullUrl, load_time_sec: loadT });
      const slug = linkText.replace(/\s+/g, '_').toLowerCase().replace(/[^a-z0-9_]/g,'').substring(0,20) || 'page';
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `page_${slug}.png`), fullPage: true });
      console.log(`    Screenshot: page_${slug}.png`);
      await page.goBack({ waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(500);
    } catch(e) {
      console.log(`    Error: ${e.message}`);
    }
  }

  await context.close();

  // ── MOBILE ───────────────────────────────────────────────────────────────────
  console.log("Testing mobile viewport (390x844)...");
  const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await mCtx.newPage();
  await mPage.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 20000 });
  await mPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'homepage_mobile.png'), fullPage: true });
  console.log("  Screenshot: homepage_mobile.png");
  results.responsiveness.mobile_horizontal_overflow = await mPage.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  const vmeta = await mPage.$('meta[name="viewport"]');
  results.responsiveness.has_viewport_meta = vmeta !== null;
  if (vmeta) results.responsiveness.viewport_content = await vmeta.getAttribute('content');
  await mCtx.close();

  // ── TABLET ───────────────────────────────────────────────────────────────────
  console.log("Testing tablet viewport (768x1024)...");
  const tCtx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tPage = await tCtx.newPage();
  await tPage.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 20000 });
  await tPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'homepage_tablet.png'), fullPage: true });
  console.log("  Screenshot: homepage_tablet.png");
  results.responsiveness.tablet_horizontal_overflow = await tPage.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  await tCtx.close();

  await browser.close();

  // Write JSON results
  const outPath = path.join(SCREENSHOT_DIR, 'analysis_results.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nResults written to ${outPath}`);
  console.log(JSON.stringify(results, null, 2));
}

run().catch(e => { console.error(e); process.exit(1); });
