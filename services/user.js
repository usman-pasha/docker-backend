const userModel = require("../models/user.model");
const logger = require("../utils/log");

module.exports.createRecord = async (object) => {
  const record = await userModel.create(object);
  return record;
};

module.exports.findAllRecords = async (condition, populateQuery) => {
  const record = await userModel.find(condition).populate(populateQuery);
  return record;
};

module.exports.findOneRecord = async (condition, populateQuery) => {
  const record = await userModel.findOne(condition).populate(populateQuery);
  return record;
};

module.exports.findOneRecordWithOutPassword = async (
  condition,
  populateQuery
) => {
  const record = await userModel
    .findOne(condition)
    .populate(populateQuery)
    .select("-password");
  return record;
};

module.exports.updateRecord = async (condition, updateData) => {
  const option = { new: true };
  const record = await userModel.findOneAndUpdate(
    condition,
    updateData,
    option
  );
  return record;
};

module.exports.deleteRecord = async (condition) => {
  const record = await userModel.findOneAndDelete(condition);
  return record;
};

// get all users public api
module.exports.getAllUsersPublic = async (query) => {
  logger.info(`Get All Users Public`);
  const record = await this.findAllRecords(query);
  return record;
};

// get only one user public
module.exports.getOneUserPublic = async (userId) => {
  logger.info(`Get One User Public User Id ${userId}`);
  const record = await this.findOneRecordWithOutPassword({ _id: userId });
  return record;
};

// get profile api
module.exports.profile = async (userId) => {
  logger.info(`Get User Profile Id`);
  const record = await this.findOneRecordWithOutPassword({
    _id: userId,
  });
  return record;
};