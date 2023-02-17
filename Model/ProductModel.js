const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const ProductSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    categories: {
      type: String,
      enum: ["Accessories", "Chair", "Decoration", "Furniture", "Table"],
      required: true,
    },
  },
  {
    _id: false,
  }
);

ProductSchema.plugin(autoIncrement, { id: "product_counter" });
mongoose.model("product", ProductSchema);
