const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder :  {
            username: "sid.chandra21@outlook.com",
            password: "Learning22",
            productname: "ADIDAS ORIGINAL"
        }




    }
)