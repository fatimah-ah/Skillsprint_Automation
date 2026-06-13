// TC-17 | Validate | Missing password field prevents submission
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');

test.describe('Auth - Login Page', () => {
  test('TC-17 | Empty Password | Should block submission when password is missing', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    await login.fillEmail('testuser@skillsprint.dev');
    await login.clickLogin();

    await page.waitForTimeout(1000);

    expect(page.url()).toContain('login');
  });
});
