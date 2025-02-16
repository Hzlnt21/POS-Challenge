const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// console.log('Product Controller:', productController);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// router.get('/search/:name', productController.searchProductByName);

module.exports = router;

