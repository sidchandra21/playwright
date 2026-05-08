import { test, expect } from '@playwright/test';
const BASE_URL : string = 'https://eventhub.rahulshettyacademy.com';
const API_URL : string = `https://api.eventhub.rahulshettyacademy.com/api`;
const GmailUser : { email: string, password: string }= { email: "zinkazama21@gmail.com", password: "Learning21!" };
const TempUser : { email: string, password: string } = { email: "xinap83488@cosdas.com", password: "Thisisatest2!" };
let gmailbookingId : any;

test('Correct Login', async ({ page, request }) => {
    console.log('API_URL:', API_URL);
    const loginRes : any = await request.post(`${API_URL}/auth/login`, {
        data: {
            email: GmailUser.email,
            password: GmailUser.password
        }
    });
    expect(loginRes.ok()).toBeTruthy();
    const { token } = await loginRes.json();
    console.log(token);

    //Fetch events

    const eventsRes : any = await request.get(`${API_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` }
    });


    expect(eventsRes.ok()).toBeTruthy();
    const eventsData : any = await eventsRes.json();
    const eventId : string = eventsData.data[0].id;

    //create booking
    const bookingRes : any = await request.post(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
            eventId: eventId,
            customerName: 'Gmail User',
            customerEmail: GmailUser.email,
            customerPhone: '9999999999',
            quantity: 1,
        }
    });
    expect(bookingRes.ok()).toBeTruthy();
    const booking : any = await bookingRes.json();
    gmailbookingId = booking.data.id;
    console.log('Booking ID:', gmailbookingId);

    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(TempUser.email);
    await page.getByLabel('Password').fill(TempUser.password);
    await page.locator('#login-btn').click();
    await page.waitForLoadState('networkidle');
    await page.goto(`${BASE_URL}/bookings/${gmailbookingId}`);
    
    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();
});

