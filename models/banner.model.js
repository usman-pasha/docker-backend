const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    bannerName: { type: String },
    copyRight: { type: String, required: true },
    bannerPicture: { type: String },
    bannerCover: { type: String },
    images: [{ imageURL: { type: String } }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("banner", bannerSchema);
