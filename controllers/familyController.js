const { Family, FamilyPhone, User, ShoppingList } = require('../models');
const sequelize = require('../dbInit');
const sendNotification = require("../utils/notificationService");

const familyController = {
    createFamily: async (req, res) => {
        const { name, phoneNumbers } = req.body;
        const userId = req.userId;

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).send({ error: 'Пользователь не найден.' });
            }

            const newFamily = await Family.create({ name });

            const phones = await Promise.all(phoneNumbers.map(async phone => {
                sendNotification(phone, `Вас добавили в семью: ${name}`);

                let foundUser = await User.findOne({ where: { phoneNumber: phone } });
                return {
                    phoneNumber: phone,
                    userId: foundUser ? foundUser.id : null,
                    familyId: newFamily.id
                };
            }));

            phones.push({
                phoneNumber: user.phoneNumber,
                userId: user.id,
                familyId: newFamily.id
            });

            await FamilyPhone.bulkCreate(phones);

            res.status(201).send({ success: 'Семья успешно создана.', familyId: newFamily.id });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Ошибка при создании семьи.' });
        }
    },

    getFamilyDetails: async (req, res) => {
        const { familyId } = req.params;

        try {
            const family = await Family.findByPk(familyId, {
                include: [{ model: FamilyPhone, as: 'Phones' }]
            });

            if (!family) {
                return res.status(404).send({ error: 'Семья не найдена.' });
            }

            res.send(family);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Ошибка при получении информации о семье.' });
        }
    },

    addMember: async (req, res) => {
        const { familyId, phoneNumbers } = req.body;

        try {
            const family = await Family.findByPk(familyId);
            if (!family) {
                return res.status(404).send({ error: 'Семья не найдена.' });
            }

            const usersToAdd = await User.findAll({
                where: { phoneNumber: phoneNumbers }
            });

            const phonesToAdd = usersToAdd.map(user => ({
                phoneNumber: user.phoneNumber,
                userId: user.id,
                familyId: familyId
            }));

            await FamilyPhone.bulkCreate(phonesToAdd);

            res.send({ success: 'Пользователи добавлены в семью.' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Ошибка при добавлении пользователей в семью.' });
        }
    },

    removeMember: async (req, res) => {
        const { phoneId } = req.body;  // Используем уникальный идентификатор записи

        try {
            // Проверяем, что phoneId действительно передан
            if (!phoneId) {
                return res.status(400).send({ error: 'Необходим идентификатор телефона для удаления.' });
            }

            const result = await FamilyPhone.destroy({
                where: { id: phoneId }
            });

            if (result === 0) {
                return res.status(404).send({ error: 'Запись не найдена или уже удалена.' });
            }

            res.send({ success: 'Запись успешно удалена.' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Ошибка при удалении записи.' });
        }
    },

    getMyFamilyDetails: async (req, res) => {
        const userId = req.userId;
        try {
            const userPhones = await FamilyPhone.findAll({
                where: { userId },
                include: [{ model: Family }]
            });

            const familyDetails = userPhones.map(up => up.Family);

            res.send(familyDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllFamilies: async (req, res) => {
        try {
            const allFamilies = await Family.findAll({
                include: [{ model: FamilyPhone, as: 'Phones' }]
            });
            res.send(allFamilies);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Ошибка при получении информации о семьях.' });
        }
    }
};

module.exports = familyController;
