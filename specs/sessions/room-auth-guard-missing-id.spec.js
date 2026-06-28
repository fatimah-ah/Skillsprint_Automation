const { test, expect } = require('@playwright/test');
const { getCredentials } = require('../../utils/data-reader');
const { loginViaUI } = require('../../utils/auth-helper');

test.describe('Live Session Room — Auth Guard', () => {
  let credentials;

  test.beforeAll(() => {
    credentials = getCredentials();
  });

  test('TC-LR-02 | Missing sessionId in URL redirects to dashboard', async ({ page }) => {
    await loginViaUI(page, credentials.validUser.email, credentials.validUser.password);
    await expect(page).toHaveURL(/dashboard\.html/, { timeout: 10000 });

    await page.goto('/livevideo.html');
    await expect(page).toHaveURL(/dashboard\.html/, { timeout: 8000 });
  });
});
