const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("DATA BASE CONNNECTION SUCCESSFUL");
  } catch (error) {
    console.log("DB CONNECTION FAILED", error);
    process.exit(1);
  }
};

module.exports = connectDB;
