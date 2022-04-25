const express = require("express");
const vendorController = require("../controllers/vendorController");

const router = express.Router();

router.route("/available").get(vendorController.getVendor);

module.exports = { vendorRoutes: router };
