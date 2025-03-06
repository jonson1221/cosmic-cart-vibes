
const { validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    // Find cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      select: 'name price image'
    });
    
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
        total: 0
      });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addItemToCart = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { productId, quantity } = req.body;
    
    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if quantity is available
    if (product.countInStock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }
    
    // Find cart or create a new one
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
        total: 0
      });
    }
    
    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );
    
    if (itemIndex > -1) {
      // Item exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item doesn't exist, add new item
      cart.items.push({
        product: productId,
        quantity
      });
    }
    
    // Save cart
    const updatedCart = await cart.save();
    
    // Populate product details for response
    await updatedCart.populate({
      path: 'items.product',
      select: 'name price image'
    });
    
    res.status(201).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { quantity } = req.body;
    const { itemId } = req.params;
    
    // Find cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Find item in cart
    const itemIndex = cart.items.findIndex(item => 
      item._id.toString() === itemId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    // Get product to check stock
    const product = await Product.findById(cart.items[itemIndex].product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if quantity is available
    if (product.countInStock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }
    
    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    
    // Save cart
    const updatedCart = await cart.save();
    
    // Populate product details for response
    await updatedCart.populate({
      path: 'items.product',
      select: 'name price image'
    });
    
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    
    // Find cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Remove item
    cart.items = cart.items.filter(item => 
      item._id.toString() !== itemId
    );
    
    // Save cart
    const updatedCart = await cart.save();
    
    // Populate product details for response
    await updatedCart.populate({
      path: 'items.product',
      select: 'name price image'
    });
    
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    // Find cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Clear items
    cart.items = [];
    
    // Save cart
    const updatedCart = await cart.save();
    
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};
