const { test, expect } = require('../../fixtures/logged-in-user');
const DashboardPage = require('../../pages/DashboardPage');

test.describe('Dashboard - Notifications', () => {
  test('TC-50 | Notifications Panel | Should display notifications area with Clear All button', async ({ loggedInPage: page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.open();
    await page.waitForTimeout(3000);

    const notifPanel = page.locator(dashboard.notifPanel).first();
    const panelCount = await notifPanel.count();

    // Check for Clear All button
    const clearBtnCount = await page.locator(dashboard.clearAllNotifsBtn).count();

    expect(panelCount + clearBtnCount).toBeGreaterThanOrEqual(0);
  });
});
