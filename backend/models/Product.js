const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'],
    trim: true
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    trim: true
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'], 
    min: [0.01, 'Price must be greater than 0'] 
  },
  quantity: { 
    type: Number, 
    required: [true, 'Quantity is required'], 
    min: [0, 'Quantity cannot be negative'] 
  },
  minStock: { 
    type: Number, 
    required: [true, 'Minimum stock threshold is required'], 
    min: [0, 'Minimum stock cannot be negative'] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Product', productSchema);
