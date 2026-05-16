import { test, expect, Page, Locator, BrowserContext } from '@playwright/test';
const emailID: string = "jivijiy646@deapad.com";
const productname: string = "ZARA COAT 3";
let webContext: BrowserContext;


test.beforeAll(async ({ browser }) => {
    const context: any = await browser.newContext();
    const page: Page = await context.newPage();
    const userEmail: Locator = page.locator('#userEmail');
    const signIn: Locator = page.locator('#login');


    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());
    await userEmail.fill(""); //wipes off the value in the field
    await userEmail.fill(emailID);
    await page.locator('#userPassword').fill('Kuchbhi1!')
    await signIn.click();
    console.log(await page.locator('.toast-title').textContent());
    await expect(page.locator('.toast-title')).toContainText('Login Successfully');
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    await context.close();

});

test.beforeEach(async ({ browser }) => {
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test.afterEach(async () => {
    await webContext.close();
});

test('Login', async () => {

    const page: Page = await webContext.newPage();
    const cardTitles = page.locator('.card-body b');

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('.card-body b').first().waitFor({ state: 'visible' });
    const titles: string[] = await cardTitles.allTextContents();
    console.log(titles);
}
);

test('Place Order', async () => {

    const page: Page = await webContext.newPage();
    const cardTitles: Locator = page.locator('.card-body b');
    const Products: Locator = page.locator(".card-body");
    const dropdowns: Locator = page.locator('select.input.ddl');
    const firstDropdown: Locator = page.locator('select.input.ddl').first();
    const secondDropdown: Locator = page.locator('select.input.ddl').nth(1);

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('.card-body b').first().waitFor({ state: 'visible' });
    const titles: string[] = await cardTitles.allTextContents();
    console.log(titles);

    //Zara Coat 3
    const count = await Products.count();
    for (let i = 0; i < count; ++i) {
        if (await Products.nth(i).locator('b').textContent() === productname) { //add to cart
            await Products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    const toast = page.locator('.toast-bottom-right.toast-container');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Product Added To Cart');
    await toast.waitFor({ state: 'hidden' });
    // await page.pause();
    await page.locator('[routerlink*=cart]').click();
    await page.locator('div li').first().waitFor({ state: 'visible' });
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator('text=Checkout').click();
    await page.locator('[placeholder*="Country"]').pressSequentially('ind', { delay: 150 });
    const dropdown: Locator = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator('button').nth(i).textContent();
        if (text === " India") {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    expect(await page.locator('.user__name [type="text"]').first()).toHaveText(emailID);

    //credit card details
    await firstDropdown.selectOption('08');
    await secondDropdown.selectOption('25');
    await page.locator('input[type="text"][class="input txt"]').nth(0).fill('123');
    await page.locator('input[type="text"][class="input txt"]').nth(1).fill('Siddhant Chandra');
    await page.locator("input[name='coupon']").fill('rahulshettyacademy');
    // await page.pause();
    //credot card details end

    await page.locator('.action__submit').click();

    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderID: any = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderID);

    await page.locator('button:has-text("ORDERS")').click();
    await page.locator("tbody").waitFor();

    // count all rows under the table body
    const orderCount = await page.locator('tbody tr');
    console.log(`total entries: ${await orderCount.count()}`);

    for (let i = 0; i < await orderCount.count(); ++i) {
        const text2: any = await orderCount.nth(i).locator('th').textContent();
        if (orderID.includes(text2.trim())) {
            await orderCount.nth(i).locator("button").first().click();
            break;
        }
    }
});