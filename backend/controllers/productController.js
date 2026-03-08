const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { productName, category, productType } = req.body;

    if (!productName || !category || !productType) {
      return res
        .status(400)
        .json({ message: 'productName, category and productType are required' });
    }

    const product = await Product.create({
      productName,
      category,
      productType,
    });

    return res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({ message: 'Server error while creating product' });
  }
};

const getProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }
    requestedProduct = await Product.findById(productId);

    if (!requestedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({
      message: 'Product fetched successfully',
      product: requestedProduct,
    });
  } catch (error) {
    console.error('Get product error:', error);
    return res.status(500).json({ message: 'Server error while fetching product' });
  }
}
module.exports = {
  createProduct,
  getProduct,
};

