const mongoose = require("mongoose");
require("./../Model/CartModel");
const CartSchema = mongoose.model("cart");

////Get All Carts
module.exports.getAllCarts = (request, response, next) => {
  CartSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

////Get User Carts
module.exports.getUserOrders = (request, response, next) => {
  CartSchema.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("User doesn't have a Cart");
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};

////Add New Cart
module.exports.addCart = (request, response, next) => {
  let CartObject = new CartSchema({
    _id: request.body._id,
    product: request.body.product,
  });

  CartObject.save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

////Update Cart
module.exports.updateCart = (request, response, next) => {
  let CartObject = {
    userid: request.body.userid,
    product: request.body.product,
  };

  CartSchema.updateOne({ _id: request.params.id }, { $set: CartObject })
    .then((data) => {
      response.status(201).json({ data: "Updated" });
    })
    .catch((error) => {
      next(error);
    });
};

///Delete Cart
module.exports.deleteCart = (request, response, next) => {
  CartSchema.deleteOne({ _id: request.params.id })
    .then((data) => {
      response.status(200).json({ data: "Deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
