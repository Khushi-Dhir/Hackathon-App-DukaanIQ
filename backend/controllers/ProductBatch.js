const Product = require("../models/Product");
const Batch = require("../models/Batch");

exports.createProductBatch = async (req, res) => {

  const {
    productName,
    category,
    productType,
    batchNo,
    quantity,
    mrp,
    selling,
    expiryDate,
  } = req.body;

  try {

    // check if product exists
    let product = await Product.findOne({ productName });

    if (!product) {
      product = await Product.create({
        productName,
        category,
        productType
      });
    }

    // create batch
    const batch = await Batch.create({
      product: product._id,
      batchNo,
      quantity: Number(quantity),
      prices: {
        mrp: Number(mrp),
        selling: Number(selling)
      },
      expiryDate
    });

    res.status(201).json({
      success: true,
      message: "Product & Batch created successfully",
      product,
      batch
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


exports.getProduct = async (req, res) => {
  try {
    const { shopId } = req.query;

    const products = await Product.find({ shop: shopId });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};