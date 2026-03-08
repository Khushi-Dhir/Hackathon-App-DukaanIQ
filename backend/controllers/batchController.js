// const Batch = require('../models/Batch');
// const Shop = require('../models/Shop');
// const Product = require('../models/Product');

// const createBatch = async (req, res) => {
//   try {

//     const { productId, batchNo, quantity, prices, expiryDate } = req.body;

//     if (!productId || !batchNo || quantity == null || !expiryDate) {
//       return res.status(400).json({
//         message: "productId, batchNo, quantity and expiryDate are required"
//       });
//     }

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // shop comes from logged-in user
//     const shopId = req.user.shop;

//     const batch = await Batch.create({
//       shop: shopId,
//       product: productId,
//       batchNo,
//       quantity,
//       prices,
//       expiryDate
//     });

//     return res.status(201).json({
//       message: "Batch created successfully",
//       batch
//     });

//   } catch (error) {

//     console.error("Create batch error:", error);

//     return res.status(500).json({
//       message: "Server error while creating batch"
//     });

//   }
// };
// module.exports = {
//   createBatch,
// };

const Batch = require('../models/Batch');
const Product = require('../models/Product');

const createBatch = async (req, res) => {
  try {

    const { shop, productId, batchNo, quantity, prices, expiryDate } = req.body;

    if (!shop || !productId || !batchNo || quantity == null || !expiryDate) {
      return res.status(400).json({
        message: "shop, productId, batchNo, quantity and expiryDate are required"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const batch = await Batch.create({
      shop,
      product: productId,
      batchNo,
      quantity,
      prices,
      expiryDate
    });

    return res.status(201).json({
      message: "Batch created successfully",
      batch
    });

  } catch (error) {

    console.error("Create batch error:", error);

    return res.status(500).json({
      message: "Server error while creating batch"
    });

  }
};

module.exports = {
  createBatch,
};