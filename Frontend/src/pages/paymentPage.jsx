import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/payments/paymentForm";
import axios from "axios";
import "./CSS/paymentPage.css";

const stripePromise = loadStripe(
  "pk_test_51PrqlEFFiMfQ2Frs1hYTODNNUs58vhZ2VE5FjIlWbD5mjw43tSkSq4JmqrsxKhusEkCilTCZTvMvfnfa7jXSQSQ600WWvx8NS2"
);

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleSuccess = async (paymentIntent) => {
    setPaymentStatus(
      "Payment successful! Your payment of $" +
        5000 / 100 +
        " has been processed."
    );
    console.log("Payment successful:", paymentIntent);

    // Send payment details to your backend
    const token = localStorage.getItem("token");
    const amount = 5000; // Replace with the actual amount

    try {
      const response = await axios.post(
        "http://localhost:5000/payment/createPayment",
        {
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Payment created:", response.data);
      setNotification({ message: "Payment successful!", type: "success" });
    } catch (err) {
      console.error("Error creating payment:", err);
      setError(err.message);
      setNotification({ message: "Payment failed!", type: "error" });
    }
  };

  const handleError = (error) => {
    setPaymentStatus("Payment failed.");
    setError(error.message);
    console.error("Payment error:", error);
    setNotification({ message: "Payment failed!", type: "error" });
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000); // Remove the notification after 5 seconds
    }
  }, [notification]);

  return (
    <div className="payment-page">
      <h1>Payment</h1>
      <div className="stripe-container">
        <Elements stripe={stripePromise}>
          <PaymentForm
            amount={5000}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </Elements>
      </div>
      {notification && (
        <div
          className={`notification ${notification.type}`}
          style={{
            animation: "fadeIn 0.5s",
            fontSize: "24px", // Make the font size bigger
            fontWeight: "bold", // Make the font bold
            padding: "20px", // Add some padding to make it more prominent
            backgroundColor:
              notification.type === "success" ? "#dff0df" : "#f2dede", // Change the background color based on the notification type
            color: notification.type === "success" ? "#3e8e41" : "#b94a48", // Change the text color based on the notification type
          }}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
