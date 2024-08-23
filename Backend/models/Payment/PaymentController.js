const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('./payment_schema');
const User = require('../userModel');
const OrderService = require('./orderControll');

const validPaymentMethodTypes = [
    'card', 'bank_transfer', 'alipay', 'wechat_pay', 'ideal',
    'sepa_debit', 'giropay', 'eps', 'bancontact', 'sofort', 'p24',
    'klarna', 'afterpay_clearpay'
];


class PaymentController {
    static async createPayment(req, res) {
        const { userId, cartId, orderId, paymentMethodTypes } = req.body;
    
        try {
            // Validate required fields
            if (!userId) {
                return res.status(400).send({ message: 'userId is required' });
            }
            if (!cartId) {
                return res.status(400).send({ message: 'cartId is required' });
            }
            if (
                !Array.isArray(paymentMethodTypes) ||
                paymentMethodTypes.length === 0 ||
                !paymentMethodTypes.every(type => validPaymentMethodTypes.includes(type))
              ) {
                return res.status(400).send({ message: 'Invalid payment method type(s) provided' });
              }
    
            // Fetch the order details using the orderId
            const order = await OrderService.getOrderDetails(orderId);
    
            // If the order is not found, return an error
            if (!order) {
                return res.status(404).send({ message: 'Order not found' });
            }
    
            // Create a payment intent with Stripe, specifying payment method types
            const paymentIntent = await stripe.paymentIntents.create({
                amount: order.totalPrice * 100,
                currency: 'usd',
                payment_method_types: paymentMethodTypes,
                metadata: { userId, cartId },
            });
    
            // Save the payment in MongoDB
            const payment = new Payment({
                userId,
                cartId,
                Books: order.books,
                AmountPaid: order.totalPrice,
                stripePaymentIntentId: paymentIntent.id,
                orderId: order._id,
            });
    
            await payment.save();
    
            res.status(200).send({
                clientSecret: paymentIntent.client_secret,
                paymentId: payment._id,
                orderDetails: order,
            });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    

    static async handleWebhook(req, res) {
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle the event
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;

            await Payment.findOneAndUpdate(
                { stripePaymentIntentId: paymentIntent.id },
                { status: 'completed' }
            );

            console.log('Payment completed:', paymentIntent.id);
        }

        res.status(200).send({ received: true });
    }
}

module.exports = PaymentController;