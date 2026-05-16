import { test , Page} from '@playwright/test';
test('First Playwright test', async ({ browser }) => {
    const context : any = await browser.newContext();
    try {
        const page : Page = await context.newPage();
        page.route('**/*.{jpg,png,jpeg}', route => route.abort());
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        page.on('request', request => console.log(request.url()));
        page.on('response', response => console.log(response.url(), response.status()));
        const username = await page.locator('b:nth-child(1) i:nth-child(1)').textContent();
        const password = await page.locator('b:nth-child(2) i:nth-child(1)').textContent();
        await page.locator('#username').fill(username as string);
        await page.locator('#password').fill(password as string);
        await page.locator('#terms').check();
        await page.locator('#signInBtn').click();
        await page.waitForLoadState('networkidle');
        console.log(await page.title());
    } finally {
        await context.close();
    }
});