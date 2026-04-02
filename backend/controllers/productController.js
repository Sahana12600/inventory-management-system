const Product = require('../models/Product');

// Add new product
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, minStock } = req.body;
    
    // Basic validation
    if (!name || !category || price === undefined || quantity === undefined || minStock === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (price <= 0) return res.status(400).json({ message: 'Price must be greater than 0' });
    if (quantity < 0) return res.status(400).json({ message: 'Quantity cannot be negative' });

    const newProduct = new Product({ name, category, price, quantity, minStock });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error adding product', error: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get low stock products
exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({ $expr: { $lte: ["$quantity", "$minStock"] } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching low stock products', error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, minStock } = req.body;
    
    if (price <= 0) return res.status(400).json({ message: 'Price must be greater than 0' });
    if (quantity < 0) return res.status(400).json({ message: 'Quantity cannot be negative' });

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, quantity, minStock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
