const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    // Sidebar
    this.sidebar          = '.sidebar, nav.sidebar, [class*="sidebar"]';
    this.sidebarToggleBtn = '.toggle-btn, .sidebar-toggle, button[class*="toggle"]';
    this.sidebarNavLinks  = '.sidebar a, .sidebar nav a, .sidebar-nav a';
    this.usernameDisplay  = '.username, .user-name, [class*="username"], .welcome-name';

    // Wallet cards
    this.walletSection    = '.wallet, [class*="wallet"]';
    this.walletCards      = '.wallet-card, [class*="wallet-card"]';

    // Streak
    this.streakCard       = '.streak-card, [class*="streak"]';
    this.streakText       = '.streak-text, [class*="streak"] p, [class*="streak"] span';
    this.streakProgress   = '.streak-card progress, .streak-card [class*="progress"]';

    // Task list
    this.taskList         = '.task-list, [class*="task-list"]';
    this.taskCards        = '.task-item, .task-card, [class*="task-item"]';

    // Notifications
    this.notifPanel       = '.notifications, [class*="notif"]';
    this.notifList        = '.notification-item, [class*="notif-item"]';
    this.clearAllNotifsBtn = 'button:has-text("Clear All"), .clear-all-btn';

    // Reminders
    this.reminderInput    = 'input[placeholder*="reminder" i], input[placeholder*="task" i], .reminder-input';
    this.reminderTimeInput = 'input[type="time"], .reminder-time';
    this.addReminderBtn   = 'button:has-text("Add"), .add-reminder-btn';
    this.reminderList     = '.reminder-list, [class*="reminder-list"]';

    // Search
    this.searchBar        = 'input[type="search"], input[placeholder*="search" i], .search-input';
  }

  async open() {
    await this.navigate('/dashboard.html');
  }

  async getSidebarLinkCount() {
    return await this.page.locator(this.sidebarNavLinks).count();
  }

  async clickSidebarToggle() {
    await this.page.click(this.sidebarToggleBtn);
  }

  async isSidebarCollapsed() {
    const sidebar = this.page.locator(this.sidebar).first();
    const classList = await sidebar.getAttribute('class') || '';
    return classList.includes('collapsed');
  }

  async getUsernameText() {
    return await this.page.locator(this.usernameDisplay).first().textContent();
  }

  async getWalletCardCount() {
    return await this.page.locator(this.walletCards).count();
  }

  async getStreakText() {
    return await this.page.locator(this.streakCard).first().textContent();
  }

  async isStreakProgressVisible() {
    return await this.page.locator(this.streakProgress).isVisible();
  }

  async isClearAllButtonVisible() {
    return await this.page.locator(this.clearAllNotifsBtn).isVisible();
  }

  async addReminder(text, time) {
    await this.page.fill(this.reminderInput, text);
    await this.page.fill(this.reminderTimeInput, time);
    await this.page.click(this.addReminderBtn);
  }

  async addReminderWithoutTime(text) {
    await this.page.fill(this.reminderInput, text);
    await this.page.click(this.addReminderBtn);
  }

  async typeInSearch(term) {
    await this.page.fill(this.searchBar, term);
  }

  async getReminderListCount() {
    return await this.page.locator('.reminder-item, [class*="reminder-item"]').count();
  }
}

module.exports = DashboardPage;
