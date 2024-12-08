const express = require('express');
const router = express.Router();
const { getAllBillPromotionsController, insertOrderController, getBooksController } = require('../controllers/cartController');

router.get("/promotion", getAllBillPromotionsController);
router.post("/order", insertOrderController);

router.get("/books", getBooksController);

module.exports = router;