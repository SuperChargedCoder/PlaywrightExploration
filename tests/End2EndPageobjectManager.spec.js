const { test, expect } = require('@playwright/test')
const { customTest } = require('../testData/TestDataAsFixture')
const { count } = require('console')
const automationTestDatas = JSON.parse(JSON.stringify(require('../testData/End2EndAutomationTestData.json')))

const { PageObjectManager } = require('../pageObjects/PageObjectManager')

// test.describe.configure({mode: 'parallel'})


for (const automationTestData of automationTestDatas) {
    test(`End 2 End Automation for ${automationTestData.wishlist}`, async function ({ browser }) {
        const context = await browser.newContext()
        const page = await context.newPage()
        const pom = new PageObjectManager(page)
        const loginpage = pom.getLoginPage()
        await loginpage.LoginPage() //Landing on login page
        await loginpage.LoginAction(automationTestData.emailid, automationTestData.password) //Making login action
        const dashboard = pom.getDashboardPage()
        await dashboard.AddToCart(automationTestData.wishlist)
        await dashboard.NevigateToCartPage()
        const cart = pom.getCartPage()
        await expect(await cart.CartSearch(automationTestData.wishlist)).toBeTruthy()
        await cart.CheckOut()
        const checkOut = pom.getCheckOutPage()
        await checkOut.SelectNation(automationTestData.nation)
        await checkOut.PlaceOrder()
        const confirmation = pom.getConfirmationPage()
        await expect(await confirmation.ConfirmationCheck()).toEqual(automationTestData.orderConfirmationText)
        const orderID = await confirmation.ExtractOrderId()
        await confirmation.NevigateToOrderHistory()
        const orderHistory = pom.getOrderHistoryPage()
        await orderHistory.ViewOrderDetails(orderID)
    })
}

customTest("Getting Test Data From Fixture", async function ({ page , testdataAsFixture}) {
    const pom = new PageObjectManager(page)
    const loginpage = pom.getLoginPage()
    await loginpage.LoginPage() //Landing on login page
    await loginpage.LoginAction(testdataAsFixture.emailid, testdataAsFixture.password) //Making login action
    const dashboard = pom.getDashboardPage()
    await dashboard.AddToCart(testdataAsFixture.wishlist)
    await dashboard.NevigateToCartPage()
    const cart = pom.getCartPage()
    await expect(await cart.CartSearch(testdataAsFixture.wishlist)).toBeTruthy()
    await cart.CheckOut()
    const checkOut = pom.getCheckOutPage()
    await checkOut.SelectNation(testdataAsFixture.nation)
    await checkOut.PlaceOrder()
})