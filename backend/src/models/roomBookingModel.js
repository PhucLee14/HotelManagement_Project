const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const roomBookingSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: "String",
    //   default: uuidv4,
    // },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    headcount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoomBooking", roomBookingSchema);
