import {Page , Locator} from "@playwright/test";
export class LoginPage {
    page : Page;
    signInButton : Locator;
    userEmail : Locator;
    password : Locator;
    constructor(page : Page) {
        this.page = page;
        this.signInButton = page.locator('#login');
        this.userEmail = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    async goTo()
    {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async validLogin(emailID : string, password : string) {
        
        await this.userEmail.fill(emailID);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}