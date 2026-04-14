import { test, expect } from '@playwright/test';

test.describe('Hero Section - Desktop & Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display correctly and handle URL validation', async ({ page }) => {
    // Check main title visibility
    const title = page.locator('h1.hero-main-title');
    await expect(title).toBeVisible();

    // Test URL input
    const input = page.locator('input[placeholder*="Web site adresini gir"]');
    await expect(input).toBeVisible();

    // Invalid URL submission
    await input.fill('invalid-url');
    await page.click('button:has-text("Analiz Al")'); // Adjust selector based on actual text
    const error = page.locator('p[class*="text-[var(--color-error)]"]');
    // Note: The error message will depend on the language context
    await expect(error).toBeVisible();
  });

  test('should show phone modal on valid URL submission', async ({ page }) => {
    const input = page.locator('input[placeholder*="Web site adresini gir"]');
    await input.fill('https://example.com');
    await page.click('button:has-text("Analiz Al")');

    // Modal should appear
    const modal = page.locator('div[role="dialog"]'); // Assuming Radix UI modal
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Telefon');
  });

  test('should handle snappy scroll', async ({ page, isMobile }) => {
    // On desktop, scroll down should trigger snap
    if (!isMobile) {
      await page.mouse.wheel(0, 500);
      // Wait for animation
      await page.waitForTimeout(1000);
      // Check if scrolled to CRO-X Ultra section
      const ultraSection = page.locator('#crox-ultra');
      const box = await ultraSection.boundingBox();
      expect(box?.y).toBeLessThan(100); // Should be near the top
    } else {
      // Mobile swipe testing (simulation)
      await page.touchscreen.tap(100, 100);
      // Playwright mobile swipe is more complex, but we can check if scroll indicator works
      await page.click('.hero-scroll-group');
      await page.waitForTimeout(1000);
      const ultraSection = page.locator('#crox-ultra');
      await expect(ultraSection).toBeInViewport();
    }
  });
});
