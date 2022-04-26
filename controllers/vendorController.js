const Vendor = require("../models/vendorModel");

const getVendor = async (req, res) => {
  const amount = +req.query.amount;

  const defaultNetwork = process.env.DEFAULT_NETWORK;

  if (defaultNetwork === "celo") {
    const vendors = await Vendor.find({
      $and: [{ celoBalance: { $gte: amount } }, { defaultNetwork: "celo" }],
    });

    if (vendors.length) {
      return res.status(200).json({
        status: "success",
        data: vendors
      })
    }
  }

  res.status(200).json({
    status: "success",
    data: "",
  });

  try {
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: error.message,
    });
  }
};

module.exports = { getVendor };
