const express = require("express");
const router = express.Router();

const { getExpiryAlerts } = require("../controllers/expiryController");

router.get("/", getExpiryAlerts);

module.exports = router;