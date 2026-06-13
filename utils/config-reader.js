const fs = require('fs');
const path = require('path');

let configData = {};
try {
  const configPath = path.join(__dirname, '../playwright.config.js');
  if (fs.existsSync(configPath)) {
    const content = fs.readFileSync(configPath, 'utf8');
    const baseUrlMatch = content.match(/baseURL:\s*['"`](.*?)['"`]/);
    if (baseUrlMatch) {
      configData.baseURL = baseUrlMatch[1];
    }
    const timeoutMatch = content.match(/timeout:\s*(\d+)/);
    if (timeoutMatch) {
      configData.timeout = parseInt(timeoutMatch[1], 10);
    }
  }
} catch (e) {
  // Fallback on error
}

function getBaseUrl() {
  return process.env.BASE_URL || configData.baseURL || 'https://skillsprint-gdcfg9h6e4dxakcf.centralindia-01.azurewebsites.net';
}

function getTimeout() {
  return process.env.TIMEOUT ? parseInt(process.env.TIMEOUT, 10) : (configData.timeout || 30000);
}

function getBrowser() {
  return process.env.BROWSER || 'chromium';
}

module.exports = {
  getBaseUrl,
  getTimeout,
  getBrowser
};
