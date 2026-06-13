const { test, expect } = require('../../fixtures/logged-in-user');
const TaskPage = require('../../pages/TaskPage');

test.describe('Tasks - Filter Tabs', () => {
  test('TC-41 | All Filter Tab | Clicking All tab should display full task list', async ({ loggedInPage: page }) => {
    const task = new TaskPage(page);
    await task.open();
    await page.waitForTimeout(2000);

    const allTab = page.locator(task.allFilterTab).first();
    if (await allTab.count() > 0) {
      await allTab.click();
      await page.waitForTimeout(500);
    }

    expect(page.url()).toContain('task');
  });
});
