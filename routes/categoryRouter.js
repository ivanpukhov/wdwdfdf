const express = require('express');
const categoryController = require('../controllers/CategoryController');
const router = express.Router();

router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.get('/:id', categoryController.getCategoryProducts);
router.delete('/:id', categoryController.deleteCategory);
router.post('/bulk', categoryController.createMultipleCategories);
router.get('/', categoryController.getAllCategories);

module.exports = router;
