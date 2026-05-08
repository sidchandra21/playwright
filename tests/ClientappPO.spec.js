const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { CheckOut } = require('../pageobjects/CheckOut');
const { customtest } = require('../util/test-base');

const placeorderTestData = require('../util/placeorderTestData.json');
// structuredClone is available in Node.js 17+
const testData = structuredClone(placeorderTestData);

for (const data of testData) {
    test(`@Web Client App Test - ${data.productname}`, async ({ page }) => {
        const username = data.username;
        const password = data.password;
        const productname = data.productname;
        
        const firstDropdown = page.locator('select.input.ddl').first();
        const secondDropdown = page.locator('select.input.ddl').nth(1);
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
        
        // Removed type casting and kept the assertion logic
        await expect(page.locator('.user__name [type="text"]').first()).toHaveText(username);
        await checkOut.fillPaymentDetails(firstDropdown, secondDropdown);

        await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
        await checkOut.confirmOrder();
    });
}

customtest(`Client App Test`, async ({ page, testDataForOrder }) => {
    const username = testDataForOrder.username;
    const password = testDataForOrder.password;
    const productname = testDataForOrder.productname;
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.validLogin(username, password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProductAddCart(productname);
    await dashboardPage.navigateToCart();

    const checkOut = new CheckOut(page);
    
    await checkOut.getProductLocator(productname);
    await checkOut.navigatetoCheckout(productname);
});