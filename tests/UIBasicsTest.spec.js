/**Import annotation from praywright module */
const {test, expect} = require('@playwright/test')

/**Structure of Test Case */
test ('Browser context & page Playwright Test', async function({browser}) {
    const context = await browser.newContext() // Opening fresh browser
    const page = await context.newPage() // New page or tab opened in the browser to hit URL
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const pageTitle = await page.title()
    console.log(pageTitle)
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
});

test('Using Playwright Fixtures', async ({browser, page})=> {
    await page.goto("https://www.google.com/")
    const pageTitle = await page.title()
    console.log(pageTitle)
    await expect(page).toHaveTitle("Google")
})
