const Vendor = require("../models/vendorModel");

const defaultNetwork = process.env.DEFAULT_NETWORK;

const fetchVendors = async (amount, countryCode) => {
  try {
    const vendors = await Vendor.find({
      [`liquidity.${defaultNetwork}.availableBalance`]: { $gte: amount },
    })
      .where("countryCode")
      .equals(countryCode);
    return vendors;
  } catch (error) {
    return error;
  }
};

const getVendor = async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount);
    const countryCode = req.query.countryCode;

    const availableVendors = await fetchVendors(amount, countryCode);
    const formattedVendors = availableVendors.map((availableVendor) => ({
      name: availableVendor.name,
      rates: availableVendor.rates,
      id: availableVendor._id,
    }));
    return res.status(200).json({
      status: "success",
      data: formattedVendors,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: error.message,
    });
  }
};

module.exports = { getVendor };
