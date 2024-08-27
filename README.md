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





