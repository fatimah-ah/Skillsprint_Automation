// TC-13 | Positive | JWT token is stored in localStorage after login
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const data = require('../../data/credentials.json');

test.describe('Auth - Login Page', () => {
  test('TC-13 | Token in Storage | Token should be in localStorage after login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    await login.login(data.validUser.email, data.validUser.password);

    await page.waitForTimeout(3000);

    const token = await page.evaluate(() => {
      return localStorage.getItem('token') ||
             localStorage.getItem('authToken') ||
             localStorage.getItem('jwt');
    });

    expect(token).not.toBeNull();
    expect(token.length).toBeGreaterThan(0);
  });
});
