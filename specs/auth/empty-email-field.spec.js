// TC-16 | Validate | Missing email field prevents submission
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');

test.describe('Auth - Login Page', () => {
  test('TC-16 | Empty Email | Should block submission when email is missing', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    await login.fillPassword('SomePassword123');
    await login.clickLogin();

    await page.waitForTimeout(1000);

    // Should remain on login page
    expect(page.url()).toContain('login');
  });
});
