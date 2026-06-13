const BasePage = require('./BasePage');

class GetStartedPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators
    this.learnerCard     = '.role-card[data-role="learner"], .card:has-text("Learner"), [class*="learner"]';
    this.adminCard       = '.role-card[data-role="admin"], .card:has-text("Admin"), [class*="admin"]';
    this.continueBtn     = 'button:has-text("Continue"), .continue-btn, button[type="submit"]';
    this.infoToggle      = '.info-toggle, [class*="info"] button, button:has-text("?")';
    this.infoPanel       = '.info-panel, [class*="info-panel"]';
  }

  async open() {
    await this.navigate('/getstarted.html');
  }

  async selectRole(role = 'learner') {
    const selector = role === 'admin' ? this.adminCard : this.learnerCard;
    await this.page.click(selector);
  }

  async clickContinue() {
    await this.page.click(this.continueBtn);
  }

  async isContinueBtnDisabled() {
    return await this.page.locator(this.continueBtn).isDisabled();
  }

  async isLearnerCardVisible() {
    return await this.page.locator(this.learnerCard).isVisible();
  }

  async isAdminCardVisible() {
    return await this.page.locator(this.adminCard).isVisible();
  }
}

module.exports = GetStartedPage;
