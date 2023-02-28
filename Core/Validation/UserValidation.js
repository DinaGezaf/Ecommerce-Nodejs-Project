const { body ,param} = require("express-validator");

module.exports.addUserValidation = [
  body("username").isString().withMessage("Username should be String"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isStrongPassword().withMessage("Invalid Password"),
  body("img").optional().isString().withMessage("Invalid Image"),
];

module.exports.updateUserValidation = [
  body("username").isString().withMessage("Username should be String"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isStrongPassword().withMessage("Invalid Password"),
  body("img").optional().isString().withMessage("Invalid Image"),
];
module.exports.deleteUserValidation = [
  param("email").isEmail().withMessage("Invalid Email"),
];
