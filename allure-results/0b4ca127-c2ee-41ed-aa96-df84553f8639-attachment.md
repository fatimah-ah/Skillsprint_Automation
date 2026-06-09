# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features\example.spec.js >> homepage has expected title or loads successfully
- Location: tests\features\example.spec.js:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://skillsprint-gdcfg9h6e4dxakcf.centralindia-01.azurewebsites.net/", waiting until "load"

```

# Test source

```ts
  1 | const { test, expect } = require('@playwright/test');
  2 | 
  3 | test('homepage has expected title or loads successfully', async ({ page }) => {
> 4 |   await page.goto('/');
    |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  5 |   // Basic assertion to ensure the page loaded and is not throwing an error
  6 |   await expect(page).toHaveURL(/.*skillsprint.*/);
  7 | });
  8 | 
```