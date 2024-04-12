const { ShoppingList, Product, ShoppingListProduct } = require('../models');

const shoppingListController = {
    createShoppingList: async (req, res) => {
        const { name, familyId } = req.body;
        try {
            const shoppingList = await ShoppingList.create({ name, familyId });
            res.status(201).json(shoppingList);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateShoppingList: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const shoppingList = await ShoppingList.findByPk(id);
            if (!shoppingList) {
                return res.status(404).json({ error: 'Shopping list not found' });
            }
            shoppingList.name = name;
            await shoppingList.save();
            res.json(shoppingList);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteShoppingList: async (req, res) => {
        const { id } = req.params;
        try {
            const shoppingList = await ShoppingList.findByPk(id);
            if (!shoppingList) {
                return res.status(404).json({ error: 'Shopping list not found' });
            }
            await shoppingList.destroy();
            res.json({ message: 'Shopping list deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getShoppingListById: async (req, res) => {
        const { id } = req.params;
        try {
            const shoppingList = await ShoppingList.findByPk(id, {
                include: [{ model: Product, as: 'Products', through: { attributes: [] } }]
            });
            if (!shoppingList) {
                return res.status(404).json({ error: 'Shopping list not found' });
            }
            res.json(shoppingList);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllShoppingListsByFamilyId: async (req, res) => {
        const { familyId } = req.params;
        try {
            const shoppingLists = await ShoppingList.findAll({
                where: { familyId },
                include: [{ model: Product, as: 'Products', through: { attributes: [] } }]
            });
            res.json(shoppingLists);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    addProductToList: async (req, res) => {
        const { shoppingListId, productId } = req.params;
        try {
            const entry = await ShoppingListProduct.create({ shoppingListId, productId });
            res.status(201).json(entry);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    removeProductFromList: async (req, res) => {
        const { shoppingListId, productId } = req.params;
        try {
            const result = await ShoppingListProduct.destroy({
                where: { shoppingListId, productId }
            });
            if (result > 0) {
                res.json({ message: 'Product removed from shopping list' });
            } else {
                res.status(404).json({ error: 'Product not found in shopping list' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProductsInList: async (req, res) => {
        const { shoppingListId } = req.params;
        try {
            const products = await Product.findAll({
                include: [{
                    model: ShoppingList,
                    as: 'ShoppingLists',
                    where: { id: shoppingListId },
                    through: { attributes: [] }
                }]
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = shoppingListController;
