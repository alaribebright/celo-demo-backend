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

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
    });
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
