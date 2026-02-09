const { initialCapital } = require('../config/env');

let capital = Number.isFinite(initialCapital) ? initialCapital : 0;

const getCapital = () => ({ capital });

const deposit = (amount) => {
  capital += amount;
  return { capital };
};

const withdraw = (amount) => {
  if (amount > capital) {
    return { capital, rejected: true, reason: 'Insufficient funds' };
  }
  capital -= amount;
  return { capital };
};

module.exports = {
  getCapital,
  deposit,
  withdraw
};
