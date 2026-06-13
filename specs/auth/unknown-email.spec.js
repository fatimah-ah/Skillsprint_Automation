// TC-15 | Negative | Unknown email shows error
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const data = require('../../data/credentials.json');

test.describe('Auth - Login Page', () => {
  test('TC-15 | Unknown Email | Should not login with unregistered email', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    await login.login(data.unknownEmail.email, data.unknownEmail.password);

    await page.waitForTimeout(3000);

    expect(page.url()).not.toContain('dashboard');
  });
});
