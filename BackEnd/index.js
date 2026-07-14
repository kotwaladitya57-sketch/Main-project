const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const userrouter = require("./Routers/userrouter");
const productrouter = require("./Routers/productrouter");

const server = express();

server.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

server.use(express.json())


server.use('/users', userrouter);
server.use('/product', productrouter);


server.get("/", (req, res) => {
    res.send("server is running")
})

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
    });


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`server is running on port ${PORT}`))