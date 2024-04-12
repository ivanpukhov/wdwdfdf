const { DataTypes } = require('sequelize');
const sequelize = require('../dbInit');

const ShoppingList = sequelize.define('ShoppingList', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Добавим внешний ключ для связи с семьей
    familyId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'families', // имя таблицы
            key: 'id',
        },
    }
}, {
    tableName: 'shoppingLists'
});

module.exports = ShoppingList;
