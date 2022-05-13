const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


// @desc   Register a new user
// @route  POST /api/v1/users/register
// @access Public

const registerUser = async (req, res) => {
  res.send ('register Route')
  // const { name, email, countryCode, localCurrency, password } = req.body;


  // Validation
  // if (!name || !email || !countryCode || !password || !localCurrency) {
  //   res.status(400) 
  // }

//   // Find if user alredy exists
//   // const userExists = await User.findOne({ email});
 
//   if (userExists) {
//     res.status(400)
//     throw new Error("User already exists");
//   }

//   //Hash password
//   const salt = await bcrypt.genSalt(10)
//   const hashedPassword = await bcrypt.hash(password, salt)

//   // Create user 
//   const User = await User.create({
//     name,
//     email,
//     countryCode,
//     password: hashedPassword
//   })

//   if (User) {
//     res.status(201).json({
//       _id: User._id,
//       name: User.name,
//       email: User.email,
//       countryCode: User.countryCode,
//       token: generateToken(User._id)
//     })
//   } else {
//     res.status(400)
//     throw new error('Invalid user data')
// }
console.log(req.body);
} 

// @desc   Login a user
// @route  POST /api/v1/users/login
// @access Public

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      countryCode: user.countryCode,
      token: generateToken(User._id)
    })
  }
  else {
    res.status(401)
    // throw new error('Invalid cridentials')
}

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '40d'
  });
}
};

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

module.exports = { registerUser, loginUser, getUsers, getUser };
