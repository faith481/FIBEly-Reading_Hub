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

orderRouter.get('/order/:id', async (req, res) => {
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

module.exports = orderRouter;
