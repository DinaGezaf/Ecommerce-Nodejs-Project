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
  .patch(updateOrderValidation, checkValidation, controller.updateOrder)
  .delete(deleteOrderValidation, checkValidation, controller.deleteOrder);

OrderRoute.get(
  "/orders/:id",
  authorizationMW.checkAdminAndUser,
  checkValidation,
  controller.getUserOrders
);
OrderRoute.get(
  "/income",
  authorizationMW.checkAdmin,
  checkValidation,
  controller.getMonthlySales
);
module.exports = OrderRoute;
