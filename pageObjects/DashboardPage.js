class DashboardPage {
    constructor(page) {
        this.page = page
        this.products = page.locator("div[class='card-body']")
        this.cart = page.locator("button[routerlink*='cart']")
    }

    async AddToCart(wishlist) {
        const productCount = await this.products.count()
        for (let i = 0; i < productCount; i++) {
            if (await this.products.nth(i).locator("b").textContent() === wishlist) {
                await this.products.nth(i).locator("button[class='btn w-10 rounded']").click()
                // await this.products.nth(i).locator("text= Add To Cart").click()
                break
            }
        }
    }

    async NevigateToCartPage (){
        await this.cart.click()
    }
}

module.exports = { DashboardPage }