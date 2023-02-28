const mongoose = require("mongoose");
require("./../Model/OrderModel");
const OrderSchema = mongoose.model("order");

////Get All Orders
module.exports.getAllOrders = (request, response, next) => {
  OrderSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

////Get User Orders
module.exports.getUserOrders = (request, response, next) => {
  OrderSchema.findOne({ userid: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("User doesn't have Orders");
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};

////Add New Order
module.exports.addOrder = (request, response, next) => {
  let OrderObject = new OrderSchema({
    id: request.body.id,
    products: request.body.products,
    amount: request.body.amount,
    address: request.body.address,
  });

  OrderObject.save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

////Update Order
module.exports.updateOrder = (request, response, next) => {
  let OrderObject = {
    id: request.body.id,
    products: request.body.products,
    amount: request.body.amount,
    address: request.body.address,
  };

  OrderSchema.updateOne({ id: request.params.id }, { $set: OrderObject })
    .then((data) => {
      response.status(201).json({ data: "Updated" });
    })
    .catch((error) => {
      next(error);
    });
};

///Delete order
module.exports.deleteOrder = (request, response, next) => {
  OrderSchema.deleteOne({ id: request.params.id })
    .then((data) => {
      response.status(200).json({ data: "Deleted" });
    })
    .catch((error) => {
      next(error);
    });
};


