const selectedProductS = require("../models/selectedProducts.modal");
const product = require("../models/product");
const createErrore = require("http-errors");
const { StatusCodes } = require("http-status-codes");

module.exports = {
  getallSelectedProducts: async (req, res, next) => {
    try {
      const products = await selectedProductS.find({ userID: req.user });
      res.send({ products });
      res.status(StatusCodes.OK);
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "something went wrong" });
    }
    next();
  },
  addproducts: async (req, res, next) => {
    try {
      const findProduct = await product.findById(
        { _id: req.params.id },
        { __v: 0 }
      );
      if (!findProduct) {
        throw createErrore(404, "product does not exsist");
      }
      const Payload = {
        name: findProduct.name,
        price: findProduct.price,
        userID: req.user,
        productID: req.params.id,
      };
      const cretaeProduct = new selectedProductS(Payload);
      const result = await cretaeProduct.save();
      res.send({ result });
      res.status(StatusCodes.OK);
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "something went wrong" });
    }
    next();
  },
  deleteProducts: async (req, res, next) => {
    try {
      const removeProduct = await selectedProductS.findByIdAndDelete(
        { _id: req.params.id },
        { __v: 0 }
      );
      if (!removeProduct) {
        throw createErrore(404, "product does not exsist");
      } else {
        res.send(removeProduct);
      }
      next();
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "something went wrong" });
    }
  },
};
