const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("").get(userController.getUsers);

router.route("/:param").get(userController.getUser);

router.route("/register").post(userController.registerUser);

router.route("/login").post(userController.loginUser);


module.exports = { userRoutes: router };
