const Vendor = require("../models/vendorModel");
const User = require("../models/userModel");
const TransferOrder = require("../models/transferOrderModel");

const defaultNetwork = process.env.DEFAULT_NETWORK;

const createPendingP2PTransfer = async (req, res, next) => {
  try {
    const { senderId, amount, receiverId, receiverCurrency, vendorId } = req.body;
    const parseAmount = parseFloat(amount);

     
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

    // create transfer -- pending
    const transfer = await TransferOrder.create({
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

    return res.status(200).json({
      status: "success",
      data: transfer,
    });
  } catch (error) {
    return next(error);
  }
};

const sendP2PTransferToVendor = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    let transfer = await TransferOrder.findById(orderId);
    const { orderStatus } = transfer;

    if (orderStatus !== 'pending') {
      return res.status(400).json({
        status: "fail",
        data: `Transfer Order is not pending`
      });
    }
    transfer.orderStatus = 'funds_sent_to_vendor';
    transfer = await transfer.save();
    return res.status(200).json({
      status: "success",
      data: transfer,
    });
  } catch (error) {
    return next(error);
  }
};

const vendorApproveP2PTransfer = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    let transfer = await TransferOrder.findById(orderId);
    const { orderStatus } = transfer;

    if (orderStatus !== 'funds_sent_to_vendor') {
      return res.status(400).json({
        status: "fail",
        data: `Transfer Order has not been confirmed by sender`
      });
    }
    transfer.orderStatus = 'completed';
    // create transaction
    transfer = await transfer.save();
    return res.status(200).json({
      status: "success",
      data: transfer,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createPendingP2PTransfer, sendP2PTransferToVendor };

// ?? Check if the vendor via liquidity
// amount
// ?? LOCK liquidity by reducing availableBalance
// ?? Notify Vendor
// status: “awaiting sender”

// Res transfer + vendor
