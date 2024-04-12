const { DataTypes } = require('sequelize');
const sequelize = require('../dbInit'); // Убедитесь, что путь к dbInit.js верный

const User = sequelize.define('User', {
    // Определение атрибутов модели
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ // Регулярное выражение для валидации номера телефона
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true // Sequelize автоматически добавит поля createdAt и updatedAt
});


module.exports = User;
