const { Product, Category } = require('../models');

const productController = {
    createProduct: async (req, res) => {
        const { name, categoryId, imageUrl, price } = req.body;
        try {
            const product = await Product.create({ name, categoryId, imageUrl, price });
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createMultipleProducts: async (req, res) => {
        const { products } = req.body;
        try {
            const newProducts = await Product.bulkCreate(products, {
                validate: true,
                returning: true
            });
            res.status(201).json(newProducts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProductById: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findByPk(id, {
                include: [{ model: Category, as: 'Category' }] // Включаем модель Category
            });
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { name, categoryId, imageUrl, price } = req.body;
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            product.name = name;
            product.categoryId = categoryId;
            product.imageUrl = imageUrl;
            product.price = price;
            await product.save();
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            await product.destroy();
            res.json({ message: 'Product deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.findAll({
                include: [{ model: Category, as: 'Category' }]
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = productController;
