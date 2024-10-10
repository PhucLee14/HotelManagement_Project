const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const staffSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: "String",
    //   default: uuidv4,
    // },
    name: { type: String, required: true },
    IDnumber: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String, required: true, unique: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
