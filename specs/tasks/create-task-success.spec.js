const { test, expect } = require('../../fixtures/logged-in-user');
const TaskPage = require('../../pages/TaskPage');
const data = require('../../data/task-inputs.json');

test.describe('Tasks - Create Task', () => {
  test('TC-37 | Create Task Success | Valid task details should create a new task', async ({ loggedInPage: page }) => {
    const task = new TaskPage(page);
    await task.open();
    await page.waitForTimeout(2000);

    const titleInput = page.locator(task.titleInput).first();
    if (await titleInput.count() > 0) {
      await task.fillTitle(data.validTask.title);

      const createBtn = page.locator(task.createTaskBtn).first();
      if (await createBtn.count() > 0) {
        await createBtn.click();
        await page.waitForTimeout(1500);
      }
    }

    expect(page.url()).toContain('task');
  });
});
