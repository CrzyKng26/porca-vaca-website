import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000/');
  
  // Wait for images to load, animations to settle
  await page.waitForTimeout(2000);
  
  // Take a full page screenshot
  await page.screenshot({ path: 'scratch/fullpage_mobile.png', fullPage: true });

  await browser.close();
  console.log('Done fullpage screenshot');
})();
