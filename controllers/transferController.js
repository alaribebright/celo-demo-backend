const Vendor = require("../models/vendorModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

const defaultNetwork = process.env.DEFAULT_NETWORK;

const createPendingP2PTransfer = async (req, res) => {
  try {
    const { senderId, amount, receiverId, receiverCurrency, vendorId } = req.body;
    const parseAmount = parseFloat(amount);

    // Calculating the transaction Fees
    const transactionFees = parseAmount * 0.01;
    const totalAmountUsd = transactionFees + parseAmount;

    // find sender
    const sender = User.findById(senderId);
    // sender wallet balance
    const walletBalance = sender.walletBalance;
    if (walletBalance < totalAmountUsd) {
      return res.status(400).json({
        status: "fail",
        data: "Sender does not have enough balance for this transaction",
      });
    }

    // Finding the vendor by ID
    const vendor = await Vendor.findById(vendorId);
    // vendor balance
    const vendorBalance = vendor.liquidity[defaultNetwork].walletBalance;
    if (vendorBalance < totalAmountSentUsd) {
      return res.status(400).json({
        status: "fail",
        data: "Vendor does not have enough balance for this transaction",
      });
    }
    console.log(vendor);
    // since this is a transfer, a vendor will always be selling USD, and not buying
    const vendorRate = await Vendor.findOne({
      'sellRates.currency': receiverCurrency
    }).exec().then();

    const recepient = await User.findById(receiverId);
    if (!recepient) {
      return res.status(400).json({
        status: "fail",
        data: `Recepient with ID ${receiverId} does not exist`,
      });
    }

    // create order -- pending
    const order = await Order.create({
      localCurrency: sender.localCurrency,
      amountIntendedUsd: amount,
      fee: 0.1,
      totalAmountUsd,
      // totalAmountLocal: totalAmountUsd * 
      orderType: 'transfer',
      orderStatus: 'pending',
      orderInitiator: senderId,
      orderRecepient: receiverId,
      orderVendor: vendorId,
      vendorExchangeRate: 0
    });

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    console.log(error);
  }
};

const sendP2PTransferToVendor = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

module.exports = { transferP2P };

// ?? Check if the vendor via liquidity
// amount
// ?? LOCK liquidity by reducing availableBalance
// ?? Notify Vendor
// status: “awaiting sender”

// Res transfer + vendor
