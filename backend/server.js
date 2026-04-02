require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/products');
const Product = require('./models/Product');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

// Seed Data Function
const seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('Seeding database with initial products...');
      const sampleProducts = [
        { name: 'Wireless Mouse', category: 'Electronics', price: 1500, quantity: 45, minStock: 10 },
        { name: 'Mechanical Keyboard', category: 'Electronics', price: 4500, quantity: 12, minStock: 15 },
        { name: 'Office Chair', category: 'Furniture', price: 8500, quantity: 8, minStock: 10 },
        { name: 'Desk Lamp', category: 'Furniture', price: 1200, quantity: 30, minStock: 5 },
        { name: 'Water Bottle', category: 'Accessories', price: 800, quantity: 100, minStock: 20 },
        { name: 'USB-C Hub', category: 'Electronics', price: 2500, quantity: 2, minStock: 10 },
        { name: 'Notebook', category: 'Stationery', price: 150, quantity: 200, minStock: 50 },
        { name: 'Gel Pens (Pack of 10)', category: 'Stationery', price: 300, quantity: 15, minStock: 20 },
        { name: 'Laptop Stand', category: 'Accessories', price: 1800, quantity: 25, minStock: 10 },
        { name: 'Webcam 1080p', category: 'Electronics', price: 3500, quantity: 5, minStock: 8 }
      ];
      await Product.insertMany(sampleProducts);
      console.log('Database seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/inventory')
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
  })
  .catch((err) => console.error('Could not connect to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
