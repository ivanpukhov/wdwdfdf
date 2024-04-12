const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile/:userId', userController.getProfile);
router.put('/profile/:userId', userController.updateProfile);
router.post('/checkPhoneNumber', userController.checkPhoneNumber);
router.get('/', userController.getAllUsers);

module.exports = router;
