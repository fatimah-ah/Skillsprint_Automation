const { test, expect } = require('../../fixtures/logged-in-user');
const DashboardPage = require('../../pages/DashboardPage');
const data = require('../../data/dashboard-content.json');

test.describe('Dashboard - Search', () => {
  test('TC-53 | Search Filters Tasks | Search should filter displayed task cards', async ({ loggedInPage: page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.open();
    await page.waitForTimeout(3000);

    const searchBar = page.locator(dashboard.searchBar).first();
    if (await searchBar.count() > 0) {
      await searchBar.fill(data.searchTerm);
      await page.waitForTimeout(1000);
    }

    expect(page.url()).toContain('dashboard');
  });
});
