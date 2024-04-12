const { DataTypes } = require('sequelize');
const sequelize = require('../dbInit'); // Подразумевается, что этот файл корректно настраивает экземпляр Sequelize

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true // Разрешаем null, если изображение необязательно
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false // Убедитесь, что у каждого продукта должна быть категория
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.00 // Устанавливаем значение по умолчанию
    }
}, {
    tableName: 'products' // Имя таблицы в базе данных
});

// Подразумевается, что модель Category уже определена где-то в другом месте
const Category = require('./category'); // Импортируем модель Category

// Определение связей
// Product.belongsTo(Category, {
//     foreignKey: 'categoryId', // Указываем внешний ключ
//     as: 'Category' // Используем псевдоним для доступа к связанным записям
// });

// Экспорт модели для использования в других частях приложения
module.exports = Product;
