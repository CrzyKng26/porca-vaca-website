import { test, expect, devices } from '@playwright/test';

const urls = ['http://localhost:3000/', 'http://localhost:3000/mafia'];
const viewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1440, height: 900 }
];

for (const viewport of viewports) {
  for (const url of urls) {
    test(`Responsive Analysis for ${url} on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(url, { waitUntil: 'networkidle' });

      // Check for layout overflow
      const overflowInfo = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth
        };
      });

      if (overflowInfo.hasOverflow) {
        console.log(`[!] OVERFLOW DETECTED on ${viewport.name} at ${url}: scrollWidth ${overflowInfo.scrollWidth} > innerWidth ${overflowInfo.innerWidth}`);
      } else {
        console.log(`[OK] No overflow on ${viewport.name} at ${url}`);
      }

      expect(overflowInfo.hasOverflow).toBe(false);
    });
  }
}
