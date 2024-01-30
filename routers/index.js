const authRouter = require("./auth");
const userRouter = require("./user");
const bannerRouter = require("./banner")

const routes = (app) => {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/banner", bannerRouter);
};

module.exports = routes;
