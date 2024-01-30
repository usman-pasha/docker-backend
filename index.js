const app = require("./app.js");
const config = require("./config");
const logger = require("./utils/log.js");

app.listen(config.PORT, () => {
  logger.info(`App Is Running On Port http://localhost:${config.PORT}`);
});
