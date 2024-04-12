const express = require('express');
const productController = require('../controllers/ProductController');
const router = express.Router();

router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
// router.get('/shoppingList/:shoppingListId', productController.getAllProductsByShoppingListId);
router.post('/bulk', productController.createMultipleProducts);
router.get('/', productController.getAllProducts);

module.exports = router;
