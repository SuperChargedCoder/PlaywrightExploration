const { test, expect, request } = require('@playwright/test')
const { APIUtils } = require('../utils/APIUtils')
const { count } = require('console')
const loginPayload = { userEmail: "SC@gmail.com", userPassword: "Selenium@123" } //Payload as Java Script Object
let response
const orderPayload = { orders: [{ country: "India", productOrderedId: "6581ca979fd99c85e8ee7faf" }] } //Remove "" for keys
const fakePayLoadOrders = { data: [], message: "No Orders" }
/**At run time this java script object converted to JSON */


test.beforeAll(async function () {
    const apiContext = await request.newContext() // Here we can pass proxy and some other browser related details 
    const apiUtils = new APIUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(orderPayload)
})

test("Intercepting API @ End 2 End Automation", async function ({ browser }) {
    const context = await browser.newContext() // Here we can pass proxy and some other browser related details
    const page = await context.newPage()
    const wishlist = "ADIDAS ORIGINAL"

    /**Inserting the Session Token using Java script. This will bypass the login step */
    page.addInitScript(xyz => {
        window.localStorage.setItem('token', xyz)
    }, response.sessionToken)

    const emailid = "SC@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client/") // This URL will now directly takes us to dashbord page
    //Before clicking on myorder link, we are intercepting the response
    //intercepting response -APi response-> {Intercepting point - playwright fakeresponse}->browser->render data on front end
    /**
     * await page.route("what link you want to route", Function about how you want to route ?)
     */
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //page.request will turn the page into API mode show that it can intercept the API
            const response = await page.request.fetch(route.request())
            //Here we have got the response
            let body = JSON.stringify(fakePayLoadOrders) // Converting java script object to JSON object
            //updating the response with fakePayLoadOrders
            route.fulfill(
                {
                    response,
                    body,
                })
        })

    /**------------------------------------ */
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent())
    await page.pause()
})


