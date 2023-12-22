const jwt = require("jsonwebtoken");
const User = require("../models/auth");
const key = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  try {
    if (!token) {
     return res.status(401).send({ succes: false, msg: "token is reqired" });
    } else {
      const decode = jwt.verify(token, key);
      const id = decode._id;
      const user = await User.findById(id);
      if (!user || user.token === "") {
        return res.status(401).send({ succes: false, msg: "Your Token Is expired" });
      } else {
        req.user = user._id;
      }
    }
  } catch (error) {
   return res.status(400).send({ succes: false, msg: "unauthorised" });
  }
  return next();
};

// const VerifyUser = async()=>{

//   try {

//   } catch (error) {
//     res.status(400).send({ succes: false, msg: "unauthorised" });
//   }

// }

module.exports = { verifyToken };
