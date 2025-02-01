const {test, expect} = require('@playwright/test')
const { count } = require('console')
let customWebContext


test.beforeAll(async function ({browser}){
    const context = await browser.newContext()
    const page = await context.newPage()
    const emailid = "SC@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client/")
    const email = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const login = page.locator("#login")
    await email.fill(emailid)
    await password.fill("Selenium@123")
    await login.click()
    await page.waitForLoadState('networkidle')
    await context.storageState({path: 'state.json'}) //Capturing all the Storages, Cookies & Tokens into a JSON file
    /**Now invoking a fresh browser with this state.json file */
    customWebContext = await browser.newContext({storageState: 'state.json'}) // This new browser have all the session details

})

test("End 2 End Automation", async function(){
    // const context = await browser.newContext()
    const page = await customWebContext.newPage() // Creating new page in custom browser having all the session details
    await page.goto("https://rahulshettyacademy.com/client/")
    const products = page.locator("div[class='card-body']")
    const wishlist = "ADIDAS ORIGINAL"
    const emailid = "SC@gmail.com"
    // const email = page.locator("#userEmail")
    // const password = page.locator("#userPassword")
    // const login = page.locator("#login")
    // await email.fill(emailid)
    // await password.fill("Selenium@123")
    // await login.click()
    await page.waitForLoadState('networkidle') //wait until network comes to ideal state
    const productCount = await products.count()
    for(let i = 0; i< productCount; i++){
        if(await products.nth(i).locator("b").textContent() === wishlist){
            await products.nth(i).locator("button[class='btn w-10 rounded']").click()
            // await products.nth(i).locator("text= Add To Cart").click()
            break
        }
    }

    await page.locator("button[routerlink*='cart']").click()
    /**Handling Sync Steps */
    await page.locator("div li").first().waitFor() //Wait for elements with mentioned tags to be stable and appear
    const presence = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()
    await expect(presence).toBeTruthy()

    await page.locator("text=Checkout").click()
    
    /**Handling Auto Suggestive Drop Down */
    await page.locator("input[placeholder*='Country']").pressSequentially('in', {delay: 100}) //Type Slower, like a user
    const countrys = page.locator("section[class='ta-results list-group ng-star-inserted']")
    await countrys.waitFor()
    const similarCountry = await countrys.locator("button").count()
    for(let i = 0; i < similarCountry; i++){
        const country = await countrys.locator("button").nth(i).textContent()
        if(country === " India"){
            await countrys.locator("button").nth(i).click()
            break
        }
    }

    await expect(await page.locator(".user__name.mt-5 [type='text']").first()).toHaveText(emailid)
    await page.locator("a[class*='action__submit']").click()

    await expect(page.locator(".hero-primary")).toHaveText(' Thankyou for the order. ')

    /**Extracting Order Id */
    const orderDetails = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    const orderID = await orderDetails.split(" ")[2]
    console.log(orderID)

    /**Assignment Of validating Orders */
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click()
    await page.locator("tbody .ng-star-inserted th").first().waitFor()
    const orderCount = await page.locator("tbody .ng-star-inserted th").count()
    for(let i = 0; i < orderCount; i++){
        if(await page.locator("tbody .ng-star-inserted th").nth(i).textContent()===orderID){
            await page.locator("tbody .ng-star-inserted td button[class='btn btn-primary']").nth(i).click()
            break
        }
    }
    // await page.pause()
})