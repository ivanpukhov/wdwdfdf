const { verifyToken } = require('../utils/tokenUtil');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Предполагается, что токен передается в заголовке Authorization: Bearer <token>
        const decoded = verifyToken(token);
        req.userId = decoded.id; // Добавляем id пользователя в объект запроса
        next();
    } catch (error) {
        res.status(401).json({ error: "Неавторизованный доступ." });
    }
};

module.exports = authenticate;
