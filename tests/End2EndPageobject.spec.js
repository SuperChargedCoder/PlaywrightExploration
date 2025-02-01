const {test, expect} = require('@playwright/test')
const { count } = require('console')
/** Declearing from where LoginPage is comming 
 * ./ -> for same folder
 * ../ -> for outside of folder
*/
const {LoginPage} = require('../pageObjects/LoginPage') 
const {DashboardPage} = require('../pageObjects/DashboardPage')
const {CartPage} = require('../pageObjects/CartPage') 
const {CheckOutPage} = require('../pageObjects/CheckOutPage')
const {ConfirmationPage} = require('../pageObjects/ConfirmationPage')
const {OrderHistoryPage} = require('../pageObjects/OrderHistoryPage')

test("End 2 End Automation", async function({browser}){
    const context = await browser.newContext()
    const page = await context.newPage()
    const wishlist = "ADIDAS ORIGINAL"
    const emailid = "SC@gmail.com"
    const password = "Selenium@123"
    const nation = " India"
    const orderConfirmationText = " Thankyou for the order. "
    const loginpage = new LoginPage(page)
    await loginpage.LoginPage() //Landing on login page
    await loginpage.LoginAction(emailid, password) //Making login action
    const dashboard = new DashboardPage(page)
    await dashboard.AddToCart(wishlist)
    await dashboard.NevigateToCartPage()
    const cart = new CartPage(page)
    await expect(await cart.CartSearch(wishlist)).toBeTruthy()
    await cart.CheckOut()
    const checkOut = new CheckOutPage(page)
    await checkOut.SelectNation(nation)
    await checkOut.PlaceOrder()
    const confirmation = new ConfirmationPage(page)
    // await expect(await confirmation.ConfirmationCheck()).toHaveText(orderConfirmationText)
    await expect(await confirmation.ConfirmationCheck()).toEqual(orderConfirmationText)
    const orderID = await confirmation.ExtractOrderId()
    await confirmation.NevigateToOrderHistory()
    const orderHistory = new OrderHistoryPage(page)
    await orderHistory.ViewOrderDetails(orderID)
})