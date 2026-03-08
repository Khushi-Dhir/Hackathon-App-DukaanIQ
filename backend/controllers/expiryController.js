const Batch = require("../models/Batch");

exports.getExpiryAlerts = async (req, res) => {

  try {

    const today = new Date();
    const next30Days = new Date();

    next30Days.setDate(today.getDate() + 30);

    const batches = await Batch.find({
      expiryDate: { $lte: next30Days }
    })
      .populate("product", "productName")
      .sort({ expiryDate: 1 });

    res.json(batches);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch expiry alerts"
    });

  }

};