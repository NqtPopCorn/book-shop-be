import express from "express";
import promotionController from "../controllers/billPromotionController";

const router = express.Router();
router.get("/", promotionController.handleGetPage);
router.post("/", promotionController.handleCreate);
// router.get("/:orderId", promotionController.handleGetById);
router.post("/:id", promotionController.handleUpdate);
// router.get("/status/all", promotionController.handleGetAllProviders);

module.exports = router;
