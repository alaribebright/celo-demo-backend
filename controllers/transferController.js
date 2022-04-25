const Vendor = require("../models/vendorModel");

const transferCreate = async (req, res) => {
  try {
    const { senderId, amount, receiverId, vendorId } = req.body;

    const transactionFees = +amount * 0.01 + +amount;

    const vendor = await Vendor.findById(vendorId);

    const copiedVendor = { ...vendor };

    const vendorBalance =
      process.env.DEFAULT_NETWORK === "celo"
        ? copiedVendor._doc.liquidity[0].availableBalance
        : copiedVendor._doc.liquidity[1].availableBalance;

    if (vendorBalance >= amount + transactionFees) {
      // lock the liquidity by reducing the user balance
      copiedVendor._doc.liquidity[0].availableBalance =
        vendorBalance - (amount + transactionFees);

      console.log(copiedVendor);
    } else {
      throw new Error("This vendor cannot satisfy this operation");
    }

    // ?? LOCK liquidity by reducing availableBalance
    // ?? Notify Vendor
    // status: “awaiting sender”

    // Res transfer + vendor

    // Create a field called fees

    res.status(200).json({
      status: "success",
      data: "",
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
