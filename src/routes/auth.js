const express = require("express");
const router = express.Router();
const { signUp, signIn ,signOut} = require("../controller/auth.controller");
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validator/auth");
const {verifyToken} = require('../middleware/auth')


router.route("/signin").post(validateSignIpRequest,isRequestValidated,signIn);


router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);
router.route("/signout").post(verifyToken, signOut);


module.exports = router;