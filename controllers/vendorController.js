const { Vendor } = require("../models/vendorModel");

const defaultNetwork = process.env.DEFAULT_NETWORK;

const fetchVendors = async (amount, countryCode, currency, orderType) => {
  /* 
    there are still a few things to consider
      -- filtering by order type - though i added a condition for this, it needs to be optimized
      -- sellRate and buyRate is only based on USD right now. it might make more sense to allow multicurrency from now (and I dont think it'll require much work for @Alaribe Bright or whoever else is working on it). so you have a baseCurrency and quoteCurrency
      -- I also believe the amount you're sending from the frontend includes the fee. this may need some refactoring going forward
  */
  try {
    let rate = orderType === 'withdrawal' ? 'rates.buyRate' : 'rates.sellRate';
    const vendors = await Vendor.find({
      [`liquidity.${defaultNetwork}.availableBalance`]: { $gte: amount },
      [`rates.${currency}`]: currency,
      countryCode
    }).select('name rates _id').sort({ [rate]: 1 }).exec();
    return vendors;
  } catch (error) {
    return error;
  }
};

const getVendors = async (req, res) => {
  try {
    const { amount, country, currency, orderType } = req.query;

    const availableVendors = await fetchVendors(parseFloat(amount), country, currency, orderType);
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

module.exports = { getVendors };
