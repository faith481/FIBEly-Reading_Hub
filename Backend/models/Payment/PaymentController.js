const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("./payment_schema");
const User = require("../userModel");
class PaymentController {
  static async createPayment(req, res) {
    const { amount } = req.body;
    const userId = User.userId;

    try {
      // Create a payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        metadata: { userId },
      });

      // Save the payment in your MongoDB
      const payment = new Payment({
        userId: User.userId,
        amount,
        stripePaymentIntentId: paymentIntent.id,
      });

      await payment.save();

      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
        paymentId: payment._id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  }

  static async handleWebhook(req, res) {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      await Payment.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntent.id },
        { status: "completed" }
      );

      console.log("Payment completed:", paymentIntent.id);
    }

    res.status(200).send({ received: true });
  }
}

module.exports = PaymentController;
