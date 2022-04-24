const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("../helpers/connectDB");
// const userRoutes = require("/routes/users.js");

const app = express();

connectDB();

// GET USER ROUTES
app.use("/api/users", require("../routes/users").userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("App running on PORT " + PORT);
});
