const express = require("express");
const router = express.Router();
const { registerCustomerController } = require("../controllers/customerController");

router.post("/register", registerCustomerController);

module.exports = router;