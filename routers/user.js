const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user");
const catchError = require("../utils/catchError");
const authorized = require("../middlewares/verify");

userRouter.route("/public").get(catchError(userController.getAllUsersPublic));
userRouter
  .route("/public/:userId")
  .get(catchError(userController.getOneUserPublic));
userRouter
  .route("/profile")
  .get(authorized.verifyJWT, catchError(userController.profile));

module.exports = userRouter;
