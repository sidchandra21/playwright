import { test, expect, Page } from '@playwright/test';
export async function loginAndGoToBooking(page : Page) 
{
    const BASE_URL : string = 'https://eventhub.rahulshettyacademy.com';
    const emailID : string = 'zinkazama21@gmail.com';
    const password : string = 'Learning21!';

    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(emailID);
    await page.getByLabel('Password').fill(password);
    await page.locator('#login-btn').click();

    await expect(page.getByRole('main')).toContainText('Browse Events →');
}

test('Single Ticket Booking', async ({ page }) =>
{

    await loginAndGoToBooking(page);
    await page.getByTestId('nav-events').click();
    await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
    await page.getByLabel('Full Name*').fill('Siddhant');
    await page.getByLabel('Email*').fill('test@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+91 99999 99999');
    await page.locator('.confirm-booking-btn').click();

    //Navigate to Bookings and verify
    await page.getByTestId('nav-bookings').click();
    await expect(page).toHaveURL(/.*\/bookings/);
    await page.waitForTimeout(2000);
    await page.getByText('View Details').first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    const evenTitle : string = await page.locator('h1').innerText();
    const eventRef : string = await page.locator('.text-right').first().innerText();

    const firstTitleChar : string = evenTitle.trim().charAt(0);
    const firstRefChar : string = eventRef.trim().charAt(0);

    await expect(firstTitleChar).toBe(firstRefChar);

    await page.getByTestId('check-refund-btn').click();
    await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 1000 });
    await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

    await expect(page.getByTestId('refund-result')).toBeVisible();
    await expect(page.getByTestId('refund-result')).toContainText('Eligible for refund.');
    await expect(page.getByTestId('refund-result')).toContainText(' Single-ticket bookings qualify for a full refund.');


});

test('Group Ticket Booking', async ({ page }) =>
{

    await loginAndGoToBooking(page);
    await loginAndGoToBooking(page);
    await page.getByTestId('nav-events').click();
    await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
    await page.getByLabel('Full Name*').fill('Siddhant');
    await page.getByLabel('Email*').fill('test@gmail.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+91 99999 99999');
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.locator('.confirm-booking-btn').click();

    await page.getByTestId('nav-bookings').click();
    await expect(page).toHaveURL(/.*\/bookings/);
    await page.waitForTimeout(2000);
    await page.getByText('View Details').first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    const evenTitle : string = await page.locator('h1').innerText();
    const eventRef : string = await page.locator('.text-right').first().innerText();

    const firstTitleChar : string = evenTitle.trim().charAt(0);
    const firstRefChar : string = eventRef.trim().charAt(0);

    await expect(firstTitleChar).toBe(firstRefChar);

    await page.getByTestId('check-refund-btn').click();
    await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 1000 });
    await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

    await expect(page.getByTestId('refund-result')).toBeVisible();
    await expect(page.getByTestId('refund-result')).toContainText('Not eligible for refund.');
    await expect(page.getByTestId('refund-result')).toContainText('Group bookings (3 tickets) are non-refundable');




});