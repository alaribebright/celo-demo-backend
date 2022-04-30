const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    localCurrency: {
      type: String,
      required: true,
    },
    celoWalletAddress: {
      type: String,
      required: true,
    },
    bscWalletAddress: {
      type: String,
      required: true,
    },
    bankDetails: {
      name: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: String,
        required: true,
      },
      bankName: {
        type: String,
        required: true,
      },
    },
    mPesa: {
      name: String,
      phoneNumber: String,
    },
    email: {
      type: String,
      required: true,
    },
    walletBalance: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
