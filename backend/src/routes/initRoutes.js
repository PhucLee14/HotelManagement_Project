const authRoute = require("./authRoute");
const staffRoute = require("./staffRoute");
const guestRoute = require("./guestRoute");
const serviceRoute = require("./serviceRoute");
const roomTypeRoute = require("./roomTypeRoute");
const roomRoute = require("./roomRoute");
const bookingRoute = require("./bookingRoute");
const paymentRoute = require("./paymentRoute");
const billRoute = require("./billRoute");

let initRoutes = (app) => {
    app.use("/api/auth", authRoute);
    return app;
};

module.exports = initRoutes;
