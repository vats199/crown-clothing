const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SK);

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}

app.listen(PORT, error => {
    if (error) throw error;

    console.log('Server running on port: ' + PORT);
})

app.post('/payment', async (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };
    try {
        const resp = await stripe.charges.create(body);
        console.log('hellllloooo');
        res.status(200).send({ success: resp });
    } catch (error) {
        res.status(500).send({ error: error });
    }
})