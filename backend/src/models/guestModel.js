const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const guestSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: "String",
    //   default: uuidv4,
    // },
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    IDnumber: { type: String, unique: true },
    dateOfBirth: { type: Date, required: true },
    guestCategories: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guest", guestSchema);
