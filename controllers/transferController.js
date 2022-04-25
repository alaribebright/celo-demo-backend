const Vendor = require("../models/vendorModel");

const transferCreate = async (req, res) => {
  try {
    const { senderId, amount, receiverId, vendorId } = req.body;

    const txnFees = +amount * 0.01 + +amount;

    const vendor = await Vendor.findById(vendorId);

    const newVendor = { ...vendor }

    const updateVendor = await Vendor.findByIdAndUpdate(vendorId, {
      availableBalance: newVendor._doc.availableBalance - txnFees,
    });

    // Locking the liquidity
    // console.log(updateVendor);

    res.status(200).json({
      status: "success",
      data: updateVendor,
    });
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
