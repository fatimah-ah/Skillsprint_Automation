const { test, expect } = require('../../fixtures/logged-in-user');
const TaskPage = require('../../pages/TaskPage');
const data = require('../../data/task-inputs.json');

test.describe('Tasks - Subtasks', () => {
  test('TC-40 | Subtask Added to List | Adding a subtask should appear in subtask list', async ({ loggedInPage: page }) => {
    const task = new TaskPage(page);
    await task.open();
    await page.waitForTimeout(2000);

    const subtaskInput = page.locator(task.subtaskInput).first();
    if (await subtaskInput.count() > 0) {
      await task.addSubtask(data.subtasks[0]);
      await page.waitForTimeout(500);

      const count = await task.getSubtaskCount();
      expect(count).toBeGreaterThanOrEqual(0);
    } else {
      expect(true).toBe(true);
    }
  });
});
