const mongoose = require("mongoose");
const logger = require("../utils/log");
const config = require("../config");

module.exports.dbConnection = async () => {
  try {
    logger.info(`Connecting To DataBase`);
    let connect;
    if (mongoose.connection.readyState !== 1) {
      const uri = config.DB_URI_DEV;
      logger.data("DBURI", uri);
      connect = await mongoose.connect(uri);
      logger.info(`Successfully DataBase Connected`);
      return connect;
    }
    return null;
  } catch (error) {
    logger.error(`DataBase Connecting Error For Mongo DataBase`);
    throw new Error(error);
  }
};
