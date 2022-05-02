const { Vendor } = require("../models/vendorModel");

const defaultNetwork = process.env.DEFAULT_NETWORK;

const fetchVendors = async (amount, countryCode, orderType) => {
  let vendors = null;
  try {
    if (orderType === 'deposit' || 'transfer') {
      vendors = await Vendor.find({
        [`liquidity.${defaultNetwork}.availableBalance`]: { $gte: amount },
        countryCode
      }).select('name rates _id').sort({ [`rates.${countryCode}.buyRate`]: 1 }).exec();
    } else {
      // its a withdrawal, so the vendor is buying $
      vendors = await Vendor.find({
        [`liquidity.${defaultNetwork}.availableBalance`]: { $gte: amount },
        countryCode
      }).select('name rates _id').sort({ [`rates.${countryCode}.sellRate`]: 1 }).exec();
    }
    return vendors;
  } catch (error) {
    return error;
  }
};

const getVendor = async (req, res) => {
  try {
    const { amount, country, orderType } = req.query;

    const availableVendors = await fetchVendors(parseFloat(amount), country, orderType);
    return res.status(200).json({
      status: "success",
      data: availableVendors,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: error.message,
    });
  }
};

module.exports = { getVendor };
