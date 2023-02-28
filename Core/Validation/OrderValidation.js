const { body,param } = require("express-validator");

module.exports.addOrderValidation = [
  body("id").isInt().withMessage("User Id should be ObjectId"),
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
  body("amount").isInt().withMessage("Order Amount must be Number"),
  body("address").isObject().withMessage("Invalid Address"),
  body("address.city").isAlpha().withMessage("Address City should be String"),
  body("address.street").isInt().withMessage("Adderes Street should be Number"),
  body("address.building")
    .isInt()
    .withMessage("Address Building should be Number"),
];
module.exports.updateOrderValidation = [
  body("id")
    .optional()
    .isInt()
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
  body("amount").optional().isInt().withMessage("Order Amount must be Number"),
  body("address").optional().isObject().withMessage("Invalid Address"),
  body("address.city")
    .optional()
    .isAlpha()
    .withMessage("Address City should be String"),
  body("address.street")
    .optional()
    .isInt()
    .withMessage("Adderes Street should be Number"),
  body("address.building")
    .optional()
    .isInt()
    .withMessage("Address Building should be Number"),
];
module.exports.deleteOrderValidation = [
  param("id").isInt().withMessage("Order Id should be Entered"),
];
