const express = require("express");
const router = express.Router();
const { productController } = require("./../controllers");
const { getProducts, addProducts, editProduct, getProductById, deleteProduct } =
  productController;

router.get("/", getProducts);
router.post("/", addProducts);
router.patch("/:id", editProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

module.exports = router;
