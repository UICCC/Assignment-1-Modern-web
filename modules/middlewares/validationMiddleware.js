const { body, validationResult } = require("express-validator");

exports.validatePatient = [
  body("Name").notEmpty().withMessage("Name is required"),
  body("Age").isInt({ min: 0 }).withMessage("Age must be a positive integer"),
  body("Gender").isIn(["Male", "Female", "Other"]).withMessage("Gender must be Male, Female, or Other"),
  body("BloodType").isString().notEmpty().withMessage("BloodType is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
