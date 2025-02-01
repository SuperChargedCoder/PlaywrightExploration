class CartPage {
    constructor(page) {
        this.page = page
        this.cartItems = page.locator("div li")
        this.checkOutButton = page.locator("text=Checkout")
    }

    async CheckOut() {
        await this.checkOutButton.click()
    }

    async CartSearch(needfull) {
        await this.cartItems.first().waitFor() //Wait for elements with mentioned tags to be stable and appear
        const presence = await this.page.locator("h3:has-text('"+needfull+"')").isVisible()
        // await expect(presence).toBeTruthy()
        console.log(presence)
        return presence
    }

}
module.exports = { CartPage }