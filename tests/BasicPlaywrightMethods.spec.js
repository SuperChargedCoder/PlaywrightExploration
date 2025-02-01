/**Import annotation from praywright module */
const {test, expect} = require('@playwright/test')

/**Structure of Test Case */
test('Verify Login Page Error Handling', async function({browser}) {
    const context = await browser.newContext() // Opening fresh browser
    const page = await context.newPage() // New page or tab opened in the browser to hit URL
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const passwordLocator = page.locator("#password")
    const signInButton = page.locator("#signInBtn")
    const pageTitle = await page.title()
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    /**Handling Functionality Using CSS locator */
    await page.locator("#username").fill("rahulshettyacademy")
    await passwordLocator.fill("WrongPassword")
    await signInButton.click()
    const loginError = await page.locator("div[style*='block']").textContent()
    console.log(loginError)
    await expect(page.locator("div[style*='block']")).toHaveText("Incorrect username/password.")
    await passwordLocator.fill("")
    await passwordLocator.fill("learning")
    await signInButton.click()
    console.log(await page.locator(".card-title a").nth(1).textContent())
    console.log(await page.locator(".card-title a").first().textContent())
    console.log(await page.locator(".card-title a").last().textContent())
    const productList = await page.locator(".card-title a").allTextContents()
    console.log(productList)
});

test('Verify Google Page Title', async ({browser, page})=> {
    await page.goto("https://www.google.com/")
    const pageTitle = await page.title()
    console.log(pageTitle)
    await expect(page).toHaveTitle("Google")
})
