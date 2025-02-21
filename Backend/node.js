const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-secret-key-here');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
    const token = req.body.stripeToken;
    const charge = await stripe.charges.create({
        amount: 999, // Amount in cents, $9.99
        currency: 'usd',
        description: 'E-Book Purchase',
        source: token,
    });

    if (charge.status === 'succeeded') {
        res.send('Payment successful');
    } else {
        res.send('Payment failed');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

