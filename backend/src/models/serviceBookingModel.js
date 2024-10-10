const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const serviceBookingSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: "String",
    //   default: uuidv4,
    // },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceBooking", serviceBookingSchema);
