const express = require("express");
const router = express.Router();
const ProductController = require("../Controller/product.controller");
const { verifyToken } = require("../middleware/auth");

router.get("/products", verifyToken, ProductController.getallproducts);
router.post("/products", verifyToken, ProductController.addnewProduct);

module.exports = router;
