
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
  getCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all categories
router.get('/', getCategories);

// Get single category
router.get('/:id', getCategoryById);

// Create a category (admin only)
router.post(
  '/',
  [
    protect,
    admin,
    body('name').notEmpty().withMessage('Name is required')
  ],
  createCategory
);

// Update a category (admin only)
router.put('/:id', protect, admin, updateCategory);

// Delete a category (admin only)
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;
