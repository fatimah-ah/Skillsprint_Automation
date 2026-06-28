const { waitForElement, waitForNetworkIdle } = require('../utils/wait-helpers');

class BasePage {
    constructor(page) {
    this.page = page;
    this.baseURL = 'https://skillsprint-gdcfg9h6e4dxakcf.centralindia-01.azurewebsites.net';
  }

    async navigate(relativeUrl = '/') {
    const url = relativeUrl.startsWith('http') ? relativeUrl : `${this.baseURL}${relativeUrl}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

    async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

    async getTitle() {
    const title = await this.page.title();
    return title;
  }

  async takeScreenshot(name = 'screenshot') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}_${timestamp}.png`;
    const path = `reports/screenshots/${filename}`;
    
    const buffer = await this.page.screenshot({ path: path, fullPage: true });

    // The remote used test.info().attachments, assuming 'test' is available globally or injected
    if (typeof test !== 'undefined') {
      await test.info().attachments.push({
        name: name,
        contentType: 'image/png',
        path: path
      });
    }
    
    return buffer;
  }

    async waitForToast(selector = '.toast, .alert, [class*="toast"], [class*="swal"]') {
    await waitForElement(this.page, selector, 8000);
    return await this.page.locator(selector).first().textContent();
  }

    async scrollTo(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

    async waitForVisible(selector, timeout = 10000) {
    await waitForElement(this.page, selector, timeout);
  }

    async getText(selector) {
    return await this.page.locator(selector).first().textContent();
  }

    async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = BasePage;
