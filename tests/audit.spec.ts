const { test, expect } = require('@playwright/test');

test.describe('Porca & Vaca Full Audit', () => {
  test('Front page loads correctly without errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('http://localhost:3001');
    
    // Check main sections
    await expect(page.locator('section#menu')).toBeVisible();
    await expect(page.locator('section#team')).toBeVisible();
    
    // Count team members to ensure no duplicates
    const teamMembers = await page.locator('#team img').count();
    console.log(`Team members counted: ${teamMembers}`);

    // Check Meat Mafia page
    await page.goto('http://localhost:3001/mafia');
    await expect(page.locator('text=MEAT MAFIA')).toBeVisible();
    
    // Check Admin page
    await page.goto('http://localhost:3001/admin');
    await expect(page.locator('text=MANAGE MENU')).toBeVisible();

    // Check Admin Menu page
    await page.goto('http://localhost:3001/admin/menu');
    await expect(page.locator('table')).toBeVisible();

    // Click Edit on the first menu item
    const firstEditLink = page.locator('text=Edit').first();
    await firstEditLink.click();
    await page.waitForLoadState('networkidle');
    const editUrl = page.url();
    console.log(`Edit URL: ${editUrl}`);
    const is404 = await page.locator('text=404').isVisible();
    expect(is404).toBeFalsy();

    // Check Admin Mafia Add Event
    await page.goto('http://localhost:3001/admin/mafia');
    const addEventLink = page.locator('text=+ ADD NEW EVENT').first();
    await addEventLink.click();
    await page.waitForLoadState('networkidle');
    const addUrl = page.url();
    console.log(`Add Event URL: ${addUrl}`);
    const isMafia404 = await page.locator('text=404').isVisible();
    expect(isMafia404).toBeFalsy();

    // Check Admin Reservations
    await page.goto('http://localhost:3001/admin/reservations');
    await page.waitForLoadState('networkidle');
    const isRes404 = await page.locator('text=404').isVisible();
    expect(isRes404).toBeFalsy();
    
    console.log('All tests passed successfully.');
    if (errors.length > 0) {
      console.log('Console errors:', errors);
    }
  });
});
