import {test, expect, Locator} from '@playwright/test';
test ('First Playwright test', async ({page})=>
{
    const emailID : string = "zinkazama21@gmail.com";
    const productname : string = "ZARA COAT 3";
    const Products : Locator = page.locator(".card-body");
    const userEmail : Locator = page.getByPlaceholder('email@example.com');
    const signIn : Locator = page.locator('#login');
    const cardTitles : Locator = page.locator('.card-body b');
    const dropdowns : Locator = page.locator('select.input.ddl');
    const firstDropdown : Locator = page.locator('select.input.ddl').first();
    const secondDropdown : Locator = page.locator('select.input.ddl').nth(1);

    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());
    
    await userEmail.fill(emailID);
    await page.getByPlaceholder('enter your passsword').fill('Learning21');
    await signIn.click();
    console. log (await page.locator('.toast-title').textContent());
    await expect(page.locator('.toast-title')).toContainText('Login Successfully');
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const titles : string[] = await cardTitles.allTextContents();
    console. log(titles);
  
    await page.locator('.card-body').filter({ hasText: productname }).getByRole('button',{ name: 'Add To Cart' }).click();

    await page.getByRole("listitem").getByRole('button',{name: 'Cart'}).click();

    await page.locator('div li').first().waitFor({ state: 'visible' });
    await expect(page.getByText(productname)).toBeVisible();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByPlaceholder("Select Country").pressSequentially('ind', { delay: 150 });
    await page.getByRole('button', { name: 'India' }).nth(1).click();

    // const dropdown = page.locator('.ta-results');
    // await dropdown.waitFor();
    // const optionsCount = await dropdown.locator('button').count();
    // for(let i=0; i<optionsCount; ++i)
    // {
    //     const text = await dropdown.locator('button').nth(i).textContent();
    //     if (text === " India")
    //     {
    //         await dropdown.locator('button').nth(i).click();
    //         break;
    //     }            
    // }
    expect (await page.locator('.user__name [type="text"]').first()).toHaveText(emailID);

//credit card details
    await firstDropdown.selectOption('08');
    await secondDropdown.selectOption('25');
    await page.locator('input[type="text"][class="input txt"]').nth(0).fill('123');

    await page.locator('input[type="text"][class="input txt"]').nth(1).fill('Siddhant Chandra');
    await page.locator("input[name='coupon']").fill('rahulshettyacademy');
   // await page.pause();
//credit card details end

    await page.getByText('Place Order ').click();

await expect (page.getByText(' Thankyou for the order. ')).toBeVisible();

const rawOrderID : any = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
// Splits by "|" and takes the second part (the ID), then trims whitespace
const orderID : any = rawOrderID.split("|")[1].trim(); 
console.log(orderID);
console.log(orderID);

await page.getByRole('button', { name: 'ORDERS' }).click();
await page.locator("tbody").waitFor();

//const orderCount = await page.locator('table.table tbody tr').count();
//console.log(orderCount);

// count all rows under the table body
const orderCount = await page.locator('tbody tr');
console.log(`total entries: ${await orderCount.count()}`);
// This looks for the orderID anywhere in the text, case-insensitive
await expect(page.getByText(new RegExp(orderID.trim()))).toBeVisible();

// for(let i=0; i<await orderCount.count(); ++i)
// {
//     const text2 = await orderCount.nth(i).locator('th').textContent();
//     if (orderID.includes(text2.trim()))
//     {
//        await orderCount.nth(i).locator("button").first().click();
//        break;
//     }            
// }

//    const rows = await page.locator("tbody tr");
//    for (let i = 0; i < await rows.count(); ++i) 
//     {
//       const rowOrderId = await rows.nth(i).locator("th").textContent();
//       if (orderID.includes(rowOrderId)) {
//          await rows.nth(i).locator("button").first().click();
//          break;
//       }
//    }
// const orderIdDetails = await page.locator('.col-text').textContent();
// expect(orderID.includes(orderIdDetails)).toBeTruthy();


});