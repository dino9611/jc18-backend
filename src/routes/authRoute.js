const express = require("express");
const router = express.Router();
const { authController } = require("./../controllers");
const { register, login, hashingString } = authController;

router.get("/login", login);
router.post("/register", register);
router.get("/hash", hashingString);

module.exports = router;
