const express = require("express");
const controller = require("../Controller/CartController");
const {
  addCartValidation,
  updateCartValidation,
  deleteCartValidation,
} = require("../Core/Validation/CartValidation");
const checkValidation = require("../Core/Validation/CheckValidation");
const authorizationMW = require("../Core/Authorization");
const CartRoute = express.Router();

CartRoute.route("/cart")
  .get(authorizationMW.checkAdmin, controller.getAllCarts)
  .post(
    authorizationMW.checkAdminAndUser,
    addCartValidation,
    checkValidation,
    controller.addCart
  )
  CartRoute.patch(
    "/cart/:id",
    authorizationMW.checkAdminAndUser,
    updateCartValidation,
    checkValidation,
    controller.updateCart
  );
  CartRoute.delete(
    "/cart/:id",
    authorizationMW.checkAdminAndUser,
    deleteCartValidation,
    checkValidation,
    controller.deleteCart
  );

CartRoute.get(
  "/cart/:id",
  authorizationMW.checkAdminAndUser,
  checkValidation,
  controller.getUserOrders
);

module.exports = CartRoute;
