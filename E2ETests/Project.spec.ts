// import { test } from '@playwright/test';

// // Project as admin

// test('Project as admin', async ({ page }) => {
//   await page.setViewportSize({ width: 998, height: 737 });

//   // Login
//   await page.goto('http://localhost:4173/login');
//   await page.fill('input:nth-of-type(1)', 'admin');
//   await page.fill('input[type="password"]', 'zaq12wsx');
//   await page.locator('button:has-text("Login")').click();

//   // Add Project
//   await page.locator('text=Projects').click();
//   await page.locator('text=Add new project').click();
//   await page.fill('input', 'test1');
//   await page.fill('textarea', 'test');
//   await page.locator('button:has-text("Add project")').click();

//   // Edit Project
//   await page.locator('a:has-text("Edit")').click();
//   await page.fill('input', 'test12');
//   await page.fill('textarea', 'test2');
//   await page.locator('button:has-text("Edit")').click();

//   // Delete Project
//   await page.locator('button:has-text("Delete")').click();

//   await page.close();
// });