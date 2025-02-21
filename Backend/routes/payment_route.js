const express = require("express");
const PaymentController = require("../models/Payment/PaymentController");
const paymentRouter = express.Router();

paymentRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.handleWebhook
);
paymentRouter.post(
  "/createPayment",
  express.raw({ type: "application/json" }),
  PaymentController.createPayment
);

module.exports = paymentRouter;
