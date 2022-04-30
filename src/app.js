const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors')
const connectDB = require("../helpers/connectDB");

const app = express();
app.use(cors())
app.use(express.json())

connectDB();

// USER ROUTES
app.use("/api/users", require("../routes/users").userRoutes);

// VENDOR ROUTES
app.use("/api/vendors", require("../routes/vendors").vendorRoutes);

// TRANSFER ROUTES
app.use("/api/transfers", require("../routes/transfer").transferRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("App running on PORT " + PORT);
});
