const { Category, Product} = require('../models');

const categoryController = {
    createCategory: async (req, res) => {
        const { name } = req.body;
        try {
            const category = await Category.create({ name });
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCategoryProducts: async (req, res) => {
        const { id } = req.params;
        try {
            const category = await Category.findByPk(id, {
                include: [{
                    model: Product,
                    as: 'Products'  // Убедитесь, что alias 'Products' соответствует тому, который вы определили в связях
                }]
            });
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category.Products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createMultipleCategories: async (req, res) => {
        const { categories } = req.body; // предполагается, что `categories` это массив объектов категорий
        try {
            const newCategories = await Category.bulkCreate(categories);
            res.status(201).json(newCategories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateCategory: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            category.name = name;
            await category.save();
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteCategory: async (req, res) => {
        const { id } = req.params;
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            await category.destroy();
            res.json({ message: 'Category deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = categoryController;
