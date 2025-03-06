
const { validationResult } = require('express-validator');
const Product = require('../models/Product');

// @desc    Get all products with pagination and filters
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 8;
    const page = Number(req.query.page) || 1;
    
    // Build query
    const query = {};
    
    // Filter by category if provided
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by search term if provided
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    // Filter by price range if provided
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }
    
    // Count documents
    const count = await Product.countDocuments(query);
    
    // Get products
    const products = await Product.find(query)
      .populate('category', 'name')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(req.query.sortBy ? { [req.query.sortBy]: req.query.order || 'asc' } : { createdAt: 'desc' });
    
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { 
      name, 
      price, 
      description, 
      image, 
      category, 
      countInStock 
    } = req.body;
    
    const product = new Product({
      name,
      price,
      description,
      image,
      category,
      countInStock,
      rating: 0,
      numReviews: 0
    });
    
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { 
      name, 
      price, 
      description, 
      image, 
      category, 
      countInStock 
    } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
