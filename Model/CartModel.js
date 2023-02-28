const mongoose = require("mongoose");
const ProductSchema = require("./ProductModel");

const CartSchema = new mongoose.Schema({
  product: [{type:ProductSchema}],
});

mongoose.model("cart", CartSchema);
