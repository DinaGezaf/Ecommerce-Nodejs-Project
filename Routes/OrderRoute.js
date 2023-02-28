const express = require("express");
const controller = require("../Controller/OrderController");
const {
  addOrderValidation,
  updateOrderValidation,
  deleteOrderValidation,
} = require("../Core/Validation/OrderValidation");
const checkValidation = require("../Core/Validation/CheckValidation");
const authorizationMW = require("../Core/Authorization");
const OrderRoute = express.Router();

OrderRoute.route("/orders")
  .all(authorizationMW.checkAdminAndUser)
  .get(controller.getAllOrders)
  .post(addOrderValidation, checkValidation, controller.addOrder)
  OrderRoute.patch(
    "/orders/:id",
    updateOrderValidation,
    checkValidation,
    controller.updateOrder
  );
  OrderRoute.delete(
    "/orders/:id",
    deleteOrderValidation,
    checkValidation,
    controller.deleteOrder
  );

OrderRoute.get(
  "/orders/:id",
  authorizationMW.checkAdminAndUser,
  checkValidation,
  controller.getUserOrders
);

module.exports = OrderRoute;
