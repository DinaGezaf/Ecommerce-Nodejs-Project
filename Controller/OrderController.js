const { request, response } = require("express");
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
  OrderSchema.findOne({ userid: request.params.userid })
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
    userid: request.body.userid,
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
    userid: request.body.userid,
    products: request.body.products,
    amount: request.body.amount,
    address: request.body.address,
  };

  OrderSchema.updateOne({ userid: request.body.userid }, { $set: OrderObject })
    .then((data) => {
      response.status(201).json({ data: "Updated" });
    })
    .catch((error) => {
      next(error);
    });
};

///Delete order
module.exports.deleteOrder = (request, response, next) => {
  OrderSchema.deleteOne({ _id: request.body._id })
    .then((data) => {
      response.status(200).json({ data: "Deleted" });
    })
    .catch((error) => {
      next(error);
    });
};

///Get Monthly Income
module.exports.getMonthlySales = (request, response, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevtMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  OrderSchema.aggregate([
    { $match: { createdAt: { $gte: prevtMonth } } },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ])
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
