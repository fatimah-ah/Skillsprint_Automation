// TC-20 | Navigate | "Forgot?" link navigates to forget-password.html
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');

test.describe('Auth - Login Page', () => {
  test('TC-20 | Forgot Password Link | Should navigate to forget-password page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    await login.clickForgotPassword();

    await page.waitForLoadState('domcontentloaded');

    expect(page.url()).toMatch(/forget|forgot|reset/i);
  });
});
