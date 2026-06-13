// TC-12 | Positive | Valid credentials redirect to dashboard
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const data = require('../../data/credentials.json');

test.describe('Auth - Login Page', () => {
  test('TC-12 | Login Success | Valid credentials should redirect to dashboard', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    await login.login(data.validUser.email, data.validUser.password);

    await page.waitForURL('**/dashboard**', { timeout: 15000 }).catch(() => {});

    expect(page.url()).toContain('dashboard');
  });
});
