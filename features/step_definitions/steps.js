const { Given, When, Then } = require("@cucumber/cucumber");
const { expect, chromium } = require('@playwright/test');
const { DashboardPage } = require('../../pageobjects/DashboardPage');
const { CheckOut } = require('../../pageobjects/CheckOut');
const { LoginPage } = require('../../pageobjects/LoginPage');

Given('a login to Ecommerce application with {string} and {string}', async function (username, password) {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.goTo();
    await this.loginPage.validLogin(username, password);
});

When('Add {string} to the cart', async function (productname) {
    // Using the page instance stored in the loginPage object
    this.dashboardPage = new DashboardPage(this.page);
    await this.dashboardPage.searchProductAddCart(productname);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productname) {

    const checkOut = new CheckOut(this.page);
    await checkOut.getProductLocator(productname);
    await checkOut.navigatetoCheckout(productname);
});

When('Enter valid details and Place the Order', async function () {

    const checkOut = new CheckOut(this.page);
    // Type annotations removed for locators
    const firstDropdown = this.page.locator('select.input.ddl').first();
    const secondDropdown = this.page.locator('select.input.ddl').nth(1);

    await checkOut.fillShippingDetails();

    // Assertions remain the same, just without TS casting
    await expect(this.page.locator('.user__name [type="text"]').first()).toHaveText("zinkazama21@gmail.com");

    await checkOut.fillPaymentDetails(firstDropdown, secondDropdown);
    await expect(this.page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

});

Then('Verify order is present in History', { timeout: 100 * 1000 }, async function () {

    const checkOut = new CheckOut(this.page);
    await checkOut.confirmOrder();
});


Given('a login to Ecommerce2 application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    
    const userEmail = this.page.locator('#userEmail');
    const signIn = this.page.locator('#login');
    
    await this.page.goto('https://rahulshettyacademy.com/client/');
    console.log(await this.page.title());
    await userEmail.fill(username);
    await this.page.locator('#userPassword').fill(password);
    await signIn.click();

});

Then('Verify the error message', async function () {
    console. log (await this.page.locator('.toast-message').textContent());
    await expect(this.page.locator('.toast-message')).toContainText('Incorrect');
});