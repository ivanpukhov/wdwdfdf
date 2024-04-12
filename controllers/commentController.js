const { Comment, Product, User } = require('../models');

const commentController = {
    addComment: async (req, res) => {
        const { text, productId,  } = req.body;
        const userId = req.userId;
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const comment = await Comment.create({ text, productId, userId });
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateComment: async (req, res) => {
        const { id } = req.params;
        const { text } = req.body;
        try {
            const comment = await Comment.findByPk(id);
            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            comment.text = text;
            await comment.save();
            res.json(comment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteComment: async (req, res) => {
        const { id } = req.params;
        try {
            const comment = await Comment.findByPk(id);
            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            await comment.destroy();
            res.json({ message: 'Comment deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCommentsByProductId: async (req, res) => {
        const { productId } = req.params;
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            const comments = await Comment.findAll({
                where: { productId },
                include: [{ model: User, as: 'User', attributes: ['id', 'name'] }]
            });
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = commentController;
