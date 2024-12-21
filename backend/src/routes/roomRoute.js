const express = require("express");
const roomController = require("../controllers/roomController");
// const { checkAdminJWT } = require("../middleware/jwtActions");
const router = express.Router();
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.post("/add", roomController.add);
// router.post("/edit", roomTypeController.edit);
// router.post("/delete", roomTypeController.deleteRoomType);
router.get("/viewListRoom/:currentPage", roomController.viewListRoom);
// router.get(
//   "/searchRoomType/:currentPage&:keyword",
//   roomTypeController.searchRoomType
// );
router.get("/:id", roomController.getById);

module.exports = router;
