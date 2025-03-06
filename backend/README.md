
# Cosmética E-commerce Backend

This is the backend for the Cosmética e-commerce application. It provides APIs for product management, user authentication, cart management, and admin functions.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. Start the server:
   ```
   npm start
   ```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info (requires auth)

### Products
- `GET /api/products` - Get all products (with pagination and filters)
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Add a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Cart
- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart` - Add item to cart (requires auth)
- `PUT /api/cart/:itemId` - Update cart item quantity (requires auth)
- `DELETE /api/cart/:itemId` - Remove item from cart (requires auth)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Add a new category (admin only)
