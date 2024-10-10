const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const serviceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
