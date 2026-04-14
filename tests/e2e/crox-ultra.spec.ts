import { test, expect } from '@playwright/test';

test.describe('CRO-X Ultra Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display benefit items in the grid', async ({ page }) => {
    // Wait for the section to be visible
    const section = page.locator('#crox-ultra');
    await expect(section).toBeVisible();

    // The grid should have items
    const gridItems = page.locator('.crox-ultra-items-grid .group\\/item');
    
    // Check if at least some items are present (should be around 40)
    const count = await gridItems.count();
    console.log(`Found ${count} items in CRO-X Ultra grid`);
    expect(count).toBeGreaterThan(0);

    // Verify visibility of the first few items
    await expect(gridItems.first()).toBeVisible();
  });

  test('should have specific Turkish text items in the grid', async ({ page }) => {
    // This test specifically looks for known Turkish items from tr.ts
    const firstItemText = 'Rakip Analizi & Kıyaslama';
    await expect(page.getByText(firstItemText)).toBeVisible();
    
    const lastItemText = '12 Aylık Dönüşüm Yol Haritası';
    await expect(page.getByText(lastItemText)).toBeVisible();
  });
});
