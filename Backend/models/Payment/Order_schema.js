const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
}],
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price must be a positive number'],
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'canceled'], // Example statuses, you can modify this list
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;