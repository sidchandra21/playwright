import { test, expect, BrowserContext } from '@playwright/test';
let webContext : BrowserContext;

test.beforeAll(async ({browser}) => {

    webContext =  await browser.newContext({storageState: 'state.json'});
});


test('Security Testing', async ({}) => {

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());
    await page.locator('button:has-text("ORDERS")').click();


    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6960eac0c941646b7a8b3e78' }));
    await page.locator('button:has-text("View")').first().click();
    expect(await page.locator('.blink_me').textContent()).toBe('You are not authorize to view this order');

}); 