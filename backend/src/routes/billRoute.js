const express = require("express");
const billController = require("../controllers/billController");
// const { checkJWT } = require("../middleware/jwtActions");
const router = express.Router();

router.get("/viewListBill/:currentPage", billController.viewListBill);
router.get("/detail/:id", billController.getById);
router.get("/searchBill/:currentPage/:keyword", billController.searchBill);
router.get("/revenue/:month/:year", billController.getRevenueByMonthYear);

module.exports = router;
