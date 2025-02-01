const {test, expect} = require('@playwright/test')

test("How to use playwright special locator ?", async function({browser, page}){
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    /**GetByLabel are mainly helpfull in case of selection like checkbox, radio button, dropdown */
    await page.getByLabel("Check me out if you Love IceCreams!").click() // Use to select element with label tag
    await page.getByLabel("Employed").click()
    // await page.getByLabel("Password").fill("RandomPassword")
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder("Password").fill("RandomPassword") // Use if element have placeholder attribute
    await page.getByRole("button", {name: 'Submit'}).click() // Its format is like Role of that element and its associated name
    const successMessage = await page.getByText("Success! The Form has been submitted successfully!.").textContent()
    console.log(successMessage)
    
    await page.getByRole("link", {name: 'Shop'}).click()

    /**Filter Concept, restricting the search area */
    //page.locator("app-card").filter({hasText: 'Nokia Edge'}) -> This much will just filter the blocks with have text 'Nokia Edge'. Further we can apply filter or chaining to get to specific element
    //{hasText: 'Nokia Edge'} this will apply filter with getbyText concept
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button", {name: 'Add'}).click() //This is chainning concept
    await page.pause()
})