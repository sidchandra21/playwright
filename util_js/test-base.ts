import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    username : string;
    password : string;
    productname : string;
}
export const customtest = baseTest.extend<{testDataForOrder : TestDataForOrder}>(
    {
        testDataForOrder :  {
            username: "jivijiy646@deapad.com",
            password: "Kuchbhi1!",
            productname: "iphone 13 pro"
        }




    }
)