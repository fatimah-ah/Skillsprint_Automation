const { test, expect } = require('../../fixtures/session-room');
const { loginAndJoinRoom } = require('../../utils/auth-helper');
const { waitForRoomReady, openChatPanel } = require('../../utils/wait-helpers');

test.use({
  permissions: ['camera', 'microphone'],
  launchOptions: { args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] }
});

test('TC-LR-05 | Mentor sends chat message using Enter key', async ({ page, sessionRoom }) => {
  const { credentials, SESSION_ID } = sessionRoom;
  await loginAndJoinRoom(page, credentials.validUser.email, credentials.validUser.password, SESSION_ID);
  await waitForRoomReady(page);
  await openChatPanel(page);

  const msg = 'Sent with Enter key!';
  await page.locator('#chatInput').fill(msg);
  await page.locator('#chatInput').press('Enter');

  await expect(page.locator('#chatMessages .message.self')).toContainText(msg, { timeout: 8000 });
  await expect(page.locator('#chatInput')).toHaveValue('');
});
