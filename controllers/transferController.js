const Vendor = require("../models/vendorModel");

const transferCreate = async (req, res) => {
  console.log(req.body);
  try {
    const { senderId, amount, receiverId, vendorId } = req.body;

    // Calculating the transaction Fees
    const transactionFees = +amount * 0.01 + +amount;

    // Finding the vendor by ID
    const vendor = await Vendor.findById(vendorId);

    const vendorBalance =
      process.env.DEFAULT_NETWORK === "celo"
        ? vendor.liquidity[0].availableBalance.availableBalance
        : vendor.liquidity[1].availableBalance.availableBalance;

    console.log(vendorBalance, "THE VENDOR BALANCE")

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

// ?? Check if the vendor via liquidity
// amount
// ?? LOCK liquidity by reducing availableBalance
// ?? Notify Vendor
// status: “awaiting sender”

// Res transfer + vendor
