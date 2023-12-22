const { StatusCodes } = require("http-status-codes");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const { revokedTokens } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const signUp = async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }
  const hash_password = await bcrypt.hash(password, 10);
  const userData = {
    firstName,
    lastName,
    email,
    username,
    hash_password,
    token:'',
  };

  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User already registered",
    });
  } else {
    User.create(userData).then((data, err) => {
      if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
      else
        res
          .status(StatusCodes.CREATED)
          .json({ message: "User created Successfully", data });
    });
  }
};
const signIn = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        const id = _id;
        const update = { token: token }
        const options = { new: true };
     const data =    await  User.findByIdAndUpdate(id,update,options);
        res.status(StatusCodes.OK).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Something went wrong!",
        });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist..!",
      });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

const signOut = async (req, res) => {
  try {
    // const token = req.headers.token;
    // revokedTokens.push(token);
   const id =  req.user
   const update = { token: '' }
   const options = { new: true };
   const data =    await  User.findByIdAndUpdate(id,update,options);
 console.log(data,"data")
    res
    .status(200)
    .json({ message: "User LoggedOut Successfully" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error:"log out fail" });
  }
};

module.exports = { signUp, signIn,signOut };
