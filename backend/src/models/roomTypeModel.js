const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const roomTypeSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: "String",
    //   default: uuidv4,
    // },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: String, required: true },
    capacity: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoomType", roomTypeSchema);
