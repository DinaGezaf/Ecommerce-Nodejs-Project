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

CartRoute.route("/orders")
  .get(authorizationMW.checkAdmin, controller.getAllCarts)
  .post(
    authorizationMW.checkAdminAndUser,
    addCartValidation,
    checkValidation,
    controller.addCart
  )
  .patch(
    authorizationMW.checkAdminAndUser,
    updateCartValidation,
    checkValidation,
    controller.updateCart
  )
  .delete(
    authorizationMW.checkAdmin,
    deleteCartValidation,
    checkValidation,
    controller.deleteCart
  );

CartRoute.get(
  "/orders/:id",
  authorizationMW.checkAdmin,
  checkValidation,
  controller.getUserOrders
);

module.exports = CartRoute;
