const express = require("express");
const transferController = require("../controllers/transferController");

const router = express.Router();

router.route("/").post(transferController.transferCreate);

module.exports = { transferRoutes: router };
