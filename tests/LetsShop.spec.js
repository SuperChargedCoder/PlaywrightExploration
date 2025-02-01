const {test, expect} = require('@playwright/test')

test("Get list of available products", async function({browser}){
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")
    const email = page.locator("#userEmail")
    const password = page.locator("#userPassword")
    const login = page.locator("#login")
    await email.fill("SC@gmail.com")
    await password.fill("Selenium@123")
    await login.click()
    await page.waitForLoadState('networkidle') //until network comes to ideal state
    await page.locator("div[class='card-body'] b").last().waitFor()
    const productList = await page.locator("div[class='card-body'] b").allTextContents()
    console.log(productList)
    console.log(await page.locator("div[class='card-body'] b").first().textContent())
    console.log(productList)
})