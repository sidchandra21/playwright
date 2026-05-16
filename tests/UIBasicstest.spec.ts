import { test, expect , BrowserContext, Page, Locator} from '@playwright/test';
test ('@Web First Playwright test', async ({browser})=>
{
    const context : BrowserContext = await browser.newContext();
    try {
        const page : Page = await context.newPage();
        const userEmail : Locator = page.locator('#userEmail');
        const signIn : Locator = page.locator('#login');
        const cardTitles : Locator = page.locator('.card-body h5 b');
        await page.goto('https://rahulshettyacademy.com/client/');
        console.log(await page.title());
        await userEmail.fill('rahulshetty@gmail.com')
        await page.locator('#userPassword').fill('Learning21')
        await signIn.click();
        console. log (await page.locator('.toast-message').textContent());
        await expect(page.locator('.toast-message')).toContainText('Incorrect');
        await userEmail.fill(""); //wipes off the value in the field
        await userEmail.fill('zinkazama21@gmail.com');
        await signIn.click();
        console. log(await cardTitles.first().textContent());
        console. log(await cardTitles.nth(1).textContent());
        await cardTitles.allTextContents();
        const allTitles : string[] = await cardTitles.allTextContents();
        console. log(allTitles);
    } finally {
        await context.close();
    }
});

// type, fill, click, check, uncheck, selectOption, setInputFiles, focus, blur, press, hover, scrollIntoViewIfNeeded, dragTo, selectText, dispatchEvent, evalOnSelector, evalOnSelectorAll, waitForSelector, waitForSelectorState

test ('Page Playwright test', async ({page})=>
{
    await page.goto('https://google.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
});
