const authRoute = require("./authRoute");
const staffRoute = require("./staffRoute");
const guestRoute = require("./guestRoute");
const serviceRoute = require("./serviceRoute");
const roomTypeRoute = require("./roomTypeRoute");
const roomRoute = require("./roomRoute");

let initRoutes = (app) => {
    app.use("/api/auth", authRoute);
    // Staff
    app.use("/api/staff", staffRoute);
    //Guest
    app.use("/api/guest", guestRoute);
    //Service
    app.use("/api/service", serviceRoute);
    //Roomtype
    app.use("/api/room", roomRoute);
    //Roomtype
    app.use("/api/roomtype", roomTypeRoute);
    return app;
};

module.exports = initRoutes;
