const express = require("express");
const user = require("../models/userModel");
const { getUser, updateuser, LogIn, registerUser, deleteuser, verifyToken } = require("../controlers/userControl");
const router = express.Router();
const { validateUser, validateLogin } = require("../Validation/userValidation");




router.get("/", getUser)
router.get("/verify", verifyToken)
router.post("/register", validateUser, registerUser)
router.post("/login", validateLogin, LogIn)
router.put("/update", updateuser)
router.delete("/delete", deleteuser)

module.exports = router;