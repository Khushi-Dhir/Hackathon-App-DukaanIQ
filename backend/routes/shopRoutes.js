const express = require('express');
const { registerShop } = require('../controllers/shopController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route: only authenticated users can register a shop
router.post('/register', authMiddleware, registerShop);

module.exports = router;

