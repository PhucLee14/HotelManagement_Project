const express = require("express");
const roomTypeController = require("../controllers/roomTypeController");
// const { checkAdminJWT } = require("../middleware/jwtActions");
const router = express.Router();
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.post("/add", roomTypeController.add);
router.post("/edit/:id", roomTypeController.edit);
router.post("/delete", roomTypeController.deleteRoomType);
router.get(
  "/viewListRoomType/:currentPage",
  roomTypeController.viewListRoomType
);
router.get(
  "/searchRoomType/:currentPage/:keyword",
  roomTypeController.searchRoomType
);
router.get("/:id", roomTypeController.getById);

module.exports = router;
