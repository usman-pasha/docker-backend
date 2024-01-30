const userService = require("../services/user");
const logger = require("../utils/log");
const responser = require("../utils/responser");

module.exports.getAllUsersPublic = async (req, res) => {
  logger.info("getAllUsersPublic");
  const query = req.query;
  const data = await userService.getAllUsersPublic(query);
  logger.data("successfully register created", data);
  return responser.send(200, "successFully all user fetched", req, res, data);
};

module.exports.getOneUserPublic = async (req, res) => {
  logger.info("getOneUserPublic");
  const param = req.params;
  const data = await userService.getOneUserPublic(param.userId);
  logger.data("successfully user login", data);
  return responser.send(200, "successfully user login", req, res, data);
};

module.exports.profile = async (req, res) => {
  logger.info("profile");
  const query = req.query;
  const userId = req.userId;
  const data = await userService.profile(userId);
  logger.data("successfully profile Fetched", data);
  return responser.send(200, "successfully profile Fetched", req, res, data);
};
