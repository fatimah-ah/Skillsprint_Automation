const { test, expect } = require('../../fixtures/session-room');
const { loginAndJoinRoom } = require('../../utils/auth-helper');
const { waitForRoomReady, openChatPanel } = require('../../utils/wait-helpers');

test.use({
  permissions: ['camera', 'microphone'],
  launchOptions: { args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] }
});

test('TC-LR-04 | Mentor sends a chat message via Send button', async ({ page, sessionRoom }) => {
  const { credentials, SESSION_ID } = sessionRoom;
  await loginAndJoinRoom(page, credentials.validUser.email, credentials.validUser.password, SESSION_ID);
  await waitForRoomReady(page);

  await expect(page.locator('#chatPanel')).toBeHidden();
  await openChatPanel(page);
  await expect(page.locator('.chat-warning')).toContainText('Not Saved');

  const msg = 'Hello from Playwright mentor test!';
  await page.locator('#chatInput').fill(msg);
  await page.locator('#sendChatBtn').click();

  await expect(page.locator('#chatMessages .message.self')).toContainText(msg, { timeout: 8000 });
  await expect(page.locator('#chatInput')).toHaveValue('');
});
