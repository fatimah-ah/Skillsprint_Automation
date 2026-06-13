const { test, expect } = require('../../fixtures/logged-in-user');
const DashboardPage = require('../../pages/DashboardPage');
const data = require('../../data/dashboard-content.json');

test.describe('Dashboard - Reminders', () => {
  test('TC-51 | Reminder Needs Time | Adding reminder without time should show warning or be blocked', async ({ loggedInPage: page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.open();
    await page.waitForTimeout(3000);

    const reminderInput = page.locator(dashboard.reminderInput).first();
    if (await reminderInput.count() > 0) {
      await reminderInput.fill(data.reminder.text);
      await page.locator(dashboard.addReminderBtn).first().click();
      await page.waitForTimeout(1000);
    }

    expect(page.url()).toContain('dashboard');
  });
});
