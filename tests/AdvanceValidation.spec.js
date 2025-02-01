const { test, expect } = require('@playwright/test')

test("@Three Handling Hidden Element", async function ({page}){
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator(".displayed-class")).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator(".displayed-class")).toBeHidden()
    await page.goto("https://www.google.com")
    await page.goto("https://www.flipkart.com/")
    await page.goBack()
    await page.goForward()
})

test("@One Handling Java Alerts", async function ({page}){
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    page.on('dialog', dialog => dialog.accept())
    await page.locator("#confirmbtn").click()
    await page.locator("#mousehover").hover()
})

test("@Two Handling Frames", async function ({page}){
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    const framespage = page.frameLocator("#courses-iframe")
    await framespage.locator("li a[href*='lifetime-access']:visible").click()
    const testcheck = await framespage.locator(".text h2").textContent()
    console.log(testcheck.split(" ")[1])
})
