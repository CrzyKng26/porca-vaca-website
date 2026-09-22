import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  // Measure Doneness
  const doneness = await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const donenessH2 = h2s.find(h => h.textContent.includes('HOW DO YOU'));
    if (!donenessH2) return null;
    const section = donenessH2.closest('section');
    section.scrollIntoView();
    const rect = section.getBoundingClientRect();
    
    // get child elements layout
    const wrapper = section.firstElementChild;
    const wrapperRect = wrapper.getBoundingClientRect();
    
    // right side card
    const card = wrapper.children[1];
    const cardRect = card ? card.getBoundingClientRect() : null;
    const cardStyle = card ? window.getComputedStyle(card) : null;
    
    return {
      sectionHeight: rect.height,
      paddingTop: window.getComputedStyle(section).paddingTop,
      paddingBottom: window.getComputedStyle(section).paddingBottom,
      wrapperHeight: wrapperRect.height,
      gap: window.getComputedStyle(wrapper).gap,
      cardMinHeight: cardStyle?.minHeight,
      cardHeight: cardRect?.height,
      cardPaddingTop: cardStyle?.paddingTop,
      cardPaddingBottom: cardStyle?.paddingBottom
    };
  });
  
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'scratch/doneness_mobile.png' });
  
  // Measure TimeCraft
  const timecraft = await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const timeH2 = h2s.find(h => h.textContent.includes('TIME DOES'));
    if (!timeH2) return null;
    const wrapper = timeH2.closest('.relative[style*="height"]');
    wrapper.scrollIntoView();
    
    const sticky = wrapper.querySelector('.sticky');
    const stickyRect = sticky.getBoundingClientRect();
    
    const mainContent = sticky.querySelector('.max-w-\\[1300px\\]');
    const mainRect = mainContent ? mainContent.getBoundingClientRect() : null;
    
    const card = mainContent ? mainContent.children[1] : null;
    const cardRect = card ? card.getBoundingClientRect() : null;
    
    return {
      wrapperHeight: wrapper.getBoundingClientRect().height,
      stickyHeight: stickyRect.height,
      justifyContent: window.getComputedStyle(sticky).justifyContent,
      mainContentHeight: mainRect?.height,
      mainContentGap: mainContent ? window.getComputedStyle(mainContent).gap : null,
      cardHeight: cardRect?.height
    };
  });

  await page.waitForTimeout(500);
  await page.screenshot({ path: 'scratch/timecraft_mobile_start.png' });
  
  // Scroll halfway down timecraft
  await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const timeH2 = h2s.find(h => h.textContent.includes('TIME DOES'));
    const wrapper = timeH2.closest('.relative[style*="height"]');
    window.scrollTo(0, wrapper.getBoundingClientRect().top + window.scrollY + (wrapper.getBoundingClientRect().height / 2));
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'scratch/timecraft_mobile_mid.png' });

  console.log('DONENESS:', JSON.stringify(doneness, null, 2));
  console.log('TIMECRAFT:', JSON.stringify(timecraft, null, 2));

  await browser.close();
})();
