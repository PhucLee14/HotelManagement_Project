const express = require("express");
const paymentController = require("../controllers/paymentController");
const router = express.Router();
router.post("/", paymentController.payment);
router.post("/callback", paymentController.callback);
router.post("/transaction-status", paymentController.transactionStatus);
module.exports = router;
