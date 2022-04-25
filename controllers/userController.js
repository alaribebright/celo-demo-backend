const User = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
    });
    console.log("FECHING USER ERORR", error);
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    //     "celoWalletAddress": "",
    // "bscWalletAddress": "jane@mailinator.com",

    // GET USER BALANCE FROM BLOCK CHAIN AND ADD TO USER OBJECT...

    if (user) {
      res.status(200).json({
        status: "success",
        data: user,
      });
    }
    throw new Error("User not found");
  } catch (error) {
    res.status(404).json({
      status: "error",
    });
    console.log("FECHING USER ERORR", error);
  }
};

const getUserBalance = async (req, res) => {
  try {
    // To query
  } catch (error) {
    //
  }
};

module.exports = { getUsers, getUser };
