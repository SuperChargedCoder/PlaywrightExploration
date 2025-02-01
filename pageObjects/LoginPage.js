class LoginPage {

    constructor(page){
        this.page = page //Initializing the page for local class
        this.signInButton = page.locator("#login")
        this.emailIdTextBox = page.locator("#userEmail")
        this.passwordTextBox = page.locator("#userPassword")
    }

    /**Re-usable function to login */
    async LoginAction(username, password){
        await this.emailIdTextBox.fill(username)
        await this.passwordTextBox.fill(password)
        await this.signInButton.click()
        await this.page.waitForLoadState('networkidle') //wait until network comes to ideal state
    }

    async LoginPage (){
        await this.page.goto("https://rahulshettyacademy.com/client/")
    }
}
//To make this class exposed to framework or public
module.exports = { LoginPage }