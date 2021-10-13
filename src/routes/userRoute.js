const express = require("express");
const router = express.Router();
const { userController } = require("./../controllers");
const { getUsers, editUser, deleteUser, addUser } = userController;

router.delete("/:iduser", deleteUser);
router.put("/:iduser", editUser);
router.get("/", getUsers);
router.post("/", addUser);

module.exports = router;
