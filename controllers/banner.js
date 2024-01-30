const bannerService = require("../services/banner");
const logger = require("../utils/log");
const responser = require("../utils/responser");

module.exports.createBanner = async (req, res) => {
  logger.info("create Banner");
  const data = await bannerService.createBanner(req.body);
  logger.data("successfully banner created", data);
  return responser.send(200, "successFully banner Created", req, res, data);
};

module.exports.getOneBanner = async (req, res) => {
  logger.info("get One banner");
  const param = req.params;
  const data = await bannerService.getOneBanner(param.bannerId);
  logger.data("successfully Single banner fetched", data);
  return responser.send(
    200,
    "successfully single banner fetched",
    req,
    res,
    data
  );
};

module.exports.getAllBanners = async (req, res) => {
  logger.info("Get All Banners");
  const query = req.query;
  const data = await bannerService.getAllBanners(query);
  logger.data("successfully all banners fetched", data);
  return responser.send(
    200,
    "successfully all banners fetched",
    req,
    res,
    data
  );
};
