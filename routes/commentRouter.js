const express = require('express');
const commentController = require('../controllers/commentController');
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post('/', authenticate, commentController.addComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);
router.get('/product/:productId', commentController.getCommentsByProductId);

module.exports = router;
