class ConfirmationPage {
    constructor(page) {
        this.page = page
        this.confirmationMessage = page.locator(".hero-primary")
        this.placedOrderDetails = page.locator('.em-spacer-1 .ng-star-inserted')
        this.orderHistoryNevigation = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']")
    }

    async ConfirmationCheck() {
        const text =  await this.confirmationMessage.textContent()
        return text
    }

    async ExtractOrderId() {
        const orderDetails = await this.placedOrderDetails.textContent()
        const orderID = await orderDetails.split(" ")[2]
        return orderID
    }

    async NevigateToOrderHistory (){
        this.orderHistoryNevigation.click()
    }
}

module.exports = { ConfirmationPage }