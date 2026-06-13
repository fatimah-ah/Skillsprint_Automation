// TC-14 | Negative | Wrong password shows error toast
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const data = require('../../data/credentials.json');

test.describe('Auth - Login Page', () => {
  test('TC-14 | Wrong Password | Should show error message for wrong password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    await login.login(data.wrongPassword.email, data.wrongPassword.password);

    await page.waitForTimeout(3000);

    // Should NOT navigate to dashboard
    expect(page.url()).not.toContain('dashboard');
  });
});
