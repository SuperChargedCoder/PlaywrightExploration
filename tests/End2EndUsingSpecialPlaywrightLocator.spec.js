const {test, expect} = require('@playwright/test')
const { count } = require('console')

test("Script Optimization using playwright special locator", async function({page}){
    await page.goto("https://rahulshettyacademy.com/client/")
    const wishlist = "BIKE"
    const emailid = "SC@gmail.com"
    const password = "Selenium@123"
    await page.getByPlaceholder("email@example.com").fill(emailid)
    await page.getByPlaceholder("enter your passsword").fill(password)
    await page.getByRole("button", {name: 'Login'}).click()
    await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor()
    await page.locator("div[class='card']").filter({hasText: wishlist}).getByRole("button", {name: ' Add To Cart'}).click()
    await page.getByRole("listitem").getByRole("button", {name: '  Cart '}).click()
    await page.locator("div li").first().waitFor()
    await expect(await page.locator(".cartSection").getByText(wishlist).isVisible()).toBeTruthy()
    await page.getByRole("button", {name: 'Checkout'}).click()
    await page.getByPlaceholder("Select Country").pressSequentially('in', {delay: 100})
    const countrys = page.locator("section[class='ta-results list-group ng-star-inserted']")
    await countrys.waitFor()
    await page.getByRole("button", {name: ' India'}).nth(1).click()
    await page.getByText("Place Order ").click()
    await expect(page.getByText("Thankyou for the order.")).toBeVisible()
})