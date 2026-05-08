import {Page , Locator} from "@playwright/test";
export class DashboardPage {
    page : Page;
    Products : Locator;
    cardTitles : Locator;
    cart : Locator;

    constructor(page : Page) {
        this.page = page;
        this.Products = page.locator('.card-body');
        this.cardTitles = page.locator('.card-body b');
        this.cart = page.locator('[routerlink*=cart]');
        
    }

    async searchProductAddCart(productname : string) {

        await this.Products.first().waitFor({ state: 'visible' });
        const titles = await this.cardTitles.allTextContents();
        console.log(titles);

        //Zara Coat 3
        const count = await this.Products.count();
        for (let i = 0; i < count; ++i) {
            if (await this.Products.nth(i).locator('b').textContent() === productname) 
            {
                //add to cart
                await this.Products.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
        await this.page.locator('div li').first().waitFor({ state: 'visible' });
    }
}