const Vendor = require("../models/vendorModel");

const getVendor = async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount);
    const countryCode = req.query.countryCode;

    const defaultNetwork = process.env.DEFAULT_NETWORK;

    // RATE // VENDOR_NAME // VENDOR_ID ??response

    if (defaultNetwork === "celo") {
      const vendors = await Vendor.find()
        .where("liquidity")
        .gte(amount)
        .where("countryCode")
        .equals(countryCode);

      if (vendors.length) {
        return res.status(200).json({
          status: "success",
          data: vendors,
        });
      }
    } else {
      const vendors = await Vendor.find({
        $and: [{ bscBalance: { $gte: amount } }, { defaultNetwork: "bsc" }],
      });

      if (vendors.length) {
        return res.status(200).json({
          status: "success",
          data: vendors,
        });
      }
    }

    throw new Error("No Available vendors");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: error.message,
    });
  }
};

module.exports = { getVendor };
