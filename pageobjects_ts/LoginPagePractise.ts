import { Page, Locator } from "@playwright/test";

export class LoginPagePractise {
    page: Page;
    usernameInput: Locator;
    passwordInput: Locator;
    termsCheckbox: Locator;
    signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.termsCheckbox = page.locator('#terms');
        this.signInButton = page.locator('#signInBtn');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.termsCheckbox.check();
        await this.signInButton.click();
        await this.page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');
    }
}
