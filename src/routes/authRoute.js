const express = require("express");
const { verifyEmailToken, verifyTokenAccess } =
  require("../helpers").verifyToken;
const router = express.Router();
const { authController } = require("./../controllers");

const {
  register,
  login,
  hashingString,
  kirimEmail,
  verified,
  sendVerifiedEmail,
  keepLogin,
} = authController;

router.get("/login", login);
router.post("/register", register);
router.get("/hash", hashingString);
router.get("/kirimemail", kirimEmail);
router.get("/kirimemail", kirimEmail);
router.get("/verified", verifyEmailToken, verified);
router.get("/send/verified/:id_user", sendVerifiedEmail);
router.get("/keep/login", verifyTokenAccess, keepLogin);
// lupa password
module.exports = router;
