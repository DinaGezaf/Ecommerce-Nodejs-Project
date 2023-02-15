const { body } = require("express-validator");

module.exports.addCartValidation = [
  body("userid").isMongoId().withMessage("User Id should be ObjectId"),
  body("products").isArray().withMessage("Products should be Array"),
  body("products.*").isObject().withMessage("Product should be Object"),
  body("products.*.productid")
    .isInt()
    .withMessage("Product Id should be Number"),
  body("products.*.quantity")
    .isInt()
    .withMessage("Product Quantity should be Number"),
  body("products.*.price")
    .isInt()
    .withMessage("Product Price should be Number"),
];
module.exports.updateCartValidation = [
  body("userid")
    .optional()
    .isMongoId()
    .withMessage("User Id should be ObjectId"),
  body("products").optional().isArray().withMessage("Products should be Array"),
  body("products.*")
    .optional()
    .isObject()
    .withMessage("Product should be Object"),
  body("products.*.productid")
    .optional()
    .isInt()
    .withMessage("Product Id should be Number"),
  body("products.*.quantity")
    .optional()
    .isInt()
    .withMessage("Product Quantity should be Number"),
  body("products.*.price")
    .optional()
    .isInt()
    .withMessage("Product Price should be Number"),
];
module.exports.deleteCartValidation = [
  body("_id").isMongoId().withMessage("Cart Id should be Entered"),
];
