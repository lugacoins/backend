const bcrypt = require('bcryptjs');
const prisma = require('../config/db');

const createUser = async ({ email, password, name }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const error = new Error('Email already registered.');
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      wallet: {
        create: {},
      },
    },
    include: { wallet: true },
  });

  return user;
};

const verifyUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const error = new Error('Invalid credentials.');
    error.status = 401;
    throw error;
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    const error = new Error('Invalid credentials.');
    error.status = 401;
    throw error;
  }

  return user;
};

const getUserById = async (id) =>
  prisma.user.findUnique({
    where: { id },
    include: { wallet: true },
  });

module.exports = {
  createUser,
  verifyUser,
  getUserById,
};
