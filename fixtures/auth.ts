import { test as base, Page } from '@playwright/test';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill(process.env.USER_EMAIL!);
    await page.locator('#userPassword').fill(process.env.USER_PASSWORD!);
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    await use(page);
  },
});