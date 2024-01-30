const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const logger = require("../utils/log.js");
const config = require("../config/index.js");
const userService = require("../services/user.js");
const catchError = require("../utils/catchError.js");

module.exports.verifyJWT = catchError(async (req, _, next) => {
  logger.info(`Checking Jwt Middleware`);
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    logger.data("Token", token);
    if (!token) {
      throw new AppError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    const user = await userService.findOneRecord(decodedToken?._id);
    if (!user) {
      throw new AppError(401, "Invalid Access Token");
    }
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    throw new AppError(401, error?.message || "Invalid access token");
  }
});

//

// module.exports = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };

// module.exports.jwt = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (token) {
//       throw new Error("Token Not Found");
//     }
//     const decodeToken = jwt.verify(token, "88754346ygfdee4eryu");
//     const user = await userService.findOneRecord({ _id: decodeToken?._id });
//     if (!user) {
//       throw new Error("User Not Found!");
//     }
//     req.user = user;
//     req.userId = user?._id;
//     next();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };
