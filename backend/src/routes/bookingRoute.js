const express = require("express");
const bookingController = require("../controllers/bookingController");
const { checkJWT } = require("../middleware/jwtActions");
const router = express.Router();

router.post("/create", bookingController.createBooking);
router.put("/edit/:id", checkJWT, bookingController.editBooking);
router.get(
  "/viewListFreeRoom/:checkin/:checkout",
  bookingController.getAvailableRooms
);
router.get(
  "/searchBooking/:currentPage/:keyword",
  bookingController.searchBooking
);
router.get("/:currentPage", bookingController.viewListBooking);
router.get("/roombooking/:currentPage", bookingController.viewListRoomBooking);
router.get(
  "/servicebooking/:currentPage",
  bookingController.viewListServiceBooking
);
router.get(
  "/searchBookingByPhoneNumber/:currentPage/:keyword",
  bookingController.searchBookingByPhoneNumber
);
router.get("/view/:id", bookingController.getById);
router.get("/view/roombooking/:id", bookingController.getRoomBookingById);
router.get("/view/servicebooking/:id", bookingController.getServiceBookingById);
router.get(
  "/bookingcount/:year/:month",
  bookingController.getBookingCountByMonthYear
);

module.exports = router;
