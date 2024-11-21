const express = require("express");
const router = express.Router();
const { getDetailProductByID, getImagesForThumbnailController, getRelatedProductController } = require("../controllers/detailProductController");

router.get("/product", getDetailProductByID);
router.get("/images-thumbnail", getImagesForThumbnailController);
router.get("/related-product", getRelatedProductController)

module.exports = router;