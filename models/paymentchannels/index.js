const mongoose = require("mongoose");

const paymentChannelSchema = mongoose.Schema(
  {
    bankname: { type: String },
    accountnumber: { type: Number },
    accountname: { type: String }
  },
  {
    discriminatorKey: 'channel',
    timestamps: true
  }
);

const PaymentChannel = mongoose.model("PaymentChannel", paymentChannelSchema);

module.exports = {
  paymentChannelSchema,
  PaymentChannel
};
