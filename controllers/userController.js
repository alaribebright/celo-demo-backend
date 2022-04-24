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
        status: "error"
    });
    console.log("FECHING USER ERORR", error);
  }
};

module.exports = { getUsers };
