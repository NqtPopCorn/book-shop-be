import express from "express";
import thongKeController from "../controllers/thongKeController";

const router = express.Router();
router.get("/receipts", thongKeController.handleGetReceipts);

module.exports = router;
