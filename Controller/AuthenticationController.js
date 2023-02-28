const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserSchema = mongoose.model("user");
require("./../Model/ProductModel");
const ProductSchema = mongoose.model("product");
require("./../Model/CartModel");
const CartSchema = mongoose.model("cart");
////Get All Products
module.exports.getAllProducts = (request, response, next) => {
  ProductSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
/////Get Product By Id
module.exports.getProductById = (request, response, next) => {
  ProductSchema.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("Product doen't exist");
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};

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
  console.log(request.body.product);
  let CartObject = new CartSchema({
    // id: request.params.id,
    product: request.body.product,
  });
  console.log(request.body.product);
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
module.exports.login = (request, response, next) => {
  if (
    request.body.email == "adminD@gmail.com" &&
    request.body.password == "123"
  ) {
    let token = jwt.sign(
      {
        role: "admin",
        _id: 1,
        email: "adminD@gmail.com",
      },
      process.env.SECRETKEY,
      { expiresIn: "1h" }
    );

    response.status(200).json(token);

    console.log(token);
  } else {
    UserSchema.findOne({
      email: request.body.email,
      password: request.body.password,
    })
      .then((data) => {
        if (data == null) {
          let error = new Error("Not Authenticated");
          error.status = 401;
          throw error;
        } else {
          let token = jwt.sign(
            {
              role: "user",
              _id: data._id,
              email: data.email,
            },
            process.env.SECRETKEY,
            { expiresIn: "1h" }
          );
          let status = 200;
          response.status(200).json(token);
          console.log(token);
        }
      })
      .catch((error) => {
        error = new Error("Not Authenticated");
        error.status = 401;
        next(error);
      });
  }
};
