const mongoose = require("mongoose");
const { paymentChannelSchema } = require("./paymentchannels/index");
const { mPesaSchema } = require("./paymentchannels/mpesa");

const walletSchema = mongoose.Schema({
  network: String,
  walletAddress: String,
  balance: Number
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    localCurrency: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    paymentChannels: [paymentChannelSchema],
    wallets: {
      celo: {
        type: walletSchema
      },
      bsc: {
        type: walletSchema
      },
    }
  },
  {
    timestamps: true,
  }
);

const paymentChannelsArray = userSchema.path('paymentChannels');
const mpesa = paymentChannelsArray.discriminator('mpesa', mPesaSchema);

module.exports = mongoose.model("User", userSchema);