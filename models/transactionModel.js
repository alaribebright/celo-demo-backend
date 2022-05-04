const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    creditAmount: {
        type: Number,
        required: true
    },
    debitAmount: {
        type: Number,
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    transactionType: {
        type: String,
        enum : ['transfer', 'deposit', 'withdrawal'],
        required: true
    },
    onChainTransactionId: {
        type: String
    },
    transactionStatus: {
        type: String,
        enum : ['pending', 'success', 'failed'],
        required: true   },    
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
