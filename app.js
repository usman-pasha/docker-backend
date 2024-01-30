require("dotenv").config();
const express = require("express");
const logger = require("./utils/log.js");
const db = require("./utils/db.js");
const routes = require("./routers/index.js");
const responser = require("./utils/responser.js");
const globalError = require("./utils/globalError.js");
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(express.static(__dirname + "/images"));
app.use("/images", express.static("images"));
// db
(async () => {
  await db.dbConnection();
})();

// routes
// api health
app.get("/health", (req, res) => {
  const data = {
    dotNetDeveloper: process.env.BACKEND2,
    nodeDeveloper: process.env.BACKEND1,
  };
  logger.info(data);
  return responser.send(200, "Health Check Up", req, res, data);
});

routes(app);

app.use(globalError.errorHandler);

module.exports = app;
