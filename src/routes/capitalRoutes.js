const express = require('express');
const {
  getCapitalHandler,
  depositHandler,
  withdrawHandler
} = require('../controllers/capitalController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/capital', authenticate, getCapitalHandler);
router.post('/funds/deposit', authenticate, depositHandler);
router.post('/funds/withdraw', authenticate, withdrawHandler);

module.exports = router;
