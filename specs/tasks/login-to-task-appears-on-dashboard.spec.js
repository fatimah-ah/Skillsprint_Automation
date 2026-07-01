const { test, expect } = require('@playwright/test');
const { loadCredentials, clearBrowserStorage, cleanupTasksForUser } = require('../../hooks/testHooks');

let credentials;

test.describe('E2E Full Journey', () => {
  test.beforeAll(async ({ request }) => {
    credentials = loadCredentials();
    await cleanupTasksForUser(request, credentials);
  });

  test('TC-E2E-01 | user logs in, creates a task, and verifies it on dashboard', async ({ page }) => {
    // Ensure clean session before logging in
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    // Unique title to ensure no collision
    const taskTitle = `Build Playwright Framework - ${Date.now()}`;

    // STEP 1-5: Login
    await page.goto('/login.html');
    await page.locator('#email').fill(credentials.validUser.email);
    await page.locator('#password').fill(credentials.validUser.password);
    await page.locator('#loginBtn').click();
    await expect(page).toHaveURL(/dashboard\.html/, { timeout: 10000 });
    await expect(page.locator('#username')).not.toBeEmpty({ timeout: 8000 });
    await page.waitForTimeout(2000);

    // STEP 6-13: Navigate to Task page and create task
    await page.locator('.bottom-nav a[href="task.html"]').click();
    await expect(page).toHaveURL(/task\.html/, { timeout: 8000 });
    await expect(page.locator('#taskTitle')).toBeVisible();

    await page.locator('#taskTitle').fill(taskTitle);
    await page.locator('#taskDesc').fill('Automate SkillSprint E2E testing');
    await page.locator('.p-btn[data-value="high"]').waitFor({ state: 'visible' });
    await page.locator('.p-btn[data-value="high"]').click();

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    await page.locator('#taskDue').fill(dueDate.toISOString().split('T')[0]);

    await page.locator('#subTaskInput').fill('Write Page Object classes');
    await page.locator('#subTaskInput').press('Enter');
    await expect(page.locator('#newSubTaskList')).toContainText('Write Page Object classes');

    // Wait for the task creation API response before navigating away
    const createResponsePromise = page.waitForResponse(
      res => res.url().includes('/api/tasks') && res.ok(),
      { timeout: 15000 }
    );
    await page.locator('#createBtn').click();
    await createResponsePromise; // ensures task is saved in the backend
    await expect(page.locator('.toast').first()).toContainText(/created|success/i, { timeout: 6000 });

    // STEP 14-16: Back to Dashboard — verify
    await page.goto('/dashboard.html');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#username')).not.toBeEmpty({ timeout: 8000 });

    // Wait for task list to load
    await page.locator('#taskList .task-card').first().waitFor({ state: 'attached', timeout: 15000 });

    // ASSERTION: A card with our EXACT unique title exists
    const newTaskCard = page.locator('#taskList .task-card')
      .filter({ hasText: taskTitle });
    await expect(newTaskCard).toBeVisible({ timeout: 15000 });
    await expect(newTaskCard).toHaveCount(1);

    // ASSERTION: That card has HIGH priority color (red)
    await expect(newTaskCard.locator('.color-dot'))
      .toHaveCSS('background-color', 'rgb(239, 83, 80)');

    // ASSERTION: Subtask count shows 0/1 (1 created, none done)
    await expect(newTaskCard).toContainText('0/1 Subtasks');

    // ASSERTION: Progress badge shows 0%
    await expect(newTaskCard.locator('.task-progress-badge'))
      .toContainText('0%');
  });
});
