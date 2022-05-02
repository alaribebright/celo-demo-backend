const mongoose = require("mongoose");
const { paymentChannelSchema } = require("./paymentchannels/index");
const { mPesaSchema } = require("./paymentchannels/mpesa");

const liquiditySchema = mongoose.Schema({
  network: String,
  walletAddress: String,
  balance: Number,
  availableBalance: Number,
});

const vendorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    countryCode: {
      type: String,
      required: true,
    },
    paymentChannels: [paymentChannelSchema],
    liquidity: {
      celo: {
        type: liquiditySchema
      },
      bsc: {
        type: liquiditySchema
      },
    },
    rates: [
      { currency: String, sellRate: Number, buyRate: Number }
    ],
    defaultNetwork: String
  },
  {
    timestamps: true,
  }
);

const paymentChannelsArray = vendorSchema.path('paymentChannels');

const mpesa = paymentChannelsArray.discriminator('mpesa', mPesaSchema);
const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = { Vendor, mpesa };
