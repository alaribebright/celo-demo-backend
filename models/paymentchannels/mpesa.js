const mongoose = require("mongoose");

const mPesaSchema = mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    metadata: { type: Object }
});

module.exports = {
    mPesaSchema
}