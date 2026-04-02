const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes mapped to controller functions
router.post('/', productController.createProduct);
router.get('/low-stock', productController.getLowStockProducts);
router.get('/', productController.getProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
