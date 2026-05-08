import { expect , type Locator, type Page} from '@playwright/test';

let message1 : string = 'Hello';
message1 = 'World';

let age1 : number = 20;
let isActive : boolean = false;

let numbers1 : number[] = [1,2,3];

let data : any = 'this could be anything';
data = 52;

console.log(message1);
console.log(age1);

function add(a : number,b : number) : number
{
    return a + b;
}
add (5,10);

let user : { name : string, age: number, location: string } = { name : 'Bob' , age : 30, location : 'Delhi'
};
console.log(user.name);

class DashboardPage {
    page  : Page;
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

        await this.Products.first().waitFor();
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
        await this.page.locator('div li').first().waitFor();
    }
}

module.exports = { DashboardPage };