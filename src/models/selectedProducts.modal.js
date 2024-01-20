const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const selectedProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

const SelctedProducts = mongoose.model(
  "SelctedProducts",
  selectedProductSchema
);
module.exports = SelctedProducts;
