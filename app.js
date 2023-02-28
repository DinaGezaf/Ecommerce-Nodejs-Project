const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const UserRoute = require("./Routes/userRoute");
const ProductRoute = require("./Routes/ProductRoute");
const OrderRoute = require("./Routes/OrderRoute");
const CartRoute = require("./Routes/CartRoute");
const authenticationRoute = require("./Routes/AuthenticationRoute");
const authorizationMW = require("./Core/Authorization");
const cors = require("cors");
const server = express();
let port = process.env.PORT || 8080;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DBCONNECT)
  .then(() => {
    console.log("DB Connected.....");
    server.listen(port, () => {
      console.log("Server is Listening..");
    });
  })
  .catch((error) => {
    console.log("DB Error .." + error);
  });

server.use(cors());
server.options("*", cors());

server.use(express.json());
server.use(authenticationRoute);
server.use(authorizationMW);
server.use(ProductRoute);
server.use(UserRoute);
server.use(OrderRoute);
server.use(CartRoute);

server.use(morgan("tiny"));

server.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found" });
});
server.use((error, request, response, next) => {
  response.status(500).json({ message: error + " " });
});
