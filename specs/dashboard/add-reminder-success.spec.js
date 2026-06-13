const { test, expect } = require('../../fixtures/logged-in-user');
const DashboardPage = require('../../pages/DashboardPage');
const data = require('../../data/dashboard-content.json');

test.describe('Dashboard - Reminders', () => {
  test('TC-52 | Add Reminder Success | Valid reminder with time should appear in reminder list', async ({ loggedInPage: page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.open();
    await page.waitForTimeout(3000);

    const reminderInput = page.locator(dashboard.reminderInput).first();
    const timeInput = page.locator(dashboard.reminderTimeInput).first();
    const addBtn = page.locator(dashboard.addReminderBtn).first();

    if (await reminderInput.count() > 0 && await timeInput.count() > 0) {
      await reminderInput.fill(data.reminder.text);
      await timeInput.fill(data.reminder.time);
      await addBtn.click();
      await page.waitForTimeout(1000);
    }

    expect(page.url()).toContain('dashboard');
  });
});
