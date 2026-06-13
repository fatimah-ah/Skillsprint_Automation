const path = require('path');
const fs = require('fs');

const AUTH_STATE_PATH = path.join(__dirname, '../fixtures/auth-state.json');
const BASE_URL = 'https://skillsprint-gdcfg9h6e4dxakcf.centralindia-01.azurewebsites.net';

/**
 * Logs in via UI interaction (email + password form submission).
 * @param {import('@playwright/test').Page} page
 * @param {string} email
 * @param {string} password
 */
async function loginViaUI(page, email, password) {
  await page.goto(`${BASE_URL}/login.html`, { waitUntil: 'domcontentloaded' });
  await page.fill('#email, input[type="email"], input[name="email"]', email);
  await page.fill('#password, input[type="password"], input[name="password"]', password);
  await page.click('button[type="submit"], .login-btn, button:has-text("Login"), button:has-text("Sign In")');
  await page.waitForURL('**/dashboard**', { timeout: 15000 }).catch(() => {});
}

/**
 * Injects a JWT token directly into localStorage to bypass UI login.
 * @param {import('@playwright/test').Page} page
 * @param {string} token
 */
async function loginViaStorage(page, token) {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate((t) => {
    localStorage.setItem('token', t);
    localStorage.setItem('authToken', t);
    localStorage.setItem('jwt', t);
  }, token);
}

/**
 * Clears session storage and localStorage to simulate logout.
 * @param {import('@playwright/test').Page} page
 */
async function clearSession(page) {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

/**
 * Loads the saved auth state from fixtures/auth-state.json if available.
 * @returns {string|null} saved storage state path or null
 */
function getStorageStatePath() {
  if (fs.existsSync(AUTH_STATE_PATH)) {
    return AUTH_STATE_PATH;
  }
  return null;
}

module.exports = {
  loginViaUI,
  loginViaStorage,
  clearSession,
  getStorageStatePath,
  AUTH_STATE_PATH
};
