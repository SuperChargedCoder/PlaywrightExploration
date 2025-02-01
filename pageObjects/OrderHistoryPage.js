class OrderHistoryPage {
    constructor(page) {
        this.page = page
        this.orders = page.locator("tbody .ng-star-inserted th")
    }

    async ViewOrderDetails(orderID) {
        await this.orders.first().waitFor()
        const orderCount = await this.orders.count()
        for (let i = 0; i < orderCount; i++) {
            if (await this.orders.nth(i).textContent() === orderID) {
                await this.page.locator("tbody .ng-star-inserted td button[class='btn btn-primary']").nth(i).click()
                break
            }
        }
    }
}
module.exports = { OrderHistoryPage }