const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/log");

const createDirectoryIfNotExists = (name) => {
  let directory = __dirname + `/./../${name}`;
  let stat = null;
  try {
    stat = fs.statSync(directory);
    logger.info("Directory exists");
  } catch (err) {
    fs.mkdirSync(directory);
    console.log("Directory Created");
  }
  return directory;
};

module.exports.uploadBase64Image = async (i) => {
  try {
    const directory = createDirectoryIfNotExists("images");
    const image = i;
    let uuidString = uuidv4();
    console.log(uuidString);
    uuidString = uuidString.replace(/-/g, "");
    const imageBase64 = image && image.imageBase64;
    if (!imageBase64) return null; // Return null if imageBase64 is not available
    let base64Data;
    const type = imageBase64.split(";")[0].split("/")[1];
    let imageName;
    if (type == "mp4") {
      imageName = new Date().toJSON().slice(0, 10) + "_" + uuidString + ".mp4";
      base64Data = Buffer.from(
        imageBase64.replace(/^data:video\/mp4;base64,/, ""),
        "base64"
      );
    } else {
      imageName = new Date().toJSON().slice(0, 10) + "_" + uuidString + ".jpeg";
      base64Data = Buffer.from(
        imageBase64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
    }
    console.log(directory);
    await writeFileAsync(`${directory}/${imageName}`, base64Data, "base64");
    console.log("Saving image from");
    image.imageURL = imageName;
    return image.imageURL;
  } catch (err) {
    console.error(err.toString());
    return null;
  }
};

module.exports.uploadBase64Images = async (images) => {
  try {
    const directory = createDirectoryIfNotExists("images");
    const uploadedImages = [];

    for (const image of images) {
      let uuidString = uuidv4();
      console.log(uuidString);
      uuidString = uuidString.replace(/-/g, "");
      const imageBase64 = image && image.imageBase64;

      if (!imageBase64) {
        console.error("Image base64 data is missing for one or more images");
        continue; // Skip this iteration and move to the next image
      }

      let base64Data;
      const type = imageBase64.split(";")[0].split("/")[1];
      let imageName;
      if (type == "mp4") {
        imageName =
          new Date().toJSON().slice(0, 10) + "_" + uuidString + ".mp4";
        base64Data = Buffer.from(
          imageBase64.replace(/^data:video\/mp4;base64,/, ""),
          "base64"
        );
      } else {
        imageName =
          new Date().toJSON().slice(0, 10) + "_" + uuidString + ".jpeg";
        base64Data = Buffer.from(
          imageBase64.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
      }

      console.log(directory);
      await writeFileAsync(`${directory}/${imageName}`, base64Data, "base64");
      console.log("Saving image from");
      image.imageURL = imageName;
      uploadedImages.push(image);
    }

    return uploadedImages;
  } catch (err) {
    console.error(err.toString());
    return null;
  }
};
