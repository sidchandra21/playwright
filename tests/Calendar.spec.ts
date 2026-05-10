import { test, expect} from '@playwright/test';
test('Calendar Validation', async ({page})=>   
{
    const month : string = '3';
    const date : string = '21';
    const year : string = '2027';
    const expectedDate : string [] = [month,date,year];

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(month) -1).click();
    await page.locator("//abbr[text()='" + date + "']").click();

    const inputs = page.locator('.react-date-picker__inputGroup__input');

    for (let i=0; i<expectedDate.length; ++i) 
        {
            const value = await inputs.nth(i).inputValue();
            expect(value).toEqual(expectedDate[i]);
        }    
});
//changes to test sid_fixes branch