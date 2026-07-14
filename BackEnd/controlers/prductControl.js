const express = require("express");
const router = express.Router();
const product = require("../models/productModel");
const jwt = require("jsonwebtoken")

const allData = async (req, res) => {
    let data = await product.find();
    res.send(data)
};
const addProduct = async (req, res) => {

    try {
        
        let data = req.body;
        let newproduct = await product.create(data);
        res.send(newproduct)
    }
    catch (err) {
        res.status(500).send(err);
    }
};

const updatedProduct = async (req, res) => {

    try {
        let header = req.headers.authorization;
        if (!header) {
            return res.status(401).send("No Header Provided");
        }

        let token = header.split(" ")[1];

        if (!token) {
            return res.status(401).send("No Token Provided");
        }
        jwt.verify(token, process.env.JWT_SECRET || "this is your key")

        let id = req.query.id;
        let data = req.body;
        let updatedproduct = await product.findByIdAndUpdate(id, data, { new: true });
        res.send(updatedproduct)

    }
    catch (err) {
        res.status(500).send(err);
    }
};

const deleteProduct = async (req, res) => {
    let id = req.query.id;
    let deletedproduct = await product.findByIdAndDelete(id);
    if (!deletedproduct) {
        return res.send("Product not found");
    }
    res.send("Product deleted");
};

module.exports = { allData, addProduct, updatedProduct, deleteProduct };

