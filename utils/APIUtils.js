class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            })

        /**Validating the API response & handling JOSN response body*/
        // await expect(loginResponse.ok()).toBeTruthy()
        const loginResponseBody = await loginResponse.json()
        const sessionToken = loginResponseBody.token
        console.log("SessionToken : " + sessionToken)
        return sessionToken
    }

    async createOrder(orderPayload) {
        let response = {}
        response.sessionToken = await this.getToken()
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                'authorization': response.sessionToken,
                'content-type': 'application/json'
            },
        })
        /**Validating the API response & handling JOSN response body*/
        // await expect(orderResponse.ok()).toBeTruthy()
        const orderResponseBody = await orderResponse.json()
        const orderID = orderResponseBody.orders[0]
        response.orderID = orderID
        return response
    }
}
module.exports = { APIUtils }