const { body } = require("express-validator");

let validateUser =
    [
        body("name")
            .notEmpty()
            .withMessage("name is required")
            .isLength({ min: 3, max: 20 })
            .withMessage("name must be between 3 and 20 characters"),

        body("email")
            .notEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("invalid email"),

        body("password")
            .notEmpty()
            .withMessage("password is required")
            .isLength({ min: 8 })
            .withMessage("password must be at least 8 characters")
            .isStrongPassword()
            .withMessage("password must contain at least one uppercase, one lowercase, one number and one special character"),

        body("age")
            .notEmpty()
            .withMessage("age is required")
            .isNumeric()
            .withMessage("age must be a number")
            .isInt({ min: 1, max: 100 })
            .withMessage("age must be between 1 and 100")
    ]
module.exports = validateUser;