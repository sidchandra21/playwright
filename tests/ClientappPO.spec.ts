import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '../pageobjects_ts/LoginPage';
import { DashboardPage } from '../pageobjects_ts/DashboardPage';
import { CheckOut } from '../pageobjects_ts/CheckOut';
import { customtest } from '../util_js/test-base';


import placeorderTestData from '../util/placeorderTestData.json';
const testData = structuredClone(placeorderTestData);

for (const data of testData) {
test(`@Web Client App Test - ${data.productname}`, async ({page}) => {
    const username  : string = data.username;
    const password : string = data.password;
    const productname : string = data.productname;
    const firstDropdown = page.locator('select.input.ddl').first();
    const secondDropdown : Locator = page.locator('select.input.ddl').nth(1);
    const loginPage = new LoginPage(page);


    await loginPage.goTo();
    await loginPage.validLogin(username, password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProductAddCart(productname);
    await dashboardPage.navigateToCart();

    const checkOut = new CheckOut(page);
   
    await checkOut.getProductLocator(productname);
    await checkOut.navigatetoCheckout(productname);
    await checkOut.fillShippingDetails();
   
    expect(await page.locator('.user__name [type="text"]').first()).toHaveText(username);
    await checkOut.fillPaymentDetails(firstDropdown, secondDropdown);

   

    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    await checkOut.confirmOrder();

});
}

customtest(`Client App Test`, async ({ page, testDataForOrder }) => {
    const username  : string = testDataForOrder.username;
    const password : string = testDataForOrder.password;
    const productname : string = testDataForOrder.productname;
    const firstDropdown = page.locator('select.input.ddl').first();
    const secondDropdown : Locator = page.locator('select.input.ddl').nth(1);
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.validLogin(username , password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProductAddCart(productname);
    await dashboardPage.navigateToCart();

    const checkOut = new CheckOut(page);
   
    await checkOut.getProductLocator(productname);
    await checkOut.navigatetoCheckout(productname);
    await checkOut.fillShippingDetails();
    expect(page.locator('.user__name [type="text"]').first()).toHaveText(username);
    await checkOut.fillPaymentDetails(firstDropdown, secondDropdown);
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    await checkOut.confirmOrder();
});