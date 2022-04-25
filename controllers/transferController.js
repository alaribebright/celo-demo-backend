const Vendor = require("../models/vendorModel");

const transferCreate = async (req, res) => {
  try {
    const { senderId, amount, receiverId, vendorId } = req.body;

    const txnFees = amount * 0.01 + amount;

    // vendor check via liquidity...

    // Get the vendorID and query
    const vendor = await Vendor.find({ _id: vendorId });

    console.log(vendor)

    // ?? Check if the vendor via liquidity
    // amount
    // ?? LOCK liquidity by reducing availableBalance
  } catch (error) {
    console.log(error);
  }
};

module.exports = { transferCreate };

// Transfer
// Unique to a user

// /api/transfer/create POST
// senderId, amount, receiverId, vendorId
// **Add fees to the amount (1% of amount) + amount
// ?? Check if the vendor via liquidity
// amount
// ?? LOCK liquidity by reducing availableBalance
// ?? Notify Vendor
// status: “awaiting sender”
