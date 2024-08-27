import axios from "axios";

const addToCart = async (bookId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/cart/add",
      { bookId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response status is 200 (success)
    if (res.status === 200) {
      showNotification("Book added to cart successfully!");
      return res.data.cart.books; // Return the updated cart books
    } else {
      showNotification("Failed to add book to cart. Please try again.");
    }
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);

    //Show an error notification
    showNotification("Failed to add book to cart. Please try again.", "error");
  }
};

// Notification function to display messages
const showNotification = (message, type) => {
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  const notificationElement = document.createElement("div");
  notificationElement.className = `notification ${type}`;
  notificationElement.innerHTML = message;

  // Append the notification element to the container
  notificationContainer.appendChild(notificationElement);

  // Remove the notification after 3 seconds
  setTimeout(() => {
    notificationElement.remove();
  }, 3000);
};

export { addToCart, showNotification };
