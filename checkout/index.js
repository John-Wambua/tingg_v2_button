const API_URL = "http://localhost:3001/checkout-encryption"

const checkoutType = 'redirect';

const d = new Date,
    dFormat = [d.getFullYear(),
            d.getMonth()+1,
            d.getDate(),
            ].join('-')+' '+
        [d.getHours()-1,
            d.getMinutes(),
            d.getSeconds()].join(':');

const payload = {
    merchantTransactionID: (Math.random() + 1).toString(36).substring(2),
    customerFirstName: "John",
    customerLastName: "Doe",
    MSISDN: "+254700000000",
    customerEmail: "john.doe@example.com",
    requestAmount: "100",
    currencyCode: "KES",
    accountNumber: (Math.random() + 1).toString(36).substring(4),
    serviceCode: "PILDEV2090",
    dueDate: dFormat,
    requestDescription: "Dummy merchant transaction",
    countryCode: "KE",
    languageCode: "en",
    successRedirectUrl: "https://developer.tingg.africa/checkout-staging/v2/testers/default/TestSandboxRedirect.php",
    failRedirectUrl: "https://developer.tingg.africa/checkout-staging/v2/testers/default/TestSandboxRedirect.php",
    paymentWebhookUrl: "https://short-beans-stand-197-254-49-158.loca.lt/tingg-webhook",
    pendingRedirectUrl: "https://developer.tingg.africa/checkout-staging/v2/testers/default/TestSandboxRedirect.php",
};

// Render the checkout button
Tingg.renderPayButton({
    className: 'my-button',
    text: 'Proceed to Checkout',
    color: 'purple',
})

//Redirect on button click
document.querySelector('.my-button').addEventListener('click', fetchRedirectData);

function fetchRedirectData() {
    return fetch(
        API_URL,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            mode: 'cors'
        }).then(res => res.json())
        .then(res => {
            Tingg.renderCheckout({
                checkoutType,
                merchantProperties: res,
                // test: false
            });
        })
        .catch(e => {
            console.log(e)
        })
}
