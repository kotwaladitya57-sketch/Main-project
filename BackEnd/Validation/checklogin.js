const jwt = require("jsonwebtoken")

function checkLogin(req, res, next) {

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

        next();
    }
    catch (err) {
        res.status(401).send("Unauthorized");
    }
}
module.exports = checkLogin;