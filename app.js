const express = require('express');
const sequelize = require('./dbInit'); // Импорт sequelize экземпляра для подключения к БД
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRouter');
const familyRouter = require('./routes/familyRouter');
const shoppingListRouter = require('./routes/shoppingListRouter');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const commentRouter = require('./routes/commentRouter');
const cors = require('cors');

app.use(express.json());

app.use(cors());

// Основной маршрут для тестирования работоспособности приложения
app.get('/', (req, res) => {
    res.send('Приложение успешно запущено и подключено к базе данных!');
});



app.use('/api/users', userRoutes);
app.use('/api/families', familyRouter);
app.use('/api/shoppingLists', shoppingListRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/comments', commentRouter);
// Старт сервера с проверкой подключения к базе данных
sequelize.authenticate()
    .then(() => console.log('База данных подключена.'))
    .catch(err => console.error('Ошибка при подключении к базе данных:', err));

sequelize.sync({ force: false }).then(() => {
    console.log('Таблицы были успешно синхронизированы.');
}).catch((error) => {
    console.error('Произошла ошибка при синхронизации таблиц:', error);
});


app.listen(3000, '0.0.0.0', () => {
    console.log('Сервер запущен на порту 3000 и доступен по адресу http://0.0.0.0:3001');
});
