const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productid: { type: Number },
  quantity: { type: Number, default: 1 },
  price: { type: Number },
});
const OrderSchema = new mongoose.Schema({
  id: { type: Number },
  products: [ProductSchema],
  amount: { type: Number, required: true },
  address: new mongoose.Schema({
    city: { type: String },
    street: { type: Number },
    building: { type: Number },
  }),
});

mongoose.model("order", OrderSchema);

