export class APiUtils {
    apiContext : any;
    loginPayLoad : any;
    constructor(apiContext : any, loginPayLoad : any) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
 
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // 200, 201
        if (!loginResponse.ok()) {
            throw new Error(`Login failed with status ${loginResponse.status()}: ${await loginResponse.text()}`);
        }
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }
 
    async createOrder(orderPayLoad : any) {
        let response : { token : string, orderId : string } = { token : '', orderId : '' };
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
 
        if (!orderResponse.ok()) {
            throw new Error(`Order creation failed with status ${orderResponse.status()}`);
        }
        
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
 
        return response;
    }
}
