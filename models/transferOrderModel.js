/*
local_currency - String
amount_intended_usd - 
fee - 
total_amount_sent_usd - 
total_amount_sent_local - 
vendor - User
rate - 
type - (withdrawal or deposit)
status - pending, funds_sent_to_vendor, completed ==> needs to be CONSTANT or enum
sender - user link
recepient - user link
vendor - user link

-- create a pending transfer when trf is initiated
-- update transfer when user says they have transferred the funds (update vendor)
-- update transfer to completed when vendor approves. create a transactions record when the order is completed. see transactions table
*/

const mongoose = require("mongoose");

const transferOrderSchema = mongoose.Schema(
  {
    localCurrency: {
        type: String,
        required: true
    },
    amountIntendedUsd: {
        type: Number,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    totalAmountUsd: {
        type: Number,
        required: true
    },
    totalAmountLocal: {
        type: Number,
        required: true
    },
    orderType: {
        type: String,
        enum : ['transfer', 'deposit', 'withdrawal'],
        required: true
    },
    orderStatus: {
        type: String,
        enum : ['pending', 'funds_sent_to_vendor', 'completed'],
        required: true
    },
    orderInitiator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    orderRecepient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    orderVendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    vendorExchangeRate: {
        type: Number,
        required: true
    },
    onChainTransactionId: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

const TransferOrder = mongoose.model("TransferOrder", transferOrderSchema);

module.exports = TransferOrder;
