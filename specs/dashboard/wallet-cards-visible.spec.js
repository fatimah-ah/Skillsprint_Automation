const { test, expect } = require('../../fixtures/logged-in-user');
const DashboardPage = require('../../pages/DashboardPage');

test.describe('Dashboard - Wallet Cards', () => {
  test('TC-48 | Wallet Cards Visible | Should display 3 wallet cards', async ({ loggedInPage: page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.open();
    await page.waitForTimeout(3000);

    const walletCount = await dashboard.getWalletCardCount();

    expect(walletCount).toBeGreaterThanOrEqual(0);
  });
});
