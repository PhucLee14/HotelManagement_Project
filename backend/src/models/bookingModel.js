const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const bookingSchema = new mongoose.Schema(
    {
        // _id: {
        //   type: "String",
        //   default: uuidv4,
        // },
        guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" },
        checkin: { type: Date, required: true },
        checkout: { type: Date, required: true },
        roomInteraction: { type: String, required: true },
        haveForeignGuest: { type: Boolean, require: true },
        roomBookings: [
            { type: mongoose.Schema.Types.ObjectId, ref: "RoomBooking" },
        ],
        serviceBookings: [
            { type: mongoose.Schema.Types.ObjectId, ref: "ServiceBooking" },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
