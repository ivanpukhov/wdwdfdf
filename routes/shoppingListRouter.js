const express = require('express');
const shoppingListController = require('../controllers/shoppingListController');
const router = express.Router();

// Создание списка покупок
router.post('/', shoppingListController.createShoppingList);

// Обновление списка покупок
router.put('/:id', shoppingListController.updateShoppingList);

// Удаление списка покупок
router.delete('/:id', shoppingListController.deleteShoppingList);

// Получение списка покупок по ID
router.get('/:id', shoppingListController.getShoppingListById);

// Получение всех списков покупок для конкретной семьи
router.get('/family/:familyId', shoppingListController.getAllShoppingListsByFamilyId);

// Добавление продукта в список покупок
router.post('/:shoppingListId/products/:productId', shoppingListController.addProductToList);

// Удаление продукта из списка покупок
router.delete('/:shoppingListId/products/:productId', shoppingListController.removeProductFromList);

// Получение всех продуктов в списке покупок
router.get('/:shoppingListId/products', shoppingListController.getProductsInList);

module.exports = router;
