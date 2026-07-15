const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const userrouter = require("./Routers/userrouter");
const productrouter = require("./Routers/productrouter");

const server = express();

const allowedOrigins = process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL]
    : ["http://localhost:5173", "http://localhost:5174", "http://localhost:3001"];

server.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(null, true); // Allow all in development
    },
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