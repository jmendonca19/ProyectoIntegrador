const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productController = require("../controllers/productController")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
});

var upload = multer({ storage: storage})

router.get("/product/:id", productController.detail);

router.get("/products-add", productController.add);
router.post("/products-add",upload.single('image_product'), productController.productStore);

router.get("/product-edit/:id", productController.edit);
router.post("/product-edit/update",upload.single('image_product'), productController.productUpdate);

router.get("/searchResults", productController.searchResults);


module.exports = router;

