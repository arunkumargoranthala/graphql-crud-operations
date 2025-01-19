const jwt = require('jsonwebtoken');

const auth = (req) => {
    const token = req.headers.authorization || '';
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error('Authentication failed');
    }
};

module.exports = auth;
