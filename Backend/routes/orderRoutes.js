const express = require('express');
const orderRouter = express.Router();
const authenticateJWT = require('../middleware/middleAuth');
const OrderService = require('../models/Payment/orderControll');

orderRouter.post('/createOrder', async (req, res) => {
  try {
    const userId = req.user.userId;

    // Create a new order
    const order = await OrderService.createOrder(userId);

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

orderRouter.get('/orderDetails/:id', async (req, res) => {
    try {
      const orderId = req.params.id;
  
      // Fetch the order by ID getOrderDetails
      const order = await OrderService.getOrderDetails(orderId);
  
      res.status(200).json({ order });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });

  orderRouter.patch('/updateOrderStatus/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      if (!status || !orderId) {
        return res.status(400).json({ message: 'Invalid status value, or orderId' });
      }
  
      // Use the OrderService to update the status
      const order = await OrderService.updateOrderStatus(orderId, status);
  
      // Return the updated order
      res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // route to cancel order
  orderRouter.delete('/CancelOrder/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
  
      // Use the OrderService to cancel the order
      const result = await OrderService.cancelOrder(orderId);
  
      // Return a confirmation message
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = orderRouter;
