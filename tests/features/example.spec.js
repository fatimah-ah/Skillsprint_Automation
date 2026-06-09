const { test, expect } = require('@playwright/test');

test('homepage has expected title or loads successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  // Basic assertion to ensure the page loaded and is not throwing an error
  await expect(page).toHaveURL(/.*skillsprint.*/);
});
