const User = require('../models/userModel');
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'User.cart', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    stripePaymentIntentId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;