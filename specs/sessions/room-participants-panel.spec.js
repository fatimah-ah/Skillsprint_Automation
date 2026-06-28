const { test, expect } = require('../../fixtures/session-room');
const { loginAndJoinRoom } = require('../../utils/auth-helper');
const { waitForRoomReady, openParticipantsPanel } = require('../../utils/wait-helpers');

test.use({
  permissions: ['camera', 'microphone'],
  launchOptions: { args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] }
});

test('TC-LR-11 | Participants panel opens and shows mentor in list', async ({ page, sessionRoom }) => {
  const { credentials, SESSION_ID } = sessionRoom;
  await loginAndJoinRoom(page, credentials.validUser.email, credentials.validUser.password, SESSION_ID);
  await waitForRoomReady(page);

  await expect(page.locator('#rightPanel')).toBeHidden();
  await openParticipantsPanel(page);

  await expect(page.locator('#participantsList .p-name')).toContainText('(You)', { timeout: 8000 });
  await expect(page.locator('#participantsList .p-role')).toContainText('Mentor');

  const selfRow = page.locator('#participantsList .participant-item').filter({ hasText: '(You)' });
  await expect(selfRow.locator('.p-controls')).toHaveCount(0);
});
