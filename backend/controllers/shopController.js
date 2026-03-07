const Shop = require('../models/Shop');

// POST /api/shops/register
const registerShop = async (req, res) => {
  try {
    const {
      name,
      shopType,
      licenseNo,
      gst,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      contactNumber,
    } = req.body;

    if (!name || !shopType) {
      return res.status(400).json({ message: 'Name and shopType are required' });
    }

    if (!['General', 'Pharma'].includes(shopType)) {
      return res.status(400).json({ message: 'shopType must be General or Pharma' });
    }

    if (shopType === 'Pharma' && !licenseNo) {
      return res.status(400).json({ message: 'licenseNo is mandatory for Pharma shops' });
    }

    const shop = await Shop.create({
      name,
      owner: req.user ? req.user.id : undefined,
      shopType,
      licenseNo,
      gst,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      contactNumber,
      status: 'Pending',
      verifyType: 'Basic',
    });

    return res.status(201).json({
      message: 'Shop registered successfully',
      shop,
    });
  } catch (error) {
    console.error('Register shop error:', error);
    return res.status(500).json({ message: 'Server error during shop registration' });
  }
};

module.exports = {
  registerShop,
};

