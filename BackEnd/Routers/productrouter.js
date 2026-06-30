const express = require("express");
const { allData, addProduct, updatedProduct, deleteProduct } = require("../controlers/prductControl");
const checkLogin = require("../Validation/checklogin");
const router = express.Router();

router.get("/", allData)
router.post("/add", checkLogin, addProduct)
router.put("/update", checkLogin, updatedProduct)
router.delete("/delete", checkLogin, deleteProduct);

module.exports = router;