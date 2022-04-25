const Vendor = require("../models/vendorModel");

// Available Vendors
// Query: > Amount &&
// currency
// /api/vendors/available
// Vendor
//        Rates

const getVendor = async (req, res) => {
  const amount = +req.query.amount;

  const defaultNetwork = process.env.DEFAULT_NETWORK;

  // defaultNetwork=celo

  // amount >= balance
  // checking defaultNetwork === vendor.sometng AND amount > balance

  const vendors = await Vendor.find();

  if (vendors) {
    const availableVendors = vendors.filter((vendor) => {
      if (defaultNetwork === "celo") {
        console.log(vendor.celoBalance);
      }
    });

    res.status(200).json({
      status: "success",
      data: availableVendors,
    });
  }

  try {
  } catch (error) {}
};

module.exports = { getVendor };
