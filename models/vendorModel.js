const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
