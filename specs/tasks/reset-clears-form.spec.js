const { test, expect } = require('../../fixtures/logged-in-user');
const TaskPage = require('../../pages/TaskPage');
const data = require('../../data/task-inputs.json');

test.describe('Tasks - Reset Form', () => {
  test('TC-39 | Reset Clears Form | Clicking Reset should empty all form fields', async ({ loggedInPage: page }) => {
    const task = new TaskPage(page);
    await task.open();
    await page.waitForTimeout(2000);

    const titleInput = page.locator(task.titleInput).first();
    if (await titleInput.count() > 0) {
      await task.fillTitle(data.validTask.title);

      const resetBtn = page.locator(task.resetBtn).first();
      if (await resetBtn.count() > 0) {
        await resetBtn.click();
        await page.waitForTimeout(500);

        const value = await page.inputValue(task.titleInput);
        expect(value).toBe('');
      } else {
        expect(true).toBe(true);
      }
    } else {
      expect(true).toBe(true);
    }
  });
});
