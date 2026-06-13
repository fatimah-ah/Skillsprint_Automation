const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const AUTH_STATE_PATH = path.join(__dirname, '../fixtures/auth-state.json');
const BASE_URL = 'https://skillsprint-gdcfg9h6e4dxakcf.centralindia-01.azurewebsites.net';

/**
 * Global setup runs once before the entire test suite.
 * - Validates the app URL is reachable
 * - Performs one login to generate and save auth storageState
 */
async function globalSetup() {
  const startTime = new Date().toISOString();
  console.log(`[GlobalSetup] Suite started at: ${startTime}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Validate the URL is reachable
  try {
    const response = await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    if (!response || response.status() >= 500) {
      console.warn(`[GlobalSetup] Warning: App returned status ${response?.status()}. Tests may fail.`);
    } else {
      console.log(`[GlobalSetup] App is reachable. Status: ${response.status()}`);
    }
  } catch (e) {
    console.error(`[GlobalSetup] Could not reach app at ${BASE_URL}: ${e.message}`);
  }

  // Attempt login to generate auth state
  try {
    await page.goto(`${BASE_URL}/login.html`, { waitUntil: 'domcontentloaded' });
    await page.fill('#email, input[type="email"]', 'fatimaahmedshaikh1226@gmail.com');
    await page.fill('#password, input[type="password"]', 'Pa$$w0rd');
    await page.click('button[type="submit"], button:has-text("Login")');
    await page.waitForTimeout(3000); // Allow token to be stored

    // Save storage state
    const fixturesDir = path.join(__dirname, '../fixtures');
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }
    await context.storageState({ path: AUTH_STATE_PATH });
    console.log(`[GlobalSetup] Auth state saved to: ${AUTH_STATE_PATH}`);
  } catch (e) {
    console.warn(`[GlobalSetup] Could not create auth state: ${e.message}`);
    // Create a minimal auth state file so tests referencing it don't crash
    const fixturesDir = path.join(__dirname, '../fixtures');
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }
    fs.writeFileSync(AUTH_STATE_PATH, JSON.stringify({ cookies: [], origins: [] }, null, 2));
  }

  await browser.close();
  console.log('[GlobalSetup] Global setup complete.');
}

module.exports = globalSetup;
