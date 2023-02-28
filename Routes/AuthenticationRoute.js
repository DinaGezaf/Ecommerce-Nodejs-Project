const express = require("express");
const Authcontroller = require("../Controller/AuthenticationController");
const Authentication_Router = express.Router();

Authentication_Router.get("/userProducts", Authcontroller.getAllProducts);
Authentication_Router.get("/userProducts/:id", Authcontroller.getProductById);
Authentication_Router.route("/cart")
  .get(Authcontroller.getAllCarts)
  .post(Authcontroller.addCart);
Authentication_Router.patch("/cart/:id", Authcontroller.updateCart);
Authentication_Router.delete("/cart/:id", Authcontroller.deleteCart);
Authentication_Router.get("/cart/:id", Authcontroller.getUserOrders);
Authentication_Router.post("/login", Authcontroller.login);

module.exports = Authentication_Router;
