const { Before, BeforeAll, BeforeStep, After, AfterAll, AfterStep, Status } = require('@cucumber/cucumber')
const playwright = require('@playwright/test')
const { PageObjectManager } = require('../../pageObjects/PageObjectManager')
const path = require('path')

Before( async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    })
    const context = await browser.newContext()
    this.page = await context.newPage()
    this.pom = new PageObjectManager(this.page)
})

After(function(){
    console.log("After Hooks Step print statement")
})

AfterStep(async function({result}){
    if(result.status === Status.FAILED){
        await this.page.screenshot({path: 'FailedCucumberScreenShot.png'})
    }
})