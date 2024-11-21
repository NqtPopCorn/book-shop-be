const express = require("express");
const router = express.Router();
const { getOrdersController } = require("../controllers/orderConfirmationController");

router.get("/orders", getOrdersController);

module.exports = router;