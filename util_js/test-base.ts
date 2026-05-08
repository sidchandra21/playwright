import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    username : string;
    password : string;
    productname : string;
}
export const customtest = baseTest.extend<{testDataForOrder : TestDataForOrder}>(
    {
        testDataForOrder :  {
            username: "sid.chandra21@outlook.com",
            password: "Learning22",
            productname: "ADIDAS ORIGINAL"
        }




    }
)