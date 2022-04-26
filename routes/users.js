const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("").get(userController.getUsers);

router.route("/:param").get(userController.getUser);

module.exports = { userRoutes: router };
