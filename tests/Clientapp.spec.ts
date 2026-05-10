import {expect, Locator} from '@playwright/test';
import { test} from '../fixtures/auth';
test('First Playwright test', async ({ authenticatedPage }) => {
    const emailID = process.env.USER_EMAIL!;
    const productname : string = "ZARA COAT 3";
    const Products : Locator = authenticatedPage.locator(".card-body");
    const cardTitles : Locator = authenticatedPage.locator('.card-body b');
    const dropdowns : Locator = authenticatedPage.locator('select.input.ddl');
    const firstDropdown : Locator = authenticatedPage.locator('select.input.ddl').first();
    const secondDropdown : Locator = authenticatedPage.locator('select.input.ddl').nth(1);

    console.log(await authenticatedPage.title());
    await authenticatedPage.locator('.card-body b').first().waitFor();
    const titles : string[] = await cardTitles.allTextContents();
    console.log(titles);

    //Zara Coat 3
    const count : number = await Products.count();
    for (let i = 0; i < count; ++i) {
        if (await Products.nth(i).locator('b').textContent() === productname) { //add to cart
            await Products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    // await authenticatedPage.pause();
    await authenticatedPage.locator('[routerlink*=cart]').click();
    await authenticatedPage.locator('div li').first().waitFor();
    const bool : boolean = await authenticatedPage.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await authenticatedPage.locator('text=Checkout').click();
    await authenticatedPage.locator('[placeholder*="Country"]').pressSequentially('ind', { delay: 150 });
    const dropdown : Locator = authenticatedPage.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount : number = await dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {
        const text : any  = await dropdown.locator('button').nth(i).textContent();
        if (text === " India") {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    expect(await authenticatedPage.locator('.user__name [type="text"]').first()).toHaveText(emailID);

    //credit card details
    await firstDropdown.selectOption('08');
    await secondDropdown.selectOption('25');
    await authenticatedPage.locator('input[type="text"][class="input txt"]').nth(0).fill('123');
    await authenticatedPage.locator('input[type="text"][class="input txt"]').nth(1).fill('Siddhant Chandra');
    await authenticatedPage.locator("input[name='coupon']").fill('rahulshettyacademy');
    // await authenticatedPage.pause();
    //credot card details end

    await authenticatedPage.locator('.action__submit').click();

    await expect(authenticatedPage.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderID : any = await authenticatedPage.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderID);

    await authenticatedPage.locator('button:has-text("ORDERS")').click();
    await authenticatedPage.locator("tbody").waitFor();

    //const orderCount = await authenticatedPage.locator('table.table tbody tr').count();
    //console.log(orderCount);

    // count all rows under the table body
    const orderCount = await authenticatedPage  .locator('tbody tr');
    console.log(`total entries: ${await orderCount.count()}`);

    for (let i = 0; i < await orderCount.count(); ++i) {
        const text2 : any = await orderCount.nth(i).locator('th').textContent();
        if (orderID.includes(text2.trim())) {
            await orderCount.nth(i).locator("button").first().click();
            break;
        }
    }

       const rows = await authenticatedPage.locator("tbody tr");
       for (let i = 0; i < await rows.count(); ++i) 
        {
          const rowOrderId : any = await rows.nth(i).locator("th").textContent();
          if (orderID.includes(rowOrderId)) {
             await rows.nth(i).locator("button").first().click();
             break;
          }
       }
    const orderIdDetails : any = await authenticatedPage.locator('.col-text').textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();


});