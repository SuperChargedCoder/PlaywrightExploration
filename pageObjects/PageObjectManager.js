const {LoginPage} = require('./LoginPage')
const {DashboardPage} = require('./DashboardPage')
const {CartPage} = require('./CartPage')
const {CheckOutPage} = require('./CheckOutPage')
const {ConfirmationPage} = require('./ConfirmationPage')
const {OrderHistoryPage} = require('./OrderHistoryPage')

class PageObjectManager {
    /**Role of this file is to consolidate and keep the copy of all object */
    /**Inside the constructor we are declearing or initializing the objects */
    constructor(page){
        this.page = page
        this.loginpage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.checkoutPage = new CheckOutPage(this.page)
        this.confirmationPage = new ConfirmationPage(this.page)
        this.orderHistoryPage = new OrderHistoryPage(this.page)
        
    }

    getLoginPage(){
        return this.loginpage
    }

    getDashboardPage(){
        return this.dashboardPage
    }

    getCartPage(){
        return this.cartPage
    }

    getCheckOutPage(){
        return this.checkoutPage
    }

    getConfirmationPage(){
        return this.confirmationPage
    }

    getOrderHistoryPage(){
        return this.orderHistoryPage
    }

}

module.exports = { PageObjectManager }