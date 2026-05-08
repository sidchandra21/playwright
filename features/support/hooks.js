const { expect, chromium } = require('@playwright/test');
const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { LoginPage } = require('../../pageobjects/LoginPage');

Before (async function() {
    const browser = await chromium.launch( { headless: false } );
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.loginPage = new LoginPage(this.page);
});

BeforeStep (function() {
    console.log("Before Step");
});

AfterStep (async function({result}) {
    if(result.status === Status.FAILED) {
        await this.page.screenshot({path: `screenshots/${Date.now()}.png`});
    }
});

After ({tags: "@Regression"}, function(){
    console.log("Test Fin");
});