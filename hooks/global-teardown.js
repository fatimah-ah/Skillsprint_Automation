const { exec } = require('child_process');
const path = require('path');

/**
 * Global teardown runs once after the entire test suite.
 * - Logs test completion time
 * - Generates Allure report automatically
 */
async function globalTeardown() {
  const endTime = new Date().toISOString();
  console.log(`[GlobalTeardown] Suite finished at: ${endTime}`);
  console.log('[GlobalTeardown] Generating Allure report...');

  const allureResultsDir = path.join(__dirname, '../reports/allure-results');
  const allureReportDir = path.join(__dirname, '../reports/allure-report');

  exec(
    `npx allure generate "${allureResultsDir}" --clean -o "${allureReportDir}"`,
    { cwd: path.join(__dirname, '..') },
    (error, stdout, stderr) => {
      if (error) {
        console.warn(`[GlobalTeardown] Allure report generation warning: ${error.message}`);
        return;
      }
      console.log(`[GlobalTeardown] Allure report generated at: ${allureReportDir}`);
      if (stdout) console.log(stdout);
    }
  );

  console.log('[GlobalTeardown] Global teardown complete.');
}

module.exports = globalTeardown;
