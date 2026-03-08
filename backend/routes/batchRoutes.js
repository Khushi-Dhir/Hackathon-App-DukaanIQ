const express = require('express');
const { createBatch } = require('../controllers/batchController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createBatch);

module.exports = router;

