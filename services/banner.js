const bannerModel = require("../models/banner.model");
const logger = require("../utils/log");
const upload = require("../middlewares/multiImage");

module.exports.createBanner = async (body) => {
  logger.info(`Creatring Banner`);
  const u = await upload.uploadBase64Image(body.bannerImage);
  console.log("uuu", u);
  const c = await upload.uploadBase64Image(body.bannerCover);
  console.log("uuu", c);
  const art = await upload.uploadBase64Images(body.Images);
  console.log("AAAA", art);
  const payload = {
    bannerName: body.bannerName,
    copyRight: body.copyRight,
    bannerPicture: u,
    bannerCover: c,
    images:art
  };
  logger.data("payload", payload);
  const record = await bannerModel.create(payload);
  return record;
};

module.exports.getAllBanners = async (query) => {
  logger.info(`Get All Banners`);
  const record = await bannerModel.find(query);
  return record;
};

module.exports.getOneBanner = async (bannerId) => {
  logger.info(`Get Single Banner`);
  const record = await bannerModel.findOne({ _id: bannerId });
  return record;
};
