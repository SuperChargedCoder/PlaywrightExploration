const { test, expect, request } = require('@playwright/test')
const { count } = require('console')
const loginPayload = { userEmail: "SC@gmail.com", userPassword: "Selenium@123" } //Payload as Java Script Object
let sessionToken
let orderID
const orderPayload = {orders:[{country:"India",productOrderedId:"6581ca979fd99c85e8ee7faf"}]} //Remove "" for keys
/**At run time this java script object converted to JSON */

/**Making API Calls*/
test.beforeAll(async function () {
    const apiContext = await request.newContext() // Here we can pass proxy and some other browser related details 
    /**Calling Login API */
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        })

    /**Validating the API response & handling JOSN response body*/
    await expect(loginResponse.ok()).toBeTruthy()
    const loginResponseBody = await loginResponse.json()
    sessionToken = loginResponseBody.token
    /** Setting up the login token into browser local storage */
    console.log("SessionToken : " + sessionToken)
    
    /**Calling Order API */
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayload,
        headers: {
            'authorization': sessionToken,
            'content-type': 'application/json'
        },
    })
    /**Validating the API response & handling JOSN response body*/
    await expect(orderResponse.ok()).toBeTruthy()
    const orderResponseBody = await orderResponse.json()
    orderID = orderResponseBody.orders[0]
    await expect(orderResponseBody.message).toEqual("Order Placed Successfully")

})

test("API integrated End 2 End Automation", async function ({ browser }) {
    const context = await browser.newContext() // Here we can pass proxy and some other browser related details
    const page = await context.newPage()
    const wishlist = "ADIDAS ORIGINAL"
    /**Inserting the Session Token using Java script. This will bypass the login step */
    page.addInitScript(xyz => {
        window.localStorage.setItem('token', xyz)
    }, sessionToken)
    /*
    await page.goto("https://rahulshettyacademy.com/client/")
    const email = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const login = page.locator("#login")
    await email.fill(emailid)
    await password.fill("Selenium@123")
    await login.click()
    */
    const emailid = "SC@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client/") // This URL will now directly takes us to dashbord page
    
    /**Used Order API call to handle this functionality */
    /*
    const products = page.locator("div[class='card-body']")
    await page.waitForLoadState('networkidle') //wait until network comes to ideal state
    const productCount = await products.count()
    for (let i = 0; i < productCount; i++) {
        if (await products.nth(i).locator("b").textContent() === wishlist) {
            await products.nth(i).locator("button[class='btn w-10 rounded']").click()
            // await products.nth(i).locator("text= Add To Cart").click()
            break
        }
    }

    await page.locator("button[routerlink*='cart']").click()
    // Handling Sync Steps
    await page.locator("div li").first().waitFor() //Wait for elements with mentioned tags to be stable and appear
    const presence = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()
    await expect(presence).toBeTruthy()

    await page.locator("text=Checkout").click()

    //Handling Auto Suggestive Drop Down
    await page.locator("input[placeholder*='Country']").pressSequentially('in', { delay: 100 }) //Type Slower, like a user
    const countrys = page.locator("section[class='ta-results list-group ng-star-inserted']")
    await countrys.waitFor()
    const similarCountry = await countrys.locator("button").count()
    for (let i = 0; i < similarCountry; i++) {
        const country = await countrys.locator("button").nth(i).textContent()
        if (country === " India") {
            await countrys.locator("button").nth(i).click()
            break
        }
    }

    await expect(await page.locator(".user__name.mt-5 [type='text']").first()).toHaveText(emailid)
    await page.locator("a[class*='action__submit']").click()

    await expect(page.locator(".hero-primary")).toHaveText(' Thankyou for the order. ')

    //Extracting Order Id
    const orderDetails = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    const orderID = await orderDetails.split(" ")[2]
    console.log("OrderID : " + orderID)
    
    */

    /**Assignment Of validating Orders */
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click()
    await page.locator("tbody .ng-star-inserted th").first().waitFor()
    const orderCount = await page.locator("tbody .ng-star-inserted th").count()
    for (let i = 0; i < orderCount; i++) {
        if (await page.locator("tbody .ng-star-inserted th").nth(i).textContent() === orderID) {
            await page.locator("tbody .ng-star-inserted td button[class='btn btn-primary']").nth(i).click()
            break
        }
    }
    // await page.pause()
})