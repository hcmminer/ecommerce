const { check } = require("express-validator");
exports.schema = [
  check("name", "Name is required ").notEmpty(),

  check("email", "email must be 3 to 32 characters")
    .matches(/.+\@.+\..+/) // khop voi bat ky ky tu nao , + khop them nhu the...
    .withMessage("email")
    .isLength({ min: 4, max: 32 }),
  check("password", "password is required and not mmpty").notEmpty(),

  check("password")
    .isLength({ min: 6 })
    .withMessage("password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];
