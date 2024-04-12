const { Sequelize } = require('sequelize');

// Создание нового экземпляра Sequelize для подключения к SQLite базе данных
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite' // Укажите путь к вашему файлу базы данных
});

async function initialize() {
    try {
        await sequelize.authenticate(); // Проверка подключения
        console.log('Соединение с базой данных успешно установлено.');
    } catch (error) {
        console.error('Не удалось подключиться к базе данных:', error);
    }
}

initialize();

// Экспорт экземпляра sequelize для использования в других частях приложения
module.exports = sequelize;
