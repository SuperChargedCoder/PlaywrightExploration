class CheckOutPage {
    constructor(page) {
        this.page = page
        this.countryTextBox = page.locator("input[placeholder*='Country']")
        this.countrys = page.locator("section[class='ta-results list-group ng-star-inserted']")
        this.placeOrder = page.locator("a[class*='action__submit']")
    }


    async SelectNation(nation) {
        await this.countryTextBox.pressSequentially('in', { delay: 100 }) //Type Slower, like a user
        await this.countrys.waitFor()
        const similarCountry = await this.countrys.locator("button").count()
        for (let i = 0; i < similarCountry; i++) {
            const country = await this.countrys.locator("button").nth(i).textContent()
            if (country === nation) {
                await this.countrys.locator("button").nth(i).click()
                break
            }
        }
    }

    async PlaceOrder(){
        await this.placeOrder.click()
    }

}

module.exports = { CheckOutPage }