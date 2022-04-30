const express = require("express");
const transferController = require("../controllers/transferController");

const router = express.Router();

router.route("/p2p").post(transferController.transferP2P);

module.exports = { transferRoutes: router };
