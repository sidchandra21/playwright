import { test, expect } from "@playwright/test";
import { LoginPagePractise } from "../pageobjects_ts/LoginPagePractise";
import { ShopPage } from "../pageobjects_ts/ShopPage";

test("Login to practice site and verify iPhone X product", async ({ page }) => {
    const username = "rahulshettyacademy";
    const password = "Learning@830$3mK2";
    const productName = "iphone X";

    // Initialize page objects
    const loginPage = new LoginPagePractise(page);
    const shopPage = new ShopPage(page);

    // Navigate to login page
    await loginPage.goTo();

    // Perform login
    await loginPage.login(username, password);

    // Verify that we are on the shop page
    expect(page.url()).toContain('angularpractice/shop');

    // Verify iPhone X product is present on the page
    const isProductPresent = await shopPage.verifyProductPresence(productName);
    expect(isProductPresent).toBe(true);
});
