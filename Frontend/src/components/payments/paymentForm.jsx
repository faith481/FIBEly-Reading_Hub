import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";

const PaymentForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Create a payment intent on the server
      const { data } = await axios.post(
        "http://localhost:5000/payment/createPayment",
        { amount }, // data object
        { headers: { Authorization: `Bearer ${token}` } } // config object
      );
      const { clientSecret } = data;

      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        onError(error);
      } else if (paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent);
      }
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <div className="card-element-wrapper">
          Card details
          <CardElement />
        </div>
        <button type="submit" disabled={!stripe || loading}>
          {loading ? "Processing…" : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
