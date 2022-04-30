const express = require("express");
const transferController = require("../controllers/transferController");

const router = express.Router();

router.route("/p2p").post(transferController.createPendingP2PTransfer);

module.exports = { transferRoutes: router };
