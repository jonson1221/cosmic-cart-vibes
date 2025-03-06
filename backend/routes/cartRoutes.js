
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
  getCart, 
  addItemToCart, 
  updateCartItem, 
  removeCartItem,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// All cart routes require authentication
router.use(protect);

// Get user cart
router.get('/', getCart);

// Add item to cart
router.post(
  '/',
  [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  addItemToCart
);

// Update cart item quantity
router.put(
  '/:itemId',
  [
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  updateCartItem
);

// Remove item from cart
router.delete('/:itemId', removeCartItem);

// Clear cart
router.delete('/', clearCart);

module.exports = router;
