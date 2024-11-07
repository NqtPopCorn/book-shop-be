import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();

router.get("/", homeController.getHomePage);

router.get("/about", homeController.getAboutPage);

router.get("/crud", homeController.getCRUD);

router.post("/post-crud", homeController.postCRUD);

router.get("/get-crud", homeController.displayGetCRUD);

router.get("/edit-crud", homeController.getEditCRUD);

router.post("/put-crud", homeController.putCRUD);

router.get("/delete-crud", homeController.deleteCRUD);

module.exports = router;
