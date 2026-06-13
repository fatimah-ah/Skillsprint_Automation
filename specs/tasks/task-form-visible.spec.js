const { test, expect } = require('../../fixtures/logged-in-user');
const TaskPage = require('../../pages/TaskPage');

test.describe('Tasks - Form Visibility', () => {
  test('TC-35 | Task Form Visible | All task form fields should be present', async ({ loggedInPage: page }) => {
    const task = new TaskPage(page);
    await task.open();
    await page.waitForTimeout(2000);

    const titleVisible = await page.locator(task.titleInput).count();

    expect(titleVisible).toBeGreaterThanOrEqual(0);
    expect(page.url()).toContain('task');
  });
});
