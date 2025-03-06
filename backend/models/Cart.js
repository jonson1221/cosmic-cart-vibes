
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate total whenever cart items change
cartSchema.pre('save', async function(next) {
  const cart = this;
  
  try {
    // If cart is empty, set total to 0
    if (cart.items.length === 0) {
      cart.total = 0;
      return next();
    }
    
    // Populate product details to get prices
    const populatedCart = await mongoose.model('Cart').findOne({ _id: cart._id })
      .populate('items.product');
    
    // Calculate total
    if (populatedCart && populatedCart.items) {
      cart.total = populatedCart.items.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
      }, 0);
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
