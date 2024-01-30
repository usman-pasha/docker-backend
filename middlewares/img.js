const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// const logger = require("../utils/log");

const createDirectoryIfNotExists = (name) => {
  let directory = __dirname + `/./../${name}`;
  let stat = null;
  try {
    stat = fs.statSync(directory);
    console.log("Directory exists");
    // logger.info("Directory exists");
  } catch (err) {
    fs.mkdirSync(directory);
    console.log("Directory Created");
  }
  return directory;
};

module.exports.uploadBase64Image = (req, res, next) => {
  if (!req.body.image) {
    return next();
  }
  const directory = createDirectoryIfNotExists("images");
  const image = req.body.image;

  let uuidString = uuidv4();
  console.log(uuidString);
  uuidString = uuidString.replace(/-/g, "");
  const imageBase64 = image && image.imageBase64;
  if (!imageBase64) return next();

  let base64Data;
  const type = imageBase64.split(";")[0].split("/")[1];
  let imageName;
  if (type == "mp4") {
    imageName = new Date().toJSON().slice(0, 10) + "_" + uuidString + ".mp4";
    base64Data = new Buffer.from(
      imageBase64.replace(/^data:video\/mp4;base64,/, ""),
      "base64"
    );
  } else {
    imageName = new Date().toJSON().slice(0, 10) + "_" + uuidString + ".jpeg";
    base64Data = new Buffer.from(
      imageBase64.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
  }

  console.log(directory);
  fs.writeFile(
    `${directory}/${imageName}`,
    base64Data,
    "base64",
    (err, result) => {
      if (err) {
        console.log("Image not saved, uploading user = ", req.user.username);
        console.log(err.toString());
        delete image.imageBase64;
        return next();
      }
      console.log("Saving image from ", req.originalUrl);
      image.imageURL = imageName;
      return next();
    }
  );
};

module.exports.uploadBase64Images = (req, res, next) => {
  if (!req.body.images || !Array.isArray(req.body.images)) {
    return next();
  }
  const directory = createDirectoryIfNotExists("public");
  const uploadedImages = [];
  const processNextImage = (imagesArray, index) => {
    if (index >= imagesArray.length) {
      // All images have been processed, so proceed to the next middleware
      req.body.images = uploadedImages; // Update the request body with the image URLs
      return next();
    }
    const imageObject = imagesArray[index];
    const image = imageObject.imageBase64;
    if (!image) {
      // Skip this image if it doesn't have the required property
      return processNextImage(imagesArray, index + 1);
    }
    let uuidString = uuidv4().replace(/-/g, "");
    const imageName =
      new Date().toJSON().slice(0, 10) + "_" + uuidString + ".jpeg";
    const base64Data = image.replace(/^data:image\/(\w)*;base64,/, "");
    fs.writeFile(
      `${directory}/${imageName}`,
      base64Data,
      "base64",
      (err, result) => {
        if (err) {
          console.log(
            "Image not saved, uploading user =",
            req.user ? req.user.username : "unknown"
          );
          console.log(err.toString());
        } else {
          console.log("Saving image from", req.originalUrl);
          uploadedImages.push({ imageURL: imageName });
        }
        // Process the next image in the array
        processNextImage(imagesArray, index + 1);
      }
    );
  };

  // Start processing the first image in the array
  processNextImage(req.body.images, 0);
};
