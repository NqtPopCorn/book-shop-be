const express = require("express");
const router = express.Router();
const { registerCustomerController, getCustomerInfoController, updateCustomerInfoController, getDiscountBookController } = require("../controllers/customerController");


router.post("/register", registerCustomerController);
router.get("/info", getCustomerInfoController);
router.put("/update", updateCustomerInfoController);
router.get("/discount-book", getDiscountBookController);


module.exports = router; 