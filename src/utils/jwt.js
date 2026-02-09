const jwt = require('jsonwebtoken');
const { required } = require('./env');

const jwtSecret = () => required('JWT_SECRET');

const signToken = (payload, options = {}) =>
  jwt.sign(payload, jwtSecret(), { expiresIn: '1h', ...options });

const verifyToken = (token) => jwt.verify(token, jwtSecret());

module.exports = {
  signToken,
  verifyToken,
};
