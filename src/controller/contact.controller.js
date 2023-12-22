const Contact = require("../models/contact.model");
const { StatusCodes } = require("http-status-codes");

module.exports = {
  getallContacts: async (req, res, next) => {
    try {
      const contects = await Contact.find({ userID: req.user });
      res.send({ contects });
      res.status(StatusCodes.OK);
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "something went wrong" });
    }
    next();
  },
  addnewContact: async (req, res) => {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
      });
    } else {
      const payload = {
        name,
        phone,
        userID: req.user,
      };
      Contact.create(payload).then((data, err) => {
        if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
        else res.status(StatusCodes.CREATED).json({ data });
      });
    }
  },
};
