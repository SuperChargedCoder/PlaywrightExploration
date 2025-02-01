const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

const { PageObjectManager } = require('../../pageObjects/PageObjectManager')
const { expect } = require('@playwright/test')
const playwright = require('@playwright/test')


Given('I am logged into the application with email {string} and password {string}', { timeout: 50 * 1000 }, async function (username, passkey) {
    const loginpage = this.pom.getLoginPage()
    await loginpage.LoginPage() //Landing on login page
    await loginpage.LoginAction(username, passkey)
});


When('I search for a product and add to cart {string}', async function (wishlist) {
    this.dashboard = this.pom.getDashboardPage()
    await this.dashboard.AddToCart(wishlist)
});


When('I navigate to the cart page', async function () {
    await this.dashboard.NevigateToCartPage()
});

When('I verify {string} click on the checkout button', async function (wishlist) {
    const cart = this.pom.getCartPage()
    await expect(await cart.CartSearch(wishlist)).toBeTruthy()
    await cart.CheckOut()
});

When('I select the country {string}', async function (nation) {
    this.checkOut = this.pom.getCheckOutPage()
    await this.checkOut.SelectNation(' India')
});


When('I click on the place order button', { timeout: 50 * 1000 }, async function () {
    await this.checkOut.PlaceOrder()
});


Then('I should get the order ID', async function () {
    this.confirmation = this.pom.getConfirmationPage()
    this.orderID = await this.confirmation.ExtractOrderId()
});


Then('I verify the order ID on the order page', async function () {
    await this.confirmation.NevigateToOrderHistory()
    const orderHistory = this.pom.getOrderHistoryPage()
    await orderHistory.ViewOrderDetails(this.orderID)
});

Then('Error Message {string} Should be displayed', async function (message) {
    const textMessage = await this.page.locator("//div[@aria-label='Incorrect email or password.']").textContent()
    await expect(textMessage).toEqual(message)
});















