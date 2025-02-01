const {test, expect} = require('@playwright/test')

/**Structure of Test Case */
test('Screenshot', async function({browser}) {
    const context = await browser.newContext() // Opening fresh browser
    const page = await context.newPage() // New page or tab opened in the browser to hit URL
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator(".displayed-class")).toBeVisible()
    //Taking partial Screenshot
    await page.locator("#hide-textbox").screenshot({path: "HideButton.png"}) //Asking to take screenshot at element lavel
    
    await page.screenshot({path: 'screenshotBeforeClick.png'})
    await page.locator("#hide-textbox").click()
    //Taking full Screenshot
    await page.screenshot({path: 'screenshotAfterClick.png'}) //Asking to take screenshot at page lavel
    await expect(page.locator(".displayed-class")).toBeHidden()

});

test.only('Visual Comparision', async function({browser}) {
    const context = await browser.newContext() // Opening fresh browser
    const page = await context.newPage() // New page or tab opened in the browser to hit URL
    await page.goto("https://www.google.com/")
    /**
     * In the first run of this test it will fail as the masterPic.png is not availabe.
     * But what it will do, it will capture the masterPic.png in first run 
     * and store in a file inside the test folder of the project.
     * From Second and onward execution it will pass
     */
    await expect(await page.screenshot()).toMatchSnapshot('masterPic.png')
    

});

test.only('Visual Comparision negative', async function({browser}) {
    const context = await browser.newContext() // Opening fresh browser
    const page = await context.newPage() // New page or tab opened in the browser to hit URL
    await page.goto("https://www.flightaware.com/")
    await expect(await page.screenshot()).toMatchSnapshot('flightawaremasterPic.png')
    

});

