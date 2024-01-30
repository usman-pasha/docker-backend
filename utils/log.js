module.exports.info = (message) => {
  console.log("INFO:", message);
};
module.exports.data = (message, data) => {
  console.log("DATA:", message);
  console.log(data);
};

module.exports.error = (message, data) => {
  console.log("ERROR:", message);
  console.log(data);
};
