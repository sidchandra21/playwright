import {test , request, Locator, expect} from '@playwright/test';
import {APiUtils} from '../util_js/APiUtils';
const loginPayLoad : { userEmail: string, userPassword: string } = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayLoad : { orders: { country: string, productOrderedId: string }[] } = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
 
 
let response : any;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows : Locator= await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId : string | null = await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails : string | null = await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
//Verify if order created is showing in history page
// Precondition - create order 
