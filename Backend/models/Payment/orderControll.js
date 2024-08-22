const Order = require('./Order_schema');
const User = require('../userModel');
const Cart = require('../cartModel');
//const Payment = require('./models/payment');
const Book = require('../booksModel');

class OrderService {
  static async createOrder(userId) {
    // Find the user's cart
    let cart = await Cart.findOne({ user: userId }).populate('books');
    if (!cart || cart.books.length === 0) {
      throw new Error('Cart is empty or not found');
    }

    // Calculate the total price of the books in the cart
    const totalPrice = await this.calculateTotalPrice(cart.books);

    // Create a new order
    const order = new Order({
      userId,
      cartId: cart._id,
      books: cart.books.map(book => book._id),
      totalPrice,
      status: 'pending',
    });

    await order.save();

    // Optionally, create a payment record
    // await this.createPayment(order);

    // Clear the cart after creating the order
    //cart.books = [];
    await cart.save();

    return order;
  }

  static async calculateTotalPrice(books) {
    let totalPrice = 0;
    for (const book of books) {
      totalPrice += book.price;
    }
    return totalPrice;
  }

  async getOrderDetails(orderId) {
    try {
      // Find the order by ID and populate if needed
      const order = await Order.findById(orderId).populate('cartId');

      // If no order found, throw an error
      if (!order) {
        throw new Error('Order not found');
      }

      // Return the order details
      return order;
    } catch (error) {
      console.error('Error retrieving order details:', error);
      throw new Error('Internal Server Error');
    }
  }
}

module.exports = OrderService;
