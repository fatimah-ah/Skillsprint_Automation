// TC-21 | Navigate | "Sign up" link navigates to signup.html
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');

test.describe('Auth - Login Page', () => {
  test('TC-21 | Signup Page Link | Should navigate to signup page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    await login.clickSignupLink();

    await page.waitForLoadState('domcontentloaded');

    expect(page.url()).toContain('signup');
  });
});
