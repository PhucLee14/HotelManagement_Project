const express = require("express");
const roomController = require("../controllers/roomController");
const router = express.Router();

router.post("/add", roomController.add);
router.get("/viewListRoom/:currentPage", roomController.viewListRoom);
router.get("/:id", roomController.getById);

module.exports = router;
