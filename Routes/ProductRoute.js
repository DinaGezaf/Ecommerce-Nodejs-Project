const express = require("express");
const controller = require("./../Controller/ProductController");
const {
  addProductValidation,
  updateProductValidation,
  deleteProductValidation,
} = require("./../Core/Validation/ProductValidation");
const checkValidation = require("./../Core/Validation/CheckValidation");
const authorizationMW = require("./../Core/Authorization");
const ProductRoute = express.Router();

ProductRoute.route("/products")
  .get(
    authorizationMW.checkAdminAndUser,
    controller.getAllProducts
  )
  .post(
    authorizationMW.checkAdmin,
    addProductValidation,
    checkValidation,
    controller.addProduct
  )
  .patch(
    authorizationMW.checkAdmin,
    updateProductValidation,
    checkValidation,
    controller.updateProduct
  )
  .delete(
    authorizationMW.checkAdmin,
    deleteProductValidation,
    checkValidation,
    controller.deleteProduct
  );

ProductRoute.get(
  "/products/:id",
  authorizationMW.checkAdminAndUser,
  checkValidation,
  controller.getProductById
);
module.exports = ProductRoute;
