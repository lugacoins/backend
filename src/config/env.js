const dotenv = require('dotenv');

dotenv.config();

const required = ['JWT_SECRET', 'ADMIN_USER', 'ADMIN_PASSWORD'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.warn(`Missing required env vars: ${missing.join(', ')}`);
}

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  adminUser: process.env.ADMIN_USER || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'password',
  initialCapital: Number(process.env.INITIAL_CAPITAL || 0)
};
