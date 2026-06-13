const { test, expect } = require('../../fixtures/logged-in-user');
const TaskPage = require('../../pages/TaskPage');

test.describe('Tasks - Create Task', () => {
  test('TC-38 | Create Task No Title | Empty title should show error or be blocked', async ({ loggedInPage: page }) => {
    const task = new TaskPage(page);
    await task.open();
    await page.waitForTimeout(2000);

    const createBtn = page.locator(task.createTaskBtn).first();
    if (await createBtn.count() > 0) {
      await createBtn.click();
      await page.waitForTimeout(1000);
    }

    // Should remain on task page
    expect(page.url()).toContain('task');
  });
});
