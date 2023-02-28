const { body ,param} = require("express-validator");

module.exports.addCartValidation = [
  body("product").isArray().withMessage("Product should be Object"),
  body("product.*").isObject().withMessage("Product should be Object"),
  body("product.*.productid")
    .isInt()
    .withMessage("Product Id should be Number"),
  body("product.*.img").isString().withMessage("Product Image required"),
  body("product.*.quantity")
    .isInt()
    .withMessage("Product Quantity should be Number"),
  body("product.*.price").isInt().withMessage("Product Price should be Number"),
];
module.exports.updateCartValidation = [
  body("product").optional().isArray().withMessage("Product should be Object"),
  body("product.*").optional().isObject().withMessage("Product should be Object"),
  body("product.*.productid")
    .optional()
    .isInt()
    .withMessage("Product Id should be Number"),
  body("product.*.img")
    .optional()
    .isString()
    .withMessage("Product Image required"),
  body("product.*.quantity")
    .optional()
    .isInt()
    .withMessage("Product Quantity should be Number"),
  body("product.*.price")
    .optional()
    .isInt()
    .withMessage("Product Price should be Number"),
];
module.exports.deleteCartValidation = [
  param("_id").isMongoId().withMessage("Cart Id should be Entered"),
];
