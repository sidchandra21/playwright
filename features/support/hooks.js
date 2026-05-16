const { expect, chromium } = require('@playwright/test');
const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { LoginPage } = require('../../pageobjects/LoginPage');

Before (async function() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
});

BeforeStep (function() {
    console.log("Before Step");
});

AfterStep (async function({result}) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: `screenshots/${Date.now()}.png` });
    }
});

After(async function() {
    if (this.context) {
        await this.context.close();
    }
    if (this.browser) {
        await this.browser.close();
    }
});

After ({tags: "@Regression"}, function(){
    console.log("Test Fin");
});