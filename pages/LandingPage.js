const BasePage = require('./BasePage');

class LandingPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators
    this.splash              = '#splash';
    this.navFeaturesLink     = 'nav a[href="#features"]';
    this.navAboutLink        = 'nav a[href="#about"]';
    this.navLoginLink        = 'nav a[href="login.html"]';
    this.navLogo             = '.logo-wrapper';
    this.enterWorkspaceBtn   = 'nav a.btn-workspace[href="getstarted.html"]';
    this.heroHeading         = '.hero h1';
    this.heroCtaBtn          = '.hero a.btn-workspace[href="signup.html"]';
    this.bentoGrid           = '.bento-grid';
    this.bentoItems          = '.bento-grid .bento-item';
    this.footer              = 'footer.footer';
    this.footerSections      = 'footer .footer-section';
    this.footerCopyright     = '.footer-bottom p';
    this.floatingCta         = '.floating-cta';
    this.scrollProgress      = '.scroll-progress';
  }

  async open() {
    await this.navigate('/');
  }

  async clickEnterWorkspace() {
    await this.page.click(this.enterWorkspaceBtn);
  }

  async clickHeroCta() {
    await this.page.click(this.heroCtaBtn);
  }

  async clickNavLogin() {
    await this.page.click(this.navLoginLink);
  }

  async getBentoItemCount() {
    return await this.page.locator(this.bentoItems).count();
  }

  async getFooterSectionCount() {
    // +1 for the logo/brand section
    return await this.page.locator(this.footerSections).count();
  }

  async getHeroHeadingText() {
    return await this.page.locator(this.heroHeading).textContent();
  }

  async isSplashVisible() {
    return await this.page.locator(this.splash).isVisible();
  }
}

module.exports = LandingPage;
