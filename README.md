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

2. Get User Cart
Endpoint: GET /cart
Description: Retrieve the current user's cart.
Headers: Include the Authorization header with the JWT token.
Response: 200 OK with the cart details.
Testing: Send a GET request to /cart.


**Protected Routes**
1. Dashboard
Endpoint: GET /protected/dashboard
Description: Access the user dashboard.
Headers: Include the Authorization header with the JWT token.
Response: 200 OK with a welcome message.
Testing: Send a GET request to /protected/dashboard.

















