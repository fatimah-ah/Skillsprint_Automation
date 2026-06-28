const { test, expect } = require('../../fixtures/session-room');
const { loginAndJoinRoom } = require('../../utils/auth-helper');
const { waitForRoomReady } = require('../../utils/wait-helpers');

test.use({
  permissions: ['camera', 'microphone'],
  launchOptions: { args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] }
});

test('TC-LR-10 | Mentor toggles whiteboard and switches drawing tools', async ({ page, sessionRoom }) => {
  const { credentials, SESSION_ID } = sessionRoom;
  await loginAndJoinRoom(page, credentials.validUser.email, credentials.validUser.password, SESSION_ID);
  await waitForRoomReady(page);

  const wbBtn = page.locator('#toggleWhiteboard');
  const wbContainer = page.locator('#whiteboardContainer');

  await expect(wbContainer).toBeHidden();
  await expect(wbBtn).not.toHaveClass(/active/);

  await wbBtn.click();
  await expect(wbContainer).toBeVisible();
  await expect(wbBtn).toHaveClass(/active/);

  await expect(page.locator('[data-tool="pen"]')).toBeVisible();
  await expect(page.locator('[data-tool="eraser"]')).toBeVisible();
  await expect(page.locator('#clearBoard')).toBeVisible();
  await expect(page.locator('#whiteboardColor')).toBeVisible();

  const eraserBtn = page.locator('[data-tool="eraser"]');
  await eraserBtn.click();
  await expect(eraserBtn).toHaveClass(/active/);
  await expect(page.locator('[data-tool="pen"]')).not.toHaveClass(/active/);

  const penBtn = page.locator('[data-tool="pen"]');
  await penBtn.click();
  await expect(penBtn).toHaveClass(/active/);

  await wbBtn.click();
  await expect(wbContainer).toBeHidden();
  await expect(wbBtn).not.toHaveClass(/active/);
});
