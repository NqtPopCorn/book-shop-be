import express from "express";
import orderController from "../controllers/orderController";

const router = express.Router();
router.get("/", orderController.handleGetPage);
router.post("/", orderController.handleCreate);
// router.get("/:orderId", orderController.handleGetById);
// router.get("/status/all", orderController.handleGetAllProviders);

module.exports = router;
