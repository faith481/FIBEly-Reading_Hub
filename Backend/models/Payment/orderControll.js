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
    //await cart.save();

    return order;
  }

  static async calculateTotalPrice(books) {
    let totalPrice = 0;
    for (const book of books) {
      totalPrice += book.price;
    }
    return totalPrice;
  }

  static async getOrderDetails(orderId) {
    try {
      // Find the order by ID and populate necessary fields
      const order = await Order.findById(orderId)
        .populate({
          path: 'cartId',
          select: '-books'
        })
        .populate('books', 'title price')
        .exec();
  
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

  static async updateOrderStatus(orderId, status) {
    try {
      // Validate status input
      const validStatuses = ['pending', 'processing', 'completed', 'canceled'];
      if (!validStatuses.includes(status)) {
        throw new Error('Invalid status value');
      }

      // Update the order status
      const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

      // If no order found, throw an error
      if (!order) {
        throw new Error('Order not found');
      }

      // Return the updated order
      return order;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Internal Server Error');
    }
  }

  // Method to cancel an order
  static async cancelOrder(orderId) {
    try {
      // Find and delete the order
      const order = await Order.findByIdAndDelete(orderId);

      // If no order found, throw an error
      if (!order) {
        throw new Error('Order not found');
      }

      // Return a confirmation message
      return { message: 'Order canceled successfully' };
    } catch (error) {
      console.error('Error canceling order:', error);
      throw new Error('Internal Server Error');
    }
  }
}

module.exports = OrderService;
