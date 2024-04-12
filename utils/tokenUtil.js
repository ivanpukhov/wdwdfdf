const jwt = require('jsonwebtoken');
const secretKey = 'i_am_ivan_and_i_will_win_in_this_hackathon';

const generateToken = (user) => {
    const payload = { id: user.id, phoneNumber: user.phoneNumber };
    return jwt.sign(payload, secretKey, { expiresIn: '12h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
