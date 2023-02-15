const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userid: { type: mongoose.Types.ObjectId, required: true },
  products: [
    new mongoose.Schema({
      productid: { type: Number },
      quantity: { type: Number, default: 1 },
      price: { type: Number },
    }),
  ],
});

mongoose.model("cart", CartSchema);
