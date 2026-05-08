import { test, expect, BrowserContext, Page } from '@playwright/test';
import {it} from 'node:test';

test ('Select India from dropdown menu', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/select-dropdown-menu/');
    
    // Locate the dropdown and select India
    await page.selectOption('select', 'IND');
    
    // Verify India is selected
    const selectedValue : string = await page.inputValue('select');
    expect(selectedValue).toBe('IND');
    console.log(selectedValue);
});

test('Select Radio Button', async ({ page }) => {
    await page.goto('http://test.rubywatir.com/radios.php');
    
    // Locate the radio button and select it
    await page.locator('.radioclass').click();
    console.log(await page.locator('.radioclass').isChecked());
    await expect (page.locator('.radioclass')).toBeChecked();
    await page.locator('div[id="recent4"] li:nth-child(2) a:nth-child(1)').click();
    await page.locator('input[value="basketball"]').click();
    expect(await page.locator('input[value="basketball"]').isChecked()).toBeFalsy()
    await page.locator('input[value="snooker"]').click();
    expect(await page.locator('input[value="snooker"]').isChecked()).toBeTruthy();
});

test('Child Windows', async ({ browser }) => 
{
    const context : BrowserContext= await browser.newContext();
    const page : Page = await context.newPage();
    await page.goto('http://test.rubywatir.com/radios.php');
    const documentLink = page.locator('a[href="/links.php"][target="_blank"]');
    const [newPage] = await Promise.all

    ([
    context.waitForEvent('page'),
    documentLink.click(),
    ])

    const text = await newPage.locator(".column-center h1").textContent();
    console.log(text);
    await page.locator('.radioclass').click();
   
});