const jwt = require('jsonwebtoken');
const { jwtSecret, adminUser, adminPassword } = require('../config/env');

const validateCredentials = (username, password) =>
  username === adminUser && password === adminPassword;

const signToken = (payload) =>
  jwt.sign(payload, jwtSecret, { expiresIn: '2h' });

module.exports = {
  validateCredentials,
  signToken
};
