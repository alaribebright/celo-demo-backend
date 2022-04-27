const Vendor = require("../models/vendorModel");

const defaultNetwork = process.env.DEFAULT_NETWORK;

const transferCreate = async (req, res) => {
  try {
    const { senderId, amount, receiverId, vendorId } = req.body;
    const parseAmount = parseFloat(amount);

    // Calculating the transaction Fees
    const transactionFees = parseAmount * 0.01;
    const totalFees = transactionFees + parseAmount;

    // Finding the vendor by ID
    // We can first validate the ID
    // Not best approach for the QUERY
    const vendor = await Vendor.findOne({
      [`liquidity.${defaultNetwork}.availableBalance`]: { $gte: totalFees },
    })
      .where("_id")
      .equals(vendorId);

    if (!vendor)
      return res.status(400).json({
        status: "fail",
        data: "Not enough balance for this operation",
      });

    // ?? LOCK liquidity by reducing availableBalance
    // ?? Notify Vendor
    // status: “awaiting sender”

    // Res transfer + vendor

    // Create a field called fees

    res.status(200).json({
      status: "success",
      data: vendor,
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
