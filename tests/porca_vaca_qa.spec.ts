import { test, expect } from '@playwright/test';

const BASE_URL = 'https://pnv-kappa.vercel.app';

// ─── DESKTOP TESTS ───────────────────────────────────────────────────────────
test.describe('Desktop – Page Loads & Sections', () => {
  test('homepage loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    const criticalErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') &&
      !e.includes('supabase') &&
      !e.includes('ERR_BLOCKED_BY_CLIENT') &&
      !e.includes('net::ERR') &&
      !e.includes('Failed to load resource') &&
      !e.includes('favicon')
    );

    if (criticalErrors.length > 0) console.log('Critical errors:', criticalErrors);
    expect(criticalErrors, `Critical JS errors: ${criticalErrors.join('\n')}`).toHaveLength(0);
  });

  test('hero section renders', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    const hero = page.locator('#opening');
    await expect(hero).toBeVisible({ timeout: 10000 });
  });

  test('all major sections are present in DOM', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    for (const sel of ['#menu', '#reservation', '#meat-science']) {
      await expect(page.locator(sel)).toBeAttached({ timeout: 10000 });
    }
  });

  test('navigation header is visible', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const nav = page.locator('header, nav').first();
    await expect(nav).toBeVisible({ timeout: 10000 });
  });

  test('no broken images on homepage', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => img.complete && img.naturalWidth === 0 && img.src && !img.src.startsWith('data:'))
        .map(img => img.src);
    });

    if (brokenImages.length > 0) console.log('Broken images:', brokenImages);
    expect(brokenImages.length, `Broken images found: ${brokenImages.join(', ')}`).toBe(0);
  });

  test('hero entrance skip button works', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1000);
    const skipBtn = page.locator('button', { hasText: 'SKIP ENTRANCE' });
    if (await skipBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await skipBtn.click();
      await page.waitForTimeout(500);
    }
    await expect(page.locator('#opening')).toBeVisible({ timeout: 10000 });
  });

  test('no horizontal overflow (no X scroll)', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);
    const hasHorizontalScroll = await page.evaluate(() =>
      document.documentElement.scrollWidth > window.innerWidth + 5
    );
    expect(hasHorizontalScroll, 'Page has unexpected horizontal scroll').toBe(false);
  });

  test('menu section renders and has height', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.locator('#menu').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const height = await page.locator('#menu').evaluate(el => el.getBoundingClientRect().height);
    console.log(`Menu height: ${height}px`);
    expect(height).toBeGreaterThan(200);
  });

  test('reservation section renders and has height', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.locator('#reservation').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const height = await page.locator('#reservation').evaluate(el => el.getBoundingClientRect().height);
    console.log(`Reservation height: ${height}px`);
    expect(height).toBeGreaterThan(200);
  });
});

// ─── MOBILE (iPhone 12) ──────────────────────────────────────────────────────
test.describe('Mobile iPhone 12', () => {
  test('mobile homepage loads without JS errors', async ({ browser }) => {
    const ctx = await browser.newContext({ ...require('@playwright/test').devices['iPhone 12'] });
    const page = await ctx.newPage();
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(4000);

    const criticalErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('supabase') &&
      !e.includes('net::ERR') && !e.includes('Failed to load resource') && !e.includes('favicon')
    );
    if (criticalErrors.length > 0) console.log('Mobile critical errors:', criticalErrors);
    expect(criticalErrors).toHaveLength(0);
    await ctx.close();
  });

  test('mobile no horizontal overflow', async ({ browser }) => {
    const ctx = await browser.newContext({ ...require('@playwright/test').devices['iPhone 12'] });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);
    const hasHScroll = await page.evaluate(() =>
      document.documentElement.scrollWidth > window.innerWidth + 5
    );
    expect(hasHScroll, 'Mobile page has horizontal scroll').toBe(false);
    await ctx.close();
  });

  test('mobile major sections exist in DOM', async ({ browser }) => {
    const ctx = await browser.newContext({ ...require('@playwright/test').devices['iPhone 12'] });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    for (const sel of ['#menu', '#reservation']) {
      await expect(page.locator(sel)).toBeAttached({ timeout: 10000 });
    }
    await ctx.close();
  });

  test('mobile no broken images', async ({ browser }) => {
    const ctx = await browser.newContext({ ...require('@playwright/test').devices['iPhone 12'] });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);
    const broken = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .filter(img => img.complete && img.naturalWidth === 0 && img.src && !img.src.startsWith('data:'))
        .map(img => img.src);
    });
    if (broken.length > 0) console.log('Mobile broken images:', broken);
    expect(broken.length).toBe(0);
    await ctx.close();
  });

  test('mobile menu section has positive height (not overlapping)', async ({ browser }) => {
    const ctx = await browser.newContext({ ...require('@playwright/test').devices['iPhone 12'] });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1000);
    const skipBtn = page.locator('button', { hasText: 'SKIP ENTRANCE' });
    if (await skipBtn.isVisible({ timeout: 3000 }).catch(() => false)) await skipBtn.click();
    await page.locator('#menu').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    const height = await page.locator('#menu').evaluate(el => el.getBoundingClientRect().height);
    console.log(`Mobile menu height: ${height}px`);
    expect(height).toBeGreaterThan(200);
    await ctx.close();
  });
});

// ─── ROUTING TESTS ────────────────────────────────────────────────────────────
test.describe('Page Routing', () => {
  test('mafia page loads (HTTP 200, not 404)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/mafia`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    expect(response?.status()).toBe(200);
  });

  test('login page renders admin portal form', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    expect(response?.status()).toBe(200);
    // Check visible rendered content — not raw HTML body
    await expect(page.locator('h1', { hasText: 'Porca' })).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button', { hasText: 'Authenticate' })).toBeVisible({ timeout: 10000 });
  });

  test('nonexistent route shows 404', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/this-page-does-not-exist`, { timeout: 30000 });
    expect(response?.status()).toBe(404);
  });
});
