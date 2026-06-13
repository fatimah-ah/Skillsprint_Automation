const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators
    this.emailInput        = '#email, input[type="email"], input[name="email"]';
    this.passwordInput     = '#password, input[type="password"], input[name="password"]';
    this.loginBtn          = 'button[type="submit"], .login-btn, button:has-text("Login"), button:has-text("Sign In")';
    this.signupLink        = 'a[href="signup.html"], a:has-text("Sign up"), a:has-text("Register")';
    this.forgotPasswordLink = 'a[href*="forget"], a:has-text("Forgot"), a:has-text("Reset")';
    this.errorMsg          = '.error-message, .alert-danger, [class*="error"], [class*="toast"]';
    this.formTitle         = 'h1, h2, .form-title, .login-title';
  }

  async open() {
    await this.navigate('/login.html');
  }

  async fillEmail(email) {
    await this.page.fill(this.emailInput, email);
  }

  async fillPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.page.click(this.loginBtn);
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async clickSignupLink() {
    await this.page.click(this.signupLink);
  }

  async clickForgotPassword() {
    await this.page.click(this.forgotPasswordLink);
  }

  async isEmailInputVisible() {
    return await this.page.locator(this.emailInput).isVisible();
  }

  async isPasswordInputVisible() {
    return await this.page.locator(this.passwordInput).isVisible();
  }

  async isLoginBtnVisible() {
    return await this.page.locator(this.loginBtn).first().isVisible();
  }

  async isSignupLinkVisible() {
    return await this.page.locator(this.signupLink).isVisible();
  }

  async isForgotLinkVisible() {
    return await this.page.locator(this.forgotPasswordLink).isVisible();
  }
}

module.exports = LoginPage;
