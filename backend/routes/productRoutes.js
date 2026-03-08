const express = require('express');
const { createProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const { createProductBatch, getProduct } = require('../controllers/ProductBatch');

const router = express.Router();

router.post('/', authMiddleware, createProduct);
router.post('/addproductbatch',  createProductBatch);
router.get('/getproduct', getProduct)

module.exports = router;

