const {test, expect} = require('@playwright/test')

test("Child Window Handling", async function({browser}){
    const context = await browser.newContext() // Opening fresh browser
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const blinkingText = page.locator("a[href*='documents-request']")
    const [newpage] = await Promise.all([context.waitForEvent("page"), blinkingText.click()])
    const redText = await newpage.locator(".red").textContent()
    const domain = await redText.split("@")[1].split(" ")[0]
    console.log(domain)
    await page.locator("#username").fill(domain)
    await page.pause()
    console.log(await page.locator("#username").textContent())
})
