const {User} = require("../models/userModel");

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
    const userParam = req.params.param;

    const validateEmail = (validateString) => {
      return String(validateString)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    let foundUser = null;

    if (!!validateEmail(userParam)) {
      foundUser = await User.findOne({ email: userParam });
    } else {
      foundUser = await User.findById(userParam);
    }
    // $or: [{ _id: userParam }, { email: userParam }],

    res.status(200).json({
      status: "success",
      data: foundUser,
    });
  } catch (error) {
    console.log("ERROR FEC", error);
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
