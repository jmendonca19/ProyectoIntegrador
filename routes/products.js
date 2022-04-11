const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")

router.get("/products", productController.index);
router.get("/products-add", productController.add);
router.get("/searchResults", productController.searchResults);


module.exports = router;