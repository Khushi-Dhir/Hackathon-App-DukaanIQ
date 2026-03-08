const express = require('express');
const { getInventoryAnalytics } = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/analytics', authMiddleware, getInventoryAnalytics);

module.exports = router;

