const mongoose = require("mongoose");
require("./../Model/ProductModel");
const ProductSchema = mongoose.model("product");

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
////Add New Product
module.exports.addProduct = (request, response, next) => {
  let ProductObject = new ProductSchema({
    title: request.body.title,
    desc: request.body.desc,
    quantity: request.body.quantity,
    price: request.body.price,
    img: request.body.img,
    categories: request.body.categories,
  });
  ProductObject.save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
///Update Product
module.exports.updateProduct = (request, response, next) => {
  let ProductObject = {
    title: request.body.title,
    desc: request.body.desc,
    quantity: request.body.quantity,
    price: request.body.price,
    img: request.body.img,
    categories: request.body.categories,
  };
  console.log(request.params.id);

  ProductSchema.updateOne({ _id: request.params.id }, { $set: ProductObject })
    .then((data) => {

      response.status(201).json({ data: "Updated" });
    })
    .catch((error) => {
      next(error);
    });
};
///Delete Product
module.exports.deleteProduct = (request, response, next) => {
  ProductSchema.deleteOne({ _id: request.params.id })
    .then(() => {
      response.status(200).json({ data: "Deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
