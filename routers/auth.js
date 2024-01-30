const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth");
const catchError = require("../utils/catchError");

authRouter.route("/register").post(catchError(authController.register));
authRouter.route("/login").post(catchError(authController.login));

module.exports = authRouter;
