**FIBEly ReadingHub Frontend Documentation**
**Overview**

FIBEly ReadingHub is a web-based application that allows users to browse, purchase, and read books online. The frontend is built using React, with a focus on providing a seamless and user-friendly experience.

**Features**

Browse Books: Users can browse through a variety of books categorized under Fiction, Non-Fiction, and Others.

Search Books: Users can search for books by title using the search bar in the navbar.

View Book Details: Each book has a dedicated page displaying its title, author, price, and cover image.

Add to Cart: Users can add books to their cart for easy purchase.

Purchase Books: Users can pay for books using integrated Stripe payments.

Read Books: After purchasing, users can read books directly in the browser via an embedded PDF viewer.


**Getting Started**

**Prerequisites**
Ensure you have the following installed:
```
Node.js (v14 or above)
npm (v6 or above)
A web browser (Chrome, Firefox, etc.)
```
Before running the application, make sure you have the following:
```
Node.js installed on your system.
Express server running on port 5000.
```
**Installation**
1. Clone the repository:
```
git clone https://< personal access token >@github.com/faith481/FIBEly-Reading_Hub
cd Frontend
```
2. Install the dependencies:
```
npm install
```

**Running the Application**
To start the development server:

1. start the react app
```
cd Frontend/src
npm start App.js
```
This will run the app in development mode. Open http://localhost:3000 to view it in your browser.

2. start the Express server by installing dependencies
```
cd Backend
npm install
nodemon start server.js
```
This will run the Express server in development mode. Open http://localhost:5000 to serve the backend api. 

**Application Structure**

**Navbar**

Search Bar: Use the search bar at the top to find books by their title.

Category Links: Navigate between different book categories (Fiction, Non-Fiction, Others).

Cart: Access your cart to view or purchase selected books.

Login/Logout: Login or logout of your account.

**Free Books Section**

Free Books: Browse through the most popular books in the Fiction category.

View PDF: Click on the "View PDF" button to open and read the embedded PDF file directly.

**Latest Books**

Latest Books: Stay updated with the latest additions to the library.

Book Details: Click on a book to view more details.


**Cart**

View Cart: Check the books you've added to your cart.

Remove from Cart: Remove books from your cart if you change your mind.

Proceed to Checkout: Click on "Checkout" to securely pay for your books using Stripe.

**Stripe Payment Integration**

When you're ready to purchase a book, the app will securely connect to Stripe for payment processing. Follow the prompts to enter your payment details and complete the purchase.

**Known Issues**

PDF Scrolling: The embedded PDF may scroll with the entire page. This will be addressed in future updates.

**Conclusion**

Thank you for using FIBEly ReadingHub! We hope you enjoy your reading experience. If you encounter any issues, please contact our support team.




**FIBEly Reading Hub - Backend Book API Documentation**

Base URL
```
http://localhost:5000
```

Authentication
JWT Token: Required for all routes except sign-up and login.
Headers: Include Authorization: Bearer <JWT_TOKEN> in all requests except sign-up and login.

**User Authentication Routes**
1. Sign Up
Endpoint: POST /auth/signup
Description: Create a new user account.
Body:
```
{
  "username": "bruka",
  "email": "bruka@example.com",
  "password": "password123",
  "role": "normal_user" // Options: "normal_user", "publisher", "admin"
}
```
Response: 201 Created
Testing: Use raw JSON data in Postman.

2. Login
Endpoint: POST /auth/login
Description: Log in and receive a JWT token.
Body:
```
{
  "email": "bruka@example.com",
  "password": "password123"
}
```
Response: 200 OK with JWT token.
Testing: Copy the JWT token for subsequent requests.

3. Logout
Endpoint: POST /auth/logout
Description: Log out the current user and invalidate the session.
Headers: Include the session token in the request.

**Book Management Routes**

1. Get All Books
Endpoint: GET /books
Description: Retrieve all books.
Headers: Include the Authorization header with the JWT token.
Response: 200 OK with a list of books.
Testing: Send a GET request to /books.


2. Get Book by ID
Endpoint: GET /books/:bookId
Description: Retrieve a book by its ID.
Headers: Include the Authorization header with the JWT token.
Response: 200 OK with book details.
Testing: Send a GET request to /books/<bookId>

3. Add a New Book
Endpoint: POST /books
Description: Create a new book (Publisher Only).

Body:
```
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fiction",
  "publicationDate": "2023-12-01",
  "publisher": "Publisher Name"
}
```
Headers: Include the Authorization header with the JWT token.
Response: 201 Created with the newly added book.
Testing: Use raw JSON data in Postman.
4. Update a Book
Endpoint: PATCH /books/:bookId
Description: Update book details (Publisher Only).
 
Body:
```
{
  "title": "Updated Book Title",
  "author": "Updated Author Name",
  "genre": "Non-Fiction"
}
```
Headers: Include the Authorization header with the JWT token.
Response: 200 OK with the updated book details.
Testing: Send a PATCH request to /books/<bookId> with the fields to update.

5. Delete a Book
Endpoint: DELETE /books/:bookId
Description: Delete a book (Publisher or Admin Only).
Headers: Include the Authorization header with the JWT token.
Response: 200 OK with a confirmation message.
Testing: Send a DELETE request to /books/<bookId>.

**Cart Management Routes**

1. Add Book to Cart
Endpoint: POST /cart
Description: Add a book to the user's cart.

Body:
```
{
  "bookId": "<bookId>"
}
```
Headers: Include the Authorization header with the JWT token.
Response: 200 OK with the updated cart.
Testing: Use raw JSON data in Postman.

2. Remove Book from Cart
Endpoint: REMOVE /cart
Description: Removes a specified book from the user's cart. This endpoint requires authentication and updates the cart by removing the book with the given ID.

HTTP Method: POST

URL: http://0.0.0.0:5000/cart/remove

Authentication
Required: JWT (JSON Web Token)
Method: Bearer Token
Header: Authorization: Bearer <token>
Request Headers
Authorization: Bearer token for user authentication
Request Body
Content-Type: application/json

Body:
```
{
  "bookId": "string" // ID of the book to be removed
}
```

Responses
Success Response (Status: 200 OK)

Content-Type: application/json
Body:
```
{
  "message": "Book removed from cart",
  "cart": {
    "_id": "60b9b1b2e3b16e50e8f2c3f1",
    "user": "60b9a9a6e3b16e50e8f2c3f0",
    "books": [
      "60b9b1b2e3b16e50e8f2c3f2",
      "60b9b1b2e3b16e50e8f2c3f3"
    ],
    "createdAt": "2024-08-20T09:28:51.026Z",
    "__v": 1
  }
}
```
Description: The book was successfully removed from the cart, and the response includes the updated cart object.

Error Responses

Error 400 (Bad Request)

Content-Type: application/json
body:
```
{
  "message": "Book not found in cart"
}
```
Description: The specified book ID was not found in the cart, so no book was removed.

Error 404 (Not Found)

Content-Type: application/json
Body:
```
{
  "message": "Cart not found"
}
```
Description: No cart exists for the specified user.

Error 500 (Internal Server Error)

Content-Type: application/json
Body:
```
{
  "error": "Internal Server Error"
}
```
Description: An unexpected error occurred while processing the request.

Example Usage
Request: http
POST cart/remove HTTP/1.1
Host: http://0.0.0.0:5000
Authorization: Bearer <your_jwt_token>
```
{
  "bookId": "60b9b1b2e3b16e50e8f2c3f2"
}
```
Response (Success):
```
{
  "message": "Book removed from cart",
  "cart": {
    "_id": "60b9b1b2e3b16e50e8f2c3f1",
    "user": "60b9a9a6e3b16e50e8f2c3f0",
    "books": [
      "60b9b1b2e3b16e50e8f2c3f2",
      "60b9b1b2e3b16e50e8f2c3f3"
    ],
    "createdAt": "2024-08-20T09:28:51.026Z",
    "__v": 1
  }
}
```
Response (Error 400):
```
{
  "message": "Book not found in cart"
}
```
Response (Error 404):
```
{
  "message": "Cart not found"
}
```
Response (Error 500):
```
{
  "error": "Internal Server Error"
}
```

3. Get User Cart
Endpoint: GET /cart
Description: Retrieve the current user's cart.
Headers: Include the Authorization header with the JWT token.
Response: 200 OK with the cart details.
Testing: Send a GET request to /cart.

4. Delete all items in a users Cart
Endpoint: DELETE /cart
Description: Clears all books from the user's cart. This endpoint removes every book from the cart associated with the authenticated user.

HTTP Method: POST  
URL: http://0.0.0.0:5000/cart/clearCart

Authentication
Required: JWT (JSON Web Token)
Method: Bearer Token
Header: Authorization: Bearer <token>
Request Headers
Authorization: Bearer token for user authentication
Request Body
Body: No body content is required for this endpoint.
Responses
Success Response (Status: 200 OK)
Body:
json
```
{
  "message": "All books removed from cart",
  "cart": {
    "_id": "60b9b1b2e3b16e50e8f2c3f1",
    "user": "60b9a9a6e3b16e50e8f2c3f0",
    "books": [],
    "createdAt": "2024-08-20T09:28:51.026Z",
    "__v": 1
  }
}
```
Description: The response confirms that all books have been removed from the cart and returns the updated cart object with an empty books array.

Error Responses

Error 404 (Not Found)

Content-Type: application/json
Body:
json
```
{
  "message": "Cart not found"
}
```
Description: The cart for the specified user does not exist.

Error 500 (Internal Server Error)

Content-Type: application/json
Body:
json
```
{
  "error": "Internal Server Error"
}
```
Description: An unexpected error occurred while processing the request.

Example Usage
Request:

http
POST cart/clearCart
Host: http://0.0.0.0:5000
Authorization: Bearer (your JWT)
Content-Type: application/json
Response:

json
```
{
  "message": "All books removed from cart",
  "cart": {
    "_id": "60b9b1b2e3b16e50e8f2c3f1",
    "user": "60b9a9a6e3b16e50e8f2c3f0",
    "books": [],
    "createdAt": "2024-08-20T09:28:51.026Z",
    "__v": 1
  }
}
```
**Order Management Routes**
1. GET cart/order/:id
Description:
Fetches the details of a specific order based on the provided order ID.
URL: http://localhost:5000/cart/order/:id
Method: GET

URL Parameters
id (path parameter): The unique identifier of the order you want to retrieve.
Type: String
Format: A valid MongoDB ObjectId (e.g., 60c72b2f5f1b2c001c8f3e09)
Request Headers

Authentication
Required: JWT (JSON Web Token)
Method: Bearer Token
Header: Authorization: Bearer <token>
Request Headers
Authorization: Bearer token for user authentication
Request Body: No body content is required for this endpoint.

Example Request

GET cart/order/60c72b2f5f1b2c001c8f3e09 HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Authorization: Bearer <your_token_here>
Response
Success Response
Status Code: 200 OK
Content-Type: application/json
Response Body:
```
{
  "order": {
	"userId": "66c170abc0fba5728fdf92b1",
	"cartId": "66c461d358b2751592e0e56c",
	"_id": "66c70d77bbb8d9ea428597b4",
	"books": [
  	{
    	"_id": "60c72b2f5f1b2c001c8f3e01",
    	"title": "Example Book",
    	"price": 29.99
  	}
	],
	"totalPrice": 29.99,
	"status": "pending",
	"createdAt": "2024-08-22T10:05:43.082Z",
	"__v": 0
  }
}
```

Error Responses
Order Not Found

Status Code: 404 Not Found
Content-Type: application/json
Response Body:
```
{
  "message": "Order not found",
  "error": "Order not found"
}
```
Internal Server Error

Status Code: 500 Internal Server Error
Content-Type: application/json

Response Body:
```
{
  "message": "Internal Server Error",
  "error": "<error_message>"
}
```
Error Handling
404 Not Found:
 If the order with the specified ID does not exist, the endpoint will return a 404 Not Found response with a message indicating that the order was not found.
500 Internal Server Error: If an unexpected error occurs while processing the request, the endpoint will return a 500 Internal Server Error response with a general error message.

2. POST cart/createOrder
Description:
Creates a new order for the currently authenticated user.
URL: http://localhost:5000/cart/createOrder
Method: POST

Request Headers
Content-Type: application/json
Authorization: Bearer <your_token_here>
Request Body:
This endpoint does not require a request body; the order is created based on the authenticated user.

Example Request
POST cart/createOrder HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Authorization: Bearer <your_token_here>
Response
Success Response
Status Code: 201 Created
Content-Type: application/json
Response Body:
```
{
  "message": "Order created successfully",
  "order": {
	"userId": "66c170abc0fba5728fdf92b1",
	"cartId": "66c461d358b2751592e0e56c",
	"_id": "66c70d77bbb8d9ea428597b4",
	"books": [
  	{
    	"_id": "60c72b2f5f1b2c001c8f3e01",
    	"title": "Example Book",
    	"price": 29.99
  	}
	],
	"totalPrice": 29.99,
	"status": "pending",
	"createdAt": "2024-08-22T10:05:43.082Z",
	"__v": 0
  }
}
```

**Error Responses**

Internal Server Error
Status Code: 500 Internal Server Error
Content-Type: application/json
Response Body:
```
{
  "message": "Internal Server Error",
  "error": "<error_message>"
}
```

Error Handling
500 Internal Server Error: If an unexpected error occurs while creating the order, the endpoint will return a 500 Internal Server Error response with a general error message.

Notes
Authentication: Ensure the request includes a valid authentication token in the Authorization header. The endpoint relies on req.user.userId to identify the user, which assumes that the user is authenticated and their ID is available in the request object.
Order Creation: The order is created based on the current user's cart. If the cart is empty or not found, an error will be thrown by the OrderService.createOrder method.

3. DELETE cart/CancelOrder/
Description:
This endpoint allows the user to cancel an existing order by providing the order's unique ID.

Request Method: DELETE
URL: http://0.0.0.0:5000/cart/CancelOrder/:orderId
Path Parameters:

orderId (string): The unique identifier of the order that you want to cancel.

Headers:
Authorization (string): A bearer token for authentication is needed because the endpoint is secured.

Response:
Success (200 OK):

Description: The order was successfully canceled.
Body:
```
{
  "message": "Order canceled successfully"
}
```

Error (500 Internal Server Error):
Description: An error occurred while attempting to cancel the order.
Body:
```
{
  "message": "Internal Server Error"
}
```

Error (404 Not Found):
Description: The specified order could not be found.
Body:
```
{
  "message": "Order not found"
}
```
Example Request:

DELETE http://0.0.0.0:5000/cart/CancelOrder/66c739f7bcda5ece37908ac1 HTTP/1.1

Host: localhost:3000

Authorization: Bearer <your Token>
Example Response:
```
{
  "message": "Order canceled successfully"
}
```

4. PATCH cart/updateOrderStatus/:orderId
Summary: Update the status of an existing order.

Description: This endpoint allows users to update the status of a specific order by providing a valid orderId and a new status value in the request body. The updated order details are returned upon success.

Parameters:

Path Parameters:
orderId (string, required): The unique identifier of the order you want to update.
Request Body:
status (string, required): The new status of the order. This must be a valid status value ('pending','processing', 'completed', 'canceled').

Request Example:
PATCH cart/updateOrderStatus/66c739f7bcda5ece37908ac1
Content-Type: application/json
```
{
  "status": "shipped"
}
```
Responses:

200 OK:

Description: The order status was updated successfully.
Response Body Example:
```
{
  "message": "Order status updated successfully",
  "order": {
	"_id": "66c739f7bcda5ece37908ac1",
	"userId": "66c170abc0fba5728fdf92b1",
	"cartId": "66c461d358b2751592e0e56c",
	"books": [
  	{
    	"_id": "60c72b2f5f1b2c001c8f3e01",
    	"title": "Example Book",
    	"price": 29.99
  	}
	],
	"totalPrice": 29.99,
	"status": "shipped",
	"createdAt": "2024-08-22T13:15:35.439Z",
	"__v": 0
  }
}
```

400 Bad Request:

Description: The request was invalid due to missing or incorrect status or orderId.

Response Body Example:
```
{
  "message": "Invalid status value, or orderId"
}
```
404 Not Found:

Description: The order with the given orderId was not found.

Response Body Example:
```
{
  "message": "Order not found"
}
```
500 Internal Server Error:

Description: An error occurred on the server while updating the order status.

Response Body Example:
```
{
  "message": "Internal Server Error"
}
```

**Protected Routes**
1. Dashboard
Endpoint: GET /protected/dashboard
Description: Access the user dashboard.
Headers: Include the Authorization header with the JWT token.
Response: 200 OK with a welcome message.
Testing: Send a GET request to /protected/dashboard.
