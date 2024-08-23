**FIBEly Reading Hub - Book API Documentation**

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

**Protected Routes**
1. Dashboard
Endpoint: GET /protected/dashboard
Description: Access the user dashboard.
Headers: Include the Authorization header with the JWT token.
Response: 200 OK with a welcome message.
Testing: Send a GET request to /protected/dashboard.

















