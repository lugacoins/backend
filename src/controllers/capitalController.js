const { getCapital, deposit, withdraw } = require('../services/capitalService');

const getCapitalHandler = (req, res) => res.json(getCapital());

const depositHandler = (req, res) => {
  const { amount } = req.body || {};

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  return res.json({ status: 'ok', mode: 'test', ...deposit(amount) });
};

const withdrawHandler = (req, res) => {
  const { amount } = req.body || {};

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  const result = withdraw(amount);
  if (result.rejected) {
    return res.status(409).json({ status: 'rejected', mode: 'test', ...result });
  }

  return res.json({ status: 'ok', mode: 'test', ...result });
};

module.exports = {
  getCapitalHandler,
  depositHandler,
  withdrawHandler
};
