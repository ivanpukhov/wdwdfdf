const { DataTypes } = require('sequelize');
const sequelize = require('../dbInit');
const {Product} = require("./index");

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'categories'
});





module.exports = Category;
