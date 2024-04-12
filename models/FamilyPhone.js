// models/FamilyPhone.js

const { DataTypes } = require('sequelize');
const sequelize = require('../dbInit');

const FamilyPhone = sequelize.define('FamilyPhone', {
    familyId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'families',
            key: 'id'
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    tableName: 'familyPhones'
});

module.exports = FamilyPhone;
