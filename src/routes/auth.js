import express from "express";
import authController from "../controllers/authController";

let router = express.Router();

router.post("/register", authController.handleRegister);
router.post("/login", authController.handleLogin);


module.exports = router;