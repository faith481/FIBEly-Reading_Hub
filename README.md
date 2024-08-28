**FIBEly Reading Hub - Book Backend API Documentation**

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
**Protected Routes**
1. Dashboard
Endpoint: GET /protected/dashboard
Description: Access the user dashboard.
Headers: Include the Authorization header with the JWT token.
Response: 200 OK with a welcome message.
Testing: Send a GET request to /protected/dashboard.

**PAYMENT ROUTES**
POST payment/createPayment
This route is used to create a payment for an order using Stripe as the payment gateway. It requires JWT authentication to ensure that only authorized users can create a payment.


URL: http://0.0.0.0:5000/payment/createPayment


Method: POST


Authentication: JWT (Bearer Token)


Content-Type: application/json


Request Headers
Authorization: Bearer <JWT_TOKEN> (Required)
Request Body Parameters
userId (string, required): The ID of the user making the payment.
cartId (string, required): The ID of the cart associated with the order.
orderId (string, required): The ID of the order for which payment is being made.
paymentMethodTypes (array of strings, required): A list of payment method types allowed for the payment (e.g.,
[
  'card', 'bank_transfer', 'alipay', 'wechat_pay', 'ideal',
  'sepa_debit', 'giropay', 'eps', 'bancontact', 'sofort', 'p24',
  'klarna', 'afterpay_clearpay'
]).


If not provided, the request will return a 400 error.
Example Request Body
{
  "userId": "66c170abc0fba5728fdf92b1",
  "cartId": "66c891a657c483a08d530fd0",
  "orderId": "66c8933157c483a08d530fd8",
  "paymentMethodTypes": ["card"]
}
Response
On success, the route returns a 200 status code with the following JSON object:


clientSecret (string): The client secret provided by Stripe, used to confirm the payment on the client side.
paymentId (string): The ID of the payment record stored in MongoDB.
orderDetails (object): The details of the order for which payment was made, including:
_id (string): The order ID.
userId (string): The user ID.
cartId (object): The cart associated with the order.
_id (string): The cart ID.
user (string): The user ID associated with the cart.
createdAt (string): The timestamp when the cart was created.
__v (number): The version key (for internal use by MongoDB).
books (array of objects): The list of books in the order, each containing:
_id (string): The book ID.
title (string): The title of the book.
price (number): The price of the book.
totalPrice (number): The total price of the order.
status (string): The status of the order (e.g., processing).
createdAt (string): The timestamp when the order was created.
__v (number): The version key (for internal use by MongoDB).


Example Successful Response
{
  "clientSecret": "pi_3Pqy8c1oFGZuH5MC0Aw7KIKr_secret_c9pwh4ZGUxHkFPANWrmmAb2ae",
  "paymentId": "66c8977757c483a08d530fde",
  "orderDetails": {
    "_id": "66c8933157c483a08d530fd8",
    "userId": "66c170abc0fba5728fdf92b1",
    "cartId": {
      "_id": "66c891a657c483a08d530fd0",
      "user": "66c170abc0fba5728fdf92b1",
      "createdAt": "2024-08-23T13:41:58.853Z",
      "__v": 2
    },
    "books": [
      {
        "_id": "66c1b4bdaf4efcc3ed23d606",
        "title": "The God Father",
        "price": 80
      },
      {
        "_id": "66c600e1cb7f9ee9d188acce",
        "title": "To Kill a Mockingbird",
        "price": 80
      },
      {
        "_id": "66c6038b28138f780ed90977",
        "title": "1984",--_-
        "price": 80
      }
    ],
    "totalPrice": 240,
    "status": "processing",
    "createdAt": "2024-08-23T13:48:33.302Z",
    "__v": 0
  }
}


Error Responses
400 Bad Request: If any required field is missing or if paymentMethodTypes is not a valid array of supported payment methods.


Example:
{
  "message": "Invalid payment method type(s) provided"
}


404 Not Found: If the order is not found.
Example:
{
  "message": "Order not found"
}


500 Internal Server Error: If an internal server error occurs.
Example:
{
  "error": "Internal Server Error"
}


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

Error Responses

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










