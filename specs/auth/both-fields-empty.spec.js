// TC-18 | Validate | Both empty fields prevent login
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');

test.describe('Auth - Login Page', () => {
  test('TC-18 | Both Fields Empty | Should not login with both fields empty', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    await login.clickLogin();

    await page.waitForTimeout(1000);

    expect(page.url()).toContain('login');
  });
});
