const express = require("express");
const router = express.Router();
const selectedProduct = require("../Controller/selectedProducts.controller");
const { verifyToken } = require("../middleware/auth");

router.get("/selected", verifyToken, selectedProduct.getallSelectedProducts);
router.post("/selected/:id", verifyToken, selectedProduct.addproducts);
router.delete("/selected", verifyToken, selectedProduct.addproducts);

module.exports = router;
