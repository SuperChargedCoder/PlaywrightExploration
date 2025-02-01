const base = require('@playwright/test')

exports.customTest = base.test.extend(
    {
        /**For every test case we can have different test data fixture */
        testdataAsFixture: {
            wishlist: "ADIDAS ORIGINAL",
            emailid: "SC@gmail.com",
            password: "Selenium@123",
            nation: " India",
            orderConfirmationText: " Thankyou for the order. "
        }
    }
)



