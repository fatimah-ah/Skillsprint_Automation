
/**
 * Waits for an element matching the selector to be visible on the page.
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 * @param {number} [timeout=10000]
 */
async function waitForElement(page, selector, timeout = 10000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * Waits for a toast/alert/notification message to appear.
 * @param {import('@playwright/test').Page} page
 * @param {string} [selector='.toast, .alert, [class*="toast"], [class*="alert"], [class*="notification"]']
 * @param {number} [timeout=8000]
 */
async function waitForToast(page, selector = '.toast, .alert, [class*="toast"], [class*="alert"], [class*="notification"]', timeout = 8000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * Waits for an overlay (modal backdrop, spinner) to disappear.
 * @param {import('@playwright/test').Page} page
 * @param {string} [selector='.overlay, .spinner, .loading, [class*="overlay"]']
 * @param {number} [timeout=10000]
 */
async function waitForOverlayGone(page, selector = '.overlay, .spinner, .loading, [class*="overlay"]', timeout = 10000) {
  try {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  } catch (_) {
    // Overlay may not exist at all, which is fine
  }
}

/**
 * Waits for the network to reach idle state (no pending requests).
 * @param {import('@playwright/test').Page} page
 * @param {number} [timeout=15000]
 */
async function waitForNetworkIdle(page, timeout = 15000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Waits for navigation to complete.
 * @param {import('@playwright/test').Page} page
 * @param {number} [timeout=15000]
 */
async function waitForNavigation(page, timeout = 15000) {
  await page.waitForLoadState('domcontentloaded', { timeout });
}

module.exports = {
  waitForElement,
  waitForToast,
  waitForOverlayGone,
  waitForNetworkIdle,
  waitForNavigation
};
