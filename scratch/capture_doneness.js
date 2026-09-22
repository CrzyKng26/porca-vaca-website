import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000/');
  
  // Click Doneness & Texture tab
  await page.click('button:has-text("DONENESS & TEXTURE")');
  await page.waitForTimeout(1000);
  
  // Find Doneness Widget and take screenshot
  const doneness = page.locator('section:has-text("HOW DO YOU WANT IT?")').first();
  await doneness.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'scratch/doneness_mobile_render.png' });

  // Get Doneness layout info
  const info = await doneness.evaluate((el) => {
    return {
      height: el.getBoundingClientRect().height,
      paddingTop: window.getComputedStyle(el).paddingTop,
      paddingBottom: window.getComputedStyle(el).paddingBottom,
    };
  });
  console.log("DONENESS INFO:", info);

  await browser.close();
})();
