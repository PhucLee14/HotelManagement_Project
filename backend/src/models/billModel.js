const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const billSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: "String",
    //   default: uuidv4,
    // },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    roomCharge: { type: Number, required: true },
    serviceCharge: { type: Number },
    discount: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
