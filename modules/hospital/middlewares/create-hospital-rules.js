const { body } = require("express-validator");

const createHospitalRules = [
  body("Name")
    .notEmpty().withMessage("Hospital name is required")
    .isLength({ min: 3 }).withMessage("Hospital name must be at least 3 characters"),

  body("Location")
    .notEmpty().withMessage("Location is required"),

  body("ContactNumber")
    .optional()
    .isMobilePhone().withMessage("Contact number must be valid")
];

module.exports = createHospitalRules;
