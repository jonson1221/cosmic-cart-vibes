
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please add a category']
  },
  countInStock: {
    type: Number,
    required: [true, 'Please add count in stock'],
    min: [0, 'Count in stock cannot be negative'],
    default: 0
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add text index for search functionality
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
