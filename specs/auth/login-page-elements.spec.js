// TC-11 | UI | All login form fields and links are present
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');

test.describe('Auth - Login Page', () => {
  test('TC-11 | Login Page Elements | Should display all form fields and links', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    expect(await login.isEmailInputVisible()).toBe(true);
    expect(await login.isPasswordInputVisible()).toBe(true);
    expect(await login.isLoginBtnVisible()).toBe(true);
    expect(await login.isSignupLinkVisible()).toBe(true);
    expect(await login.isForgotLinkVisible()).toBe(true);
  });
});
