const express = require("express");
const bannerRouter = express.Router();
const bannerController = require("../controllers/banner");
const catchError = require("../utils/catchError");
const authorized = require("../middlewares/verify");
const upload = require("../middlewares/img");
// - ./public:/usr/src/app/public/

bannerRouter
  .route("/")
  .get(catchError(bannerController.getAllBanners))
  .post(catchError(bannerController.createBanner));
  // .post(upload.uploadBase64Image, catchError(bannerController.createBanner));

bannerRouter.route("/:bannerId").get(catchError(bannerController.getOneBanner));

module.exports = bannerRouter;
