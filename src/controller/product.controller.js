const Product = require("../models/product");
const createErrore = require("http-errors");
const Mongoose = require("mongoose");

module.exports = {
  getallproducts: async (req, res, next) => {
    // next(new Error("url is not hsted on server"));
    try {
      const result = await Product.find({}, { __v: 0 });
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  },

  addnewProduct: async (req, res, next) => {
    try {
      const product = new Product(req.body);
      const result = await product.save();
      res.send(result);
      console.log(result);
    } catch (error) {
      if (error.name === "ValidationError") {
        next(createErrore(422, error.message));
        return;
      }
      next(error);
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const result = await Product.findById({ _id: req.params.id }, { __v: 0 });
      if (!result) {
        throw createErrore(404, "product does not exsist");
      }
      res.send(result);
    } catch (error) {
      console.log(error);
      if (error instanceof Mongoose.CastError) {
        next(createErrore(400, "Invalid Product ID"));
        return;
      }
      next(error);
    }
  },
  deleteProductById: async (req, res, next) => {
    try {
      const result = await Product.findByIdAndDelete(
        { _id: req.params.id },
        { __v: 0 }
      );
      if (!result) {
        throw createErrore(404, "product does not exsist");
      }
      res.send(result);
    } catch (error) {
      console.log(error);
      if (error instanceof Mongoose.CastError) {
        next(createErrore(400, "Invalid Product ID"));
        return;
      }
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const options = { new: true };
      const result = await Product.findByIdAndUpdate(id, update, options);
      if (!result) {
        throw createErrore(404, "product does not exsist");
      }
      res.send(result);
    } catch (error) {
      console.log(error);
      if (error instanceof Mongoose.CastError) {
        next(createErrore(400, "Invalid Product ID"));
        return;
      }
    }
  },
};
