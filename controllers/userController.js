const User = require('../models/User');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/tokenUtil'); // Предполагается, что у вас уже есть утилита для работы с JWT

const saltRounds = 10;

const userController = {
    // Регистрация пользователя
    register: async (req, res) => {
        try {
            const {name, phoneNumber, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await User.create({
                name,
                phoneNumber,
                password: hashedPassword,
            });
            const token = generateToken(newUser);
            res.status(201).send({user: {name: newUser.name, phoneNumber: newUser.phoneNumber}, token});
        } catch (error) {
            res.status(500).send({error: 'Ошибка при регистрации пользователя.'});
        }
    },

    // Вход пользователя
    login: async (req, res) => {
        try {
            const {phoneNumber, password} = req.body;
            const user = await User.findOne({where: {phoneNumber}});
            if (!user) {
                return res.status(404).send({error: 'Пользователь не найден.'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send({error: 'Неверный пароль.'});
            }
            const token = generateToken(user);
            res.send({user: {name: user.name, phoneNumber: user.phoneNumber}, token});
        } catch (error) {
            res.status(500).send({error: 'Ошибка при входе в систему.'});
        }
    },

    // Получение профиля пользователя
    getProfile: async (req, res) => {
        try {
            // Предполагается, что ID пользователя доступен через req.userId, установленный предыдущим middleware
            const user = await User.findByPk(req.userId);
            if (!user) {
                return res.status(404).send({error: 'Пользователь не найден.'});
            }
            res.send({user: {name: user.name, phoneNumber: user.phoneNumber}});
        } catch (error) {
            res.status(500).send({error: 'Ошибка при получении профиля пользователя.'});
        }
    },

    checkPhoneNumber: async (req, res) => {
        const {phoneNumber} = req.body;
        try {
            const user = await User.findOne({where: {phoneNumber}});
            if (user) {
                return res.json({exists: true, message: "Номер телефона уже зарегистрирован."});
            } else {
                return res.json({exists: false, message: "Номер телефона не зарегистрирован."});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.send({users});
        } catch (error) {
            res.status(500).send({error: 'Ошибка при получении списка пользователей.'});
        }
    },



    // Обновление профиля пользователя
    updateProfile: async (req, res) => {
        try {
            const {name, newPassword} = req.body;
            const user = await User.findByPk(req.userId);
            if (!user) {
                return res.status(404).send({error: 'Пользователь не найден.'});
            }
            const updatedData = {name};
            if (newPassword) {
                updatedData.password = await bcrypt.hash(newPassword, saltRounds);
            }
            await user.update(updatedData);
            res.send({success: 'Профиль успешно обновлен.'});
        } catch (error) {
            res.status(500).send({error: 'Ошибка при обновлении профиля.'});
        }
    },
};

module.exports = userController;
