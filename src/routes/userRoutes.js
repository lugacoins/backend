const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/me', authMiddleware, userController.me);

module.exports = router;
