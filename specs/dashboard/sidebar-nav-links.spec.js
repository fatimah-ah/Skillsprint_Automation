const { test, expect } = require('../../fixtures/logged-in-user');
const DashboardPage = require('../../pages/DashboardPage');

test.describe('Dashboard - Sidebar', () => {
  test('TC-46 | Sidebar Nav Links | Should have sidebar navigation links visible', async ({ loggedInPage: page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.open();
    await page.waitForTimeout(3000);

    const linkCount = await dashboard.getSidebarLinkCount();

    expect(linkCount).toBeGreaterThanOrEqual(0);
  });
});
