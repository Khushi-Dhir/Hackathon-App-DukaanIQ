const Batch = require('../models/Batch');
const Product = require('../models/Product');

const getInventoryAnalytics = async (req, res) => {
  try {

    // TOTAL STOCK PER PRODUCT
    const stockAggregation = await Batch.aggregate([
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: "$product"
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          productName: "$product.productName",
          category: "$product.category",
          productType: "$product.productType",
          totalQuantity: 1
        }
      }
    ]);

    // EXPIRY CHECK
    const now = new Date();
    const in30Days = new Date();
    in30Days.setDate(now.getDate() + 30);

    const expiringBatches = await Batch.find({
      expiryDate: { $gte: now, $lte: in30Days }
    }).populate("product", "productName category productType");

    // CATEGORY + TYPE ANALYTICS
    const categoryMap = {};
    const typeMap = {};

    stockAggregation.forEach((item) => {

      if (item.category) {
        categoryMap[item.category] =
          (categoryMap[item.category] || 0) + item.totalQuantity;
      }

      if (item.productType) {
        typeMap[item.productType] =
          (typeMap[item.productType] || 0) + item.totalQuantity;
      }

    });

    const byCategory = Object.entries(categoryMap).map(([category, totalQuantity]) => ({
      category,
      totalQuantity
    }));

    const byProductType = Object.entries(typeMap).map(([productType, totalQuantity]) => ({
      productType,
      totalQuantity
    }));

    return res.json({

      totalStockPerProduct: stockAggregation,

      expiringBatches: expiringBatches.map((b) => ({
        batchId: b._id,
        productId: b.product?._id,
        productName: b.product?.productName,
        category: b.product?.category,
        productType: b.product?.productType,
        batchNo: b.batchNo,
        quantity: b.quantity,
        expiryDate: b.expiryDate,
        mrpPrice: b.prices?.mrp,
        sellingPrice: b.prices?.selling
      })),

      categoryBreakdown: {
        byCategory,
        byProductType
      }

    });

  } catch (error) {

    console.error("Inventory analytics error:", error);

    return res.status(500).json({
      message: "Server error while fetching inventory analytics"
    });

  }
};

module.exports = {
  getInventoryAnalytics
};