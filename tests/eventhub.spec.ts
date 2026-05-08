import { test, expect, Locator } from '@playwright/test';

test('Event Booking', async ({ page }) =>
{
    const emailID : string = 'zinkazama21@gmail.com';
    const password : string = 'Learning21!';
    const eventTitle : string = `Test Event ${Date.now()}`;
    const futureDateValue = () => 
        {
            const date : Date = new Date();
            date.setDate(date.getDate() + 1); // Set to tomorrow
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const yyyy = date.getFullYear();
            return date.toISOString().slice(0, 16);
        };

//Login
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill(emailID);
    await page.getByLabel('Password').fill(password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('main')).toContainText('Browse Events →');
//Login end

//Create an event
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
    await page.locator('#event-title-input').fill(eventTitle);
    await page.locator('#admin-event-form textarea').fill('This is a really bad test description. Please ignore this');
    await page.getByLabel('Category*').selectOption('Sports');
    await page.getByLabel('City').fill('Delhi');
    await page.getByLabel('Venue' ).fill('TEST PLAYGROUND, DELHI, INDIA - 110001');
    await page.getByLabel('Event Date & Time*').fill(futureDateValue());
    await page.getByLabel('Price ($)*').fill('100');
    await page.getByLabel('Total Seats*').fill('50');
    await page.getByTestId('add-event-btn').click();
    await expect(page.getByText('✓Event created!×')).toBeVisible({ timeout: 10000 });
//Create an event end

//Event booking
    await page.getByTestId('nav-events').click();
    const targetCard = page.getByRole('article').filter({has: page.getByRole('heading', { name: eventTitle })});
    await expect(targetCard).toBeVisible( {timeout: 5000} );
    const seatCountLocator = targetCard.locator('.text-xs.font-semibold.text-emerald-600').first();
    const seatsBeforeBooking = await seatCountLocator.innerText();
    const beforeMatch = seatsBeforeBooking.match(/\d+/);
    const countBefore = beforeMatch ? parseInt(beforeMatch[0], 10) : 0;
    const expectedCountAfter = countBefore - 1;
    await targetCard.getByTestId('book-now-btn').click();
//Event booking end

//Fill Booking form
    await expect(page.locator('#ticket-count')).toContainText('1');
    await page.getByLabel('Full Name*').fill('Siddhant');
    await page.getByLabel('Email*').fill('test@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+91 99999 99999');
    await page.locator('.confirm-booking-btn').click();
//Fill Booking form end

//Booking confirmation
    const bookingRefElement : Locator = page.locator('.booking-ref').first();
    await expect(bookingRefElement).toBeVisible();
    const bookingRefText : string = (await bookingRefElement.innerText()).trim();
//Booking confirmation end

//Verify booking in My Bookings
    await page.getByTestId('nav-bookings').click();
    await expect(page).toHaveURL(/.*\/bookings/);
    const Bookings : Locator = page.getByTestId('booking-card');
    await expect(Bookings.nth(0)).toBeVisible({timeout: 5000});
    // await expect(Bookings.filter({ has: page.getByText(bookingRefText) }).toBeVisible()).toContainText(eventTitle);
    const specificBooking : Locator = Bookings.filter({ has: page.getByText(bookingRefText) });
    await expect(specificBooking).toBeVisible();
    await expect(specificBooking).toContainText(eventTitle);
//Verify booking in My Bookings end

//Verify seat count is reduced
    await page.getByTestId('nav-events').click();
    await expect(page.getByTestId('event-card').nth(0)).toBeVisible({timeout: 5000});
    
    await expect(page.getByText(eventTitle)).toBeVisible();
    const seatCountLocatorAfter = targetCard.locator('.text-xs.font-semibold.text-emerald-600').first();
    await expect(seatCountLocatorAfter).toHaveText(new RegExp(`${expectedCountAfter} seats available`));
//Verify seat count is reduced end
});
//change a bit