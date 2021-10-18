const express = require("express");
const router = express.Router();
const { productController } = require("./../controllers");
const {
  getProducts,
  addProducts,
  editProduct,
  getProductById,
  deleteProduct,
  tesUpload,
  tesUploadOtherVer,
} = productController;
const { verifyToken, uploader } = require("./../helpers");
const { verifyTokenAccess } = verifyToken;

const uploadFile = uploader("/tes", "TES").fields([
  { name: "tes", maxCount: 3 },
]);

router.get("/", getProducts);
router.post("/", addProducts);
router.patch("/:id", editProduct);
router.get("/:id", verifyTokenAccess, getProductById);
router.delete("/:id", deleteProduct);
router.post("/tesupload", uploadFile, tesUpload);
router.post("/tesupload2", tesUploadOtherVer);

module.exports = router;
