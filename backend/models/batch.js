const mongoose = require('mongoose');

const pricesSchema = new mongoose.Schema(
  {
    mrp: {
      type: Number,
      required: false,
    },
    selling: {
      type: Number,
      required: false,
    },
  },
  { _id: false }
);

const batchSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    batchNo: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    prices: pricesSchema,
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;

