const User = require('./User');
const Family = require('./family');
const ShoppingList = require('./ShoppingList');
const Product = require('./product');
const Category = require('./category');
const FamilyPhone = require('./FamilyPhone');
const Comment = require('./comment');
const sequelize = require('../dbInit');
const { DataTypes } = require('sequelize');

// Определение модели ShoppingListProduct для связи многие-ко-многим между ShoppingList и Product
const ShoppingListProduct = sequelize.define('ShoppingListProduct', {
    shoppingListId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
}, {
    tableName: 'ShoppingListProducts',
    timestamps: false // Если вам не нужны поля createdAt и updatedAt
});

Category.hasMany(Product, {
    foreignKey: 'categoryId', // убедитесь, что это поле соответствует ключу, который используется в модели Product
    as: 'Products' // это псевдоним, который используется при загрузке связанных продуктов
});

Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'Category' // псевдоним, который вы уже использовали при определении связи в модели Product
});

// Связи между Family и FamilyPhone (один ко многим)
Family.hasMany(FamilyPhone, { foreignKey: 'familyId', as: 'Phones' });
FamilyPhone.belongsTo(Family, { foreignKey: 'familyId' });

// Связь между User и FamilyPhone (один ко многим)
User.hasMany(FamilyPhone, { foreignKey: 'userId', as: 'PhoneNumbers' });
FamilyPhone.belongsTo(User, { foreignKey: 'userId' });

// Связи между Family и ShoppingList (один ко многим)
Family.hasMany(ShoppingList, { foreignKey: 'familyId', as: 'ShoppingLists' });
ShoppingList.belongsTo(Family, { foreignKey: 'familyId', as: 'Family' });

// Многие-ко-многим связи между ShoppingList и Product через промежуточную таблицу ShoppingListProduct
ShoppingList.belongsToMany(Product, { through: ShoppingListProduct, as: 'Products', foreignKey: 'shoppingListId', otherKey: 'productId' });
Product.belongsToMany(ShoppingList, { through: ShoppingListProduct, as: 'ShoppingLists', foreignKey: 'productId', otherKey: 'shoppingListId' });

// Связи между Product и Comment (один ко многим)
Product.hasMany(Comment, { foreignKey: 'productId', as: 'Comments' });
Comment.belongsTo(Product, { foreignKey: 'productId', as: 'Product' });

// Связи между User и Comment (один ко многим)
User.hasMany(Comment, { foreignKey: 'userId', as: 'Comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'User' });

module.exports = {
    sequelize, // Экспорт экземпляра sequelize для использования в других частях приложения
    User,
    Family,
    ShoppingList,
    Product,
    Category,
    Comment,
    FamilyPhone,
    ShoppingListProduct // Добавление экспорта модели связи
};
