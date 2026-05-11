import { Page, Locator } from "@playwright/test";

export class ShopPage {
    page: Page;
    productHeadings: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productHeadings = page.locator('h4 a');
    }

    async verifyProductPresence(productName: string): Promise<boolean> {
        const allProducts = await this.productHeadings.allTextContents();
        return allProducts.some(product => product.trim().toLowerCase() === productName.toLowerCase());
    }

    async getProductLocator(productName: string): Promise<Locator | null> {
        const productCount = await this.productHeadings.count();
        for (let i = 0; i < productCount; i++) {
            const text = await this.productHeadings.nth(i).textContent();
            if (text?.trim().toLowerCase() === productName.toLowerCase()) {
                return this.productHeadings.nth(i);
            }
        }
        return null;
    }
}
