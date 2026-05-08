class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator('#login');
        this.userEmail = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    async goTo()
    {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async validLogin(emailID, password) {
        await this.userEmail.fill(emailID);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};