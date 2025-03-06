
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all products (with pagination and filters)
router.get('/', getProducts);

// Get single product
router.get('/:id', getProductById);

// Create a product (admin only)
router.post(
  '/',
  [
    protect,
    admin,
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('image').notEmpty().withMessage('Image URL is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('countInStock').isInt({ min: 0 }).withMessage('Count in stock must be a positive number')
  ],
  createProduct
);

// Update a product (admin only)
router.put('/:id', protect, admin, updateProduct);

// Delete a product (admin only)
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
