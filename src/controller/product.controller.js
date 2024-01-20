const Product = require("../models/product");
const createErrore = require("http-errors");
const Mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

module.exports = {
  getallproducts: async (req, res, next) => {
    try {
      const result = await Product.find({ userID: req.user });
      res.send(result);
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "something went wrong" });
    }
    next()
  },

  addnewProduct: async (req, res, next) => {
    try {
      const product = new Product(req.body);
      const result = await product.save();
      res.send(result);
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
      if (error instanceof Mongoose.CastError) {
        next(createErrore(400, "Invalid Product ID"));
        return;
      }
    }
  },
};
