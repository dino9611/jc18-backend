const express = require("express");
const router = express.Router();
const { productController } = require("./../controllers");
const { getProducts, addProducts, editProduct, getProductById, deleteProduct } =
  productController;

const { verifyTokenAccess } = require("./../helpers").verifiToken;

router.get("/", getProducts);
router.post("/", addProducts);
router.patch("/:id", editProduct);
router.get("/:id", verifyTokenAccess, getProductById);
router.delete("/:id", deleteProduct);

module.exports = router;
