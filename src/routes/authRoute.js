const express = require("express");
const { verifyEmailToken } = require("../helpers").verifiToken;
const router = express.Router();
const { authController } = require("./../controllers");

const {
  register,
  login,
  hashingString,
  kirimEmail,
  verified,
  sendVerifiedEmail,
} = authController;

router.get("/login", login);
router.post("/register", register);
router.get("/hash", hashingString);
router.get("/kirimemail", kirimEmail);
router.get("/kirimemail", kirimEmail);
router.get("/verified", verifyEmailToken, verified);
router.get("/send/verified", sendVerifiedEmail);

module.exports = router;
