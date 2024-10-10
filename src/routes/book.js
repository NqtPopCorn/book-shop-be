import express from "express";
import bookController from "../controllers/bookController";

let router = express.Router();

router.get("/", bookController.handleGetPage);
router.get("/page", bookController.handleGetPage);
router.get("/test", bookController.test);

module.exports = router;
