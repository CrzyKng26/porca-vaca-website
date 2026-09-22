import { test, expect } from '@playwright/test';

const urls = ['http://localhost:3000/', 'http://localhost:3000/mafia'];

for (const url of urls) {
  test(`Comprehensive Analysis for ${url}`, async ({ page }) => {
    const errors: string[] = [];
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('pageerror', (exception) => {
      errors.push(`Uncaught exception: "${exception}"`);
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        // Filter out expected warnings/errors if any, but log all for now
        consoleErrors.push(`Console Error: "${msg.text()}"`);
      }
    });

    page.on('response', (response) => {
      if (response.status() >= 400 && response.status() !== 999) { // 999 is sometimes used by linkedin/etc
        failedRequests.push(`Failed Request: ${response.status()} ${response.url()}`);
      }
    });

    console.log(`Analyzing ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // 1. Check for layout overflow
    const overflowInfo = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    });

    if (overflowInfo.hasOverflow) {
      errors.push(`Layout Error: Page has horizontal overflow. ScrollWidth: ${overflowInfo.scrollWidth}, InnerWidth: ${overflowInfo.innerWidth}`);
    }

    // 2. Check for missing images (broken src)
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
    });
    
    if (brokenImages.length > 0) {
      errors.push(`Broken Images found: ${brokenImages.join(', ')}`);
    }

    // 3. Interact with all buttons
    const buttons = page.locator('button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      if (await btn.isVisible()) {
        try {
          await btn.click({ timeout: 1000 });
          await page.waitForTimeout(100); // give time for state updates / errors to throw
        } catch (e) {
          // Might be covered or unclickable
        }
      }
    }

    // Wait to capture any delayed errors
    await page.waitForTimeout(2000);

    console.log(`\n--- RESULTS FOR ${url} ---`);
    if (errors.length > 0) console.log('PAGE ERRORS & LAYOUT ISSUES:', errors);
    if (consoleErrors.length > 0) console.log('CONSOLE ERRORS:', consoleErrors);
    if (failedRequests.length > 0) console.log('FAILED REQUESTS:', failedRequests);
    
    // We don't fail the test runner explicitly so we can see all output,
    // we just want the console logs to report everything.
  });
}
