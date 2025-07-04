import { test } from '@playwright/test';

// Invalid login

test('Invalid login', async ({ page }) => {
  await page.setViewportSize({ width: 998, height: 737 });

  // Invalid Login Attempt
  await page.goto('http://localhost:4173/login');
  await page.fill('input:nth-of-type(1)', 'aaaaaaa');
  await page.fill('input[type="password"]', 'bbbbbbbbbb1234!@#$');
  await page.locator('button:has-text("Login")').click();
  await page.close();
});
