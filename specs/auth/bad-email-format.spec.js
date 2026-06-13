// TC-19 | Validate | Non-email string triggers HTML5 validation
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const data = require('../../data/credentials.json');

test.describe('Auth - Login Page', () => {
  test('TC-19 | Bad Email Format | Should mark email invalid for non-email string', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    await login.fillEmail(data.badEmailFormat.email);
    await login.fillPassword(data.badEmailFormat.password);
    await login.clickLogin();

    await page.waitForTimeout(1000);

    const isInvalid = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el && !el.validity.valid;
    }, 'input[type="email"]');

    expect(isInvalid).toBe(true);
  });
});
