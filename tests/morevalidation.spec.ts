import { test, expect, FrameLocator } from '@playwright/test';

test.describe.configure({mode: 'serial'});
test('Pop up validation', async ({page})=>
{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.locator('#show-textbox').click();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();  

    const framespage : FrameLocator= page.frameLocator('#courses-iframe');
    await framespage.locator('li a[href*="lifetime-access"]:visible').click();
    const textcheck : string | null = await framespage.locator('.text h2').textContent();
    console.log(textcheck?.split(" ")[1]);


})

test('Screenshot & Visual Comparison', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.locator('#show-textbox').click();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'displayed-text.png'});
    await page.locator('#hide-textbox').click();
    await page.screenshot({path:'screenshot.png', });
    await expect(page.locator('#displayed-text')).toBeHidden();


});

test('visual comparison', async ({page})=>
{
    await page.goto('https://www.google.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png');


});