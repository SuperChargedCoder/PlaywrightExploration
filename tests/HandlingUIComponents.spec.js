const {test, expect} = require('@playwright/test')

test('Handling UI component', async function({page}) {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const passwordLocator = page.locator("#password")
    const signInButton = page.locator("#signInBtn")
    await page.locator("#username").fill("rahulshettyacademy")
    await passwordLocator.fill("learning")
    const dropDown = page.locator("select[class='form-control']")
    await dropDown.selectOption("consult")
    await page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click()
    await expect(page.locator(".radiotextsty").last()).toBeChecked() //Pass or Fail the script
    console.log(await page.locator(".radiotextsty").last().isChecked()) //Return true or false
    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()
    await page.locator("#terms").uncheck()
    console.log(await page.locator("#terms").isChecked())
    expect(await page.locator("#terms").isChecked()).toBeFalsy()
    
    const locator = page.locator("a[href*='documents-request']")
    await expect(locator).toHaveAttribute("class", "blinkingText")
    // await page.pause() //This will pause the execution before closing test & it will open playwright inspector to debug code
})