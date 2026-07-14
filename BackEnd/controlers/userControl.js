const express = require("express");
const router = express.Router();
const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator")

const jwt = require("jsonwebtoken")

const getUser = async (req, res) => {
    let data = await user.find();
    res.send(data)
};

const verifyToken = async (req, res) => {
    try {
        let header = req.headers.authorization;
        if (!header) {
            return res.status(401).send("No Header Provided");
        }
        let {userId} = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET || "this is your key")
        let foundUser = await user.findById(userId);
        // if (!user) {
        //     return res.status(401).send("Unauthorized");
        // }
        res.status(200).send(foundUser);
    } catch (err) {
        res.status(401).send("Unauthorized");
    }
}

const registerUser = async (req, res) => {
    try {
        let result = validationResult(req);
        if (!result.isEmpty()) {
            let errors = result.array();
            let err = errors.map((er) => { return er.msg; })
            return res.status(400).send(err[0]);
        }


        let data = req.body;
        let existingUser = await user.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).send("user already exists");
        }

        let hashPassward = bcrypt.hashSync(data.password, 10);

        let newuser = await user.create({ ...data, password: hashPassward });
        res.status(200).send(newuser);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};
const LogIn = async (req, res) => {
    try {
        let result = validationResult(req);
        if (!result.isEmpty()) {
            let errors = result.array();
            let err = errors.map((er) => { return er.msg; })
            return res.status(400).send(err[0]);
        }

        let data = req.body;
        let existingUser = await user.findOne({ email: data.email });
        if (!existingUser) {
            return res.status(404).send("user not found please register first");
        }
        let isMatch = await bcrypt.compare(data.password, existingUser.password);
        if (!isMatch) {
            return res.status(401).send("wrong password");
        }

        let token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET || "this is your key")

        res.status(200).send({ user: existingUser, token });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const updateuser = async (req, res) => {
    let id = req.query.id;
    let data = req.body;
    let updateduser = await user.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send(updateduser);
}

const deleteuser = async (req, res) => {
    let id = req.query.id;
    let deleteduser = await user.findByIdAndDelete(id);
    if (!deleteduser) {
        return res.status(401).send("user not found");
    }
    res.status(204).send(" user deleted successfully ")
}

module.exports = { getUser, updateuser, LogIn, registerUser, deleteuser, verifyToken };