const API_URL = "http://localhost:3001/checkout-encryption"

const checkoutType = 'modal';


const payload = {
    merchantTransactionID: "bcd23ertr21sddf1233",
    customerFirstName: "John",
    customerLastName: "Doe",
    MSISDN: "+254702663063",
    customerEmail: "john.doe@example.com",
    requestAmount: "100",
    currencyCode: "KES",
    accountNumber: "1009201r9",
    serviceCode: "TURDEV2553",
    dueDate: "2022-07-20 20:00:05",
    requestDescription: "Dummy merchant transaction",
    countryCode: "KE",
    languageCode: "en",
    successRedirectUrl: "http://localhost:3001",
    failRedirectUrl: "http://localhost:3001",
    paymentWebhookUrl: "https://short-beans-stand-197-254-49-158.loca.lt/tingg-webhook",
    pendingRedirectUrl: "https://developer.tingg.africa/checkout-staging/v2/testers/default/TestSandboxRedirect.php",
};

fetch(
    API_URL,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: 'cors'
    }).then(res =>res.json())
    .then(res=>{
        Tingg.renderPayButton({
            className: 'my-button',
            text: 'Proceed to Checkout',
            color: 'purple',
            checkoutOptions: {
                checkoutType,
                merchantProperties: res
                // test: false
            }

        });
    })
    .catch(e=>{
        console.log(e)
    })

