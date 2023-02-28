const { body ,param} = require("express-validator");

module.exports.addProductValidation = [
  body("title").isString().withMessage("Product Title should be String"),
  body("desc").isString().withMessage("Product Description should be String"),
  body("quantity").isInt().withMessage("Product Quantity must be Number"),
  body("price").isInt().withMessage("Product Price must be Number"),
  body("img").isString().withMessage("Invalid Image"),
  body("categories")
    .isIn(["Accessories", "Chair", "Decoration", "Furniture", "Table"])
    .withMessage(
      "Product should be in Categoreies : Accessories,Chair,Decoration,Furniture,Table"
    ),
];
module.exports.updateProductValidation = [
  body("title")
    .optional()
    .isString()
    .withMessage("Product Title should be String"),
  body("desc")
    .optional()
    .isString()
    .withMessage("Product Description should be String"),
  body("quantity")
    .optional()
    .isInt()
    .withMessage("Product Quantity must be Number"),
  body("price").optional().isInt().withMessage("Product Price must be Number"),
  body("img").optional().isString().withMessage("Invalid Image"),
  body("categories")
    .optional()
    .isIn(["Accessories", "Chair", "Decoration", "Furniture", "Table"])
    .withMessage(
      "Product should be in Categoreies : Accessories,Chair,Decoration,Furniture,Table"
    ),
];
module.exports.deleteProductValidation = [
  param("id").isInt().withMessage("Product Id should be Entered"),
];
