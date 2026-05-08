import { Page, Locator, expect } from "@playwright/test";
export class CheckOut {
    page: Page;
    countryname: Locator;
    countrynamedropdown: Locator;
    cvvcode: Locator;
    nameoncard: Locator;
    coupon: Locator;
    submitButton: Locator;
    checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.countryname = page.locator('[placeholder*="Country"]');
        this.countrynamedropdown = page.locator('.ta-results');
        this.cvvcode = page.locator('input[type="text"][class="input txt"]').nth(0);
        this.nameoncard = page.locator('input[type="text"][class="input txt"]').nth(1);
        this.coupon = page.locator("input[name='coupon']");
        this.submitButton = page.locator('.action__submit');
        this.checkoutButton = page.locator('text=Checkout');

    }


    async navigatetoCheckout(productname: string) {
        const bool = await this.getProductLocator(productname).isVisible();
        expect(bool).toBeTruthy();
        await this.checkoutButton.click();
    }

    getProductLocator(productname: string) {
        return this.page.locator('h3:has-text("' + productname + '")');
    }

    async fillShippingDetails() {
        await this.countryname.pressSequentially('ind', { delay: 150 });
        await this.countrynamedropdown.waitFor();
        const optionsCount = await this.countrynamedropdown.locator('button').count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.countrynamedropdown.locator('button').nth(i).textContent();
            if (text === " India") {
                await this.countrynamedropdown.locator('button').nth(i).click();
                break;
            }
        }
    }

    async fillPaymentDetails(firstDropdown: Locator, secondDropdown: Locator) {

        //credit card details
        await firstDropdown.selectOption('08');
        await secondDropdown.selectOption('25');
        await this.cvvcode.fill('123');
        await this.nameoncard.fill('Siddhant Chandra');
        await this.coupon.fill('rahulshettyacademy');
        //credit card details end
        await this.submitButton.click();//    
    }

    async confirmOrder() {
        const orderID: any = await this.page.locator('.em-spacer-1 .ng-star-inserted').textContent();
        console.log(orderID);
        await this.page.locator('button:has-text("ORDERS")').click();
        await this.page.locator("tbody").waitFor();
        // count all rows under the table body
        const orderCount = await this.page.locator('tbody tr');
        console.log(`total entries: ${await orderCount.count()}`);
        for (let i = 0; i < await orderCount.count(); ++i) {
            const text2: any = await orderCount.nth(i).locator('th').textContent();
            if (orderID.includes(text2.trim())) {
                await orderCount.nth(i).locator("button").first().click();
                console.log(`Order confirmed: ${orderID}`);
                break;
            }
        }
    }
}