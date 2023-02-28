const express = require("express");
const controller = require("./../Controller/ProductController");
const {
  addProductValidation,
  updateProductValidation,
  deleteProductValidation,
} = require("./../Core/Validation/ProductValidation");
const checkValidation = require("./../Core/Validation/CheckValidation");
const authorizationMW = require("../Core/Authorization");
const ProductRoute = express.Router();

ProductRoute.route("/products")
  .all(authorizationMW.checkAdmin)
  .get(checkValidation, controller.getAllProducts)
  .post(addProductValidation, checkValidation, controller.addProduct)
 ProductRoute.patch(
   "/products/:id",
   authorizationMW.checkAdmin,
   updateProductValidation,
   checkValidation,
   controller.updateProduct
 );
  ProductRoute.delete(
    "/products/:id",
    authorizationMW.checkAdmin,
    deleteProductValidation,
    checkValidation,
    controller.deleteProduct
  );

ProductRoute.get(
  "/products/:id",
  authorizationMW.checkAdmin,
  checkValidation,
  controller.getProductById
);

module.exports = ProductRoute;
