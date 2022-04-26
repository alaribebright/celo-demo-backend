const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    countryCode: {
      type: String,
      required: true,
    },
    celoWalletAddress: { type: String },
    bankDetails: {
      details: {
        bankName: String,
        name: String,
        number: String,
      },
    },
    mPesa: { name: String, phoneNumber: String },
    liquidity: [
      {
        network: String,
        walletAddress: String,
        balance: Number,
        availableBalance: Number,
      },
      { network: String, walletAddress: String, balance: Number },
    ],
    rates: [
      { currency: String, rate: Number },
      { currency: String, rate: Number },
    ],
    bscBalance: Number,
    celoBalance: Number,
    defaultNetwork: String,
    availableBalance: Number,
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
