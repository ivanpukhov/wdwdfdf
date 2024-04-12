const { DataTypes } = require('sequelize');
const sequelize = require('../dbInit'); // Убедитесь, что путь к dbInit.js верный

const Family = sequelize.define('Family', {
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
    tableName: 'families'
});

module.exports = Family;
