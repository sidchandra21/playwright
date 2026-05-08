import {test , request, Locator} from '@playwright/test';
import {APICo} from '../util_js/APICo';

const loginPayload : { userEmail: string, userPassword: string } = {userEmail:"zinkazama21@gmail.com",userPassword:"Learning21"};
const orderPayload : { orders: { country: string, productOrderedId: string }[] } = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let token : any ;
let orderID : any ;
let response : any;

test.beforeAll (async()=>
{
    const apiContext : any = await request.newContext();
    const aPICo : APICo = new APICo(apiContext, loginPayload);
    response = await aPICo.createOrder(orderPayload);

   
});


test ('@API Placing Order', async ({page})=>
{
   
    const productname : string = "ZARA COAT 3";
    const Products : Locator = page.locator(".card-body");

   
    const cardTitles : Locator = page.locator('.card-body b');
    const dropdowns : Locator = page.locator('select.input.ddl');
    const firstDropdown : Locator = page.locator('select.input.ddl').first();
    const secondDropdown : Locator = page.locator('select.input.ddl').nth(1);


    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());

    await page.locator('.card-body b').first().waitFor();
    const titles : string[] = await cardTitles.allTextContents();
    console. log(titles);
  
    
await page.locator('button:has-text("ORDERS")').click();
await page.locator("tbody").waitFor();

const orderCount : Locator = await page.locator('tbody tr');
console.log(`total entries: ${await orderCount.count()}`);

for(let i=0; i<await orderCount.count(); ++i)
{
    const text2 :any = await orderCount.nth(i).locator('th').textContent();
    if (response.orderID.includes(text2.trim()))
    {
       await orderCount.nth(i).locator("button").first().click();
       break;
    }            
}

page.pause();


});