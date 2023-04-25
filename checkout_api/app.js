const cors = require('cors')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()

const Encryption = require('./encryption')

const port = 3001;

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.post('/checkout-encryption', (req,res)=>{
    const algorithm = "aes-256-cbc";
    const requestBody = req.body;
    const accessKey = process.env.ACCESS_KEY;
    const countryCode = req.body.countryCode;

    const encryptedParams = new Encryption(process.env.IV_KEY, process.env.SECRET_KEY, algorithm)
    const directCardEncryption = new Encryption(process.env.IV_KEY, process.env.SECRET_KEY, algorithm);
    const cardPayload = {
        card: {
            nameOnCard: "John Doe",
            number: "5123450000000008",
            cvv: "100",
            expiry: {
                month: "12",
                year: "23"
            }
        }
    };
    const directCard = directCardEncryption.encrypt(JSON.stringify(cardPayload))

    const payload = JSON
        .stringify(requestBody)
        .replace(/\//g, '\\/');

    const encryptedPayload = encryptedParams.encrypt(payload);
    const modalUrl = `https://developer.tingg.africa/checkout/v2/modal/?params=${encryptedPayload}&accessKey=${accessKey}&countryCode=${countryCode}`

    res.json({
        params: encryptedPayload,
        directCard,
        accessKey,
        countryCode: countryCode,
        modalUrl
    });

})

app.post("/tingg-webhook", (req,res)=>{
    console.log('-------TINGG CALLBACK---------')
    console.log(req.body)
    const data = req.body;

    console.log("Acknowledging.....");

    return res.send({
        checkout_request_id: data.checkout_request_id,
        merchant_transaction_id: data.merchant_transaction_id,
        status_code: "183",
        status_description: "Payment processed successfully",
        receipt_number: data.account_number
    });
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})
