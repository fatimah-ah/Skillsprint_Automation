const { waitForElement, waitForNetworkIdle } = require('../utils/wait-helpers');

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = 'https://skillsprint-gdcfg9h6e4dxakcf.centralindia-01.azurewebsites.net';
  }

  /**
   * Navigate to a relative or absolute URL.
   * @param {string} relativeUrl
   */
  async navigate(relativeUrl = '/') {
    const url = relativeUrl.startsWith('http') ? relativeUrl : `${this.baseURL}${relativeUrl}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Wait for the page to be fully loaded (DOM + network idle).
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Get the current page title.
   * @returns {Promise<string>}
   */
  async getTitle() {
    const title = await this.page.title();
    return title;
  }

  /**
   * Take a screenshot and save with a given name.
   * @param {string} name
   * @returns {Promise<Buffer>}
   */
async takeScreenshot(name = 'screenshot') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${name}_${timestamp}.png`;
  const path = `reports/screenshots/${filename}`;
  
  const buffer = await this.page.screenshot({ path: path, fullPage: true });

  await test.info().attachments.push({
    name: name,
    contentType: 'image/png',
    path: path
  });
  
  return buffer;
}

  /**
   * Wait for a toast/alert message element to appear.
   * @param {string} [selector='.toast, .alert, [class*="toast"], [class*="swal"]']
   * @returns {Promise<string>}
   */
  async waitForToast(selector = '.toast, .alert, [class*="toast"], [class*="swal"]') {
    await waitForElement(this.page, selector, 8000);
    return await this.page.locator(selector).first().textContent();
  }

  /**
   * Scroll to a given element.
   * @param {string} selector
   */
  async scrollTo(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Wait for an element to be visible.
   * @param {string} selector
   * @param {number} [timeout=10000]
   */
  async waitForVisible(selector, timeout = 10000) {
    await waitForElement(this.page, selector, timeout);
  }

  /**
   * Get the text content of an element.
   * @param {string} selector
   * @returns {Promise<string>}
   */
  async getText(selector) {
    return await this.page.locator(selector).first().textContent();
  }

  /**
   * Get the current URL.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = BasePage;
