import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const viewports = [
    { width: 390, height: 844, name: 'iPhone-12-390x844' },
    { width: 412, height: 915, name: 'Pixel-7-412x915' }
  ];

  const report = {};

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

    console.log(`\n--- Auditing ${vp.name} ---`);
    report[vp.name] = { doneness: {}, timecraft: {} };

    // 1. Audit Doneness Widget
    // Find section containing "HOW DO YOU WANT IT?"
    const donenessSection = page.locator('section:has-text("HOW DO YOU WANT IT?")').first();
    await donenessSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `.playwright-mcp/${vp.name}-doneness-initial.png` });

    const donenessStats = await donenessSection.evaluate((section) => {
      const rect = section.getBoundingClientRect();
      const style = window.getComputedStyle(section);
      
      const card = section.querySelector('.bg-obsidian.border-obsidian\\/20');
      let cardStats = null;
      if (card) {
        const cardRect = card.getBoundingClientRect();
        const cardStyle = window.getComputedStyle(card);
        cardStats = {
          height: cardRect.height,
          paddingTop: cardStyle.paddingTop,
          paddingBottom: cardStyle.paddingBottom,
          minHeight: cardStyle.minHeight
        };
      }

      const container = section.querySelector('.max-w-\\[1200px\\]');
      let containerStats = null;
      if (container) {
        const cStyle = window.getComputedStyle(container);
        containerStats = {
          height: container.getBoundingClientRect().height,
          gap: cStyle.gap,
          flexDirection: cStyle.flexDirection
        };
      }

      return {
        height: rect.height,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        card: cardStats,
        container: containerStats
      };
    });

    console.log(`Doneness Stats (${vp.name}):`, donenessStats);
    report[vp.name].doneness = donenessStats;

    // Change Doneness slider to verify dynamic changes
    const slider = donenessSection.locator('input[type="range"]');
    if (await slider.isVisible()) {
      await slider.fill('4'); // change to Medium-Well
      await page.waitForTimeout(500);
      await page.screenshot({ path: `.playwright-mcp/${vp.name}-doneness-slider-changed.png` });
    }

    // 2. Audit TimeCraft (Dry Aging Vault)
    const timecraftSection = page.locator('section:has-text("THE DRY AGING VAULT"), div:has-text("THE DRY AGING VAULT")').filter({ has: page.locator('h2:has-text("TIME DOES")') }).first();
    // Because it's sticky, we need to find the parent wrapper
    const timecraftWrapper = await page.evaluateHandle(() => {
      const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('TIME DOES'));
      return h2 ? h2.closest('.relative[style*="height"]') : null;
    });

    if (timecraftWrapper) {
      // Scroll to start of TimeCraft
      await timecraftWrapper.evaluate(el => el.scrollIntoView());
      await page.waitForTimeout(500);
      await page.screenshot({ path: `.playwright-mcp/${vp.name}-timecraft-start.png` });

      const timecraftStats = await page.evaluate((wrapper) => {
        const sticky = wrapper.querySelector('.sticky');
        const stickyRect = sticky.getBoundingClientRect();
        const stickyStyle = window.getComputedStyle(sticky);
        
        const mainContent = sticky.querySelector('.max-w-\\[1300px\\]');
        let contentStats = null;
        if (mainContent) {
          const cRect = mainContent.getBoundingClientRect();
          contentStats = {
            height: cRect.height,
            top: cRect.top - stickyRect.top, // offset inside sticky
            bottom: stickyRect.bottom - cRect.bottom, // empty space below
          };
        }

        return {
          wrapperHeight: wrapper.getBoundingClientRect().height,
          stickyHeight: stickyRect.height,
          justifyContent: stickyStyle.justifyContent,
          contentStats
        };
      }, timecraftWrapper);

      console.log(`TimeCraft Stats (${vp.name}):`, timecraftStats);
      report[vp.name].timecraft = timecraftStats;

      // Scroll halfway through the 500vh container
      await page.evaluate((wrapper) => {
        const top = wrapper.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top + (wrapper.getBoundingClientRect().height / 2));
      }, timecraftWrapper);
      await page.waitForTimeout(500);
      await page.screenshot({ path: `.playwright-mcp/${vp.name}-timecraft-mid.png` });
    }

    await context.close();
  }

  await browser.close();
  
  fs.writeFileSync('scratch/mobile_audit_report.json', JSON.stringify(report, null, 2));
  console.log('\nAudit complete. Data saved to scratch/mobile_audit_report.json');
})();
