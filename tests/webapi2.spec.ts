import {test , request, Locator, expect} from '@playwright/test';
import {APiUtils} from '../util_js/APiUtils';

const loginPayload = { userEmail: "zinkazama21@gmail.com", userPassword: "Learning21" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };

let token : any;
let orderID : any;
let response : any;

test.beforeAll(async () => {
    const apiContext : any = await request.newContext();
    const aPiUtils : APiUtils = new APiUtils(apiContext, loginPayload);
    response = await aPiUtils.createOrder(orderPayload);


});


test('@API Placing Order', async ({ page }) => {

    const productname : string = "ZARA COAT 3";
    const Products : Locator = page.locator(".card-body");


    const cardTitles : Locator = page.locator('.card-body b');
    const dropdowns : Locator = page.locator('select.input.ddl');
    const firstDropdown : Locator = page.locator('select.input.ddl').first();
    const secondDropdown : Locator = page.locator('select.input.ddl').nth(1);


    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,
                });

        });

    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());

    await page.locator('.card-body b').first().waitFor();
    const titles : string[] = await cardTitles.allTextContents();
    console.log(titles);

    await page.locator('button:has-text("ORDERS")').click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');

    const orderCount : Locator = await page.locator('tbody tr');
    console.log(`total entries: ${await orderCount.count()}`);

    await expect(page.locator('.mt-4.ng-star-inserted')).toHaveText(' You have No Orders to show at this time. Please Visit Back Us ');
    console.log(await page.locator('.mt-4.ng-star-inserted').textContent());

});