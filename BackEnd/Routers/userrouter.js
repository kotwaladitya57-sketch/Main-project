const express = require("express");
const user = require("../models/userModel");
const { getUser, updateuser, LogIn, registerUser, deleteuser, verifyToken } = require("../controlers/userControl");
const router = express.Router();
const valid = require("../Validation/userValidation");




router.get("/", getUser)
router.get("/verify", verifyToken)
router.post("/register", valid, registerUser)
router.post("/login", valid, LogIn)
router.put("/update", updateuser)
router.delete("/delete", deleteuser)

module.exports = router;