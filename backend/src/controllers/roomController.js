const roomModel = require("../models/roomModel");

let add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.roomNumber || !data.roomType) {
      throw {
        code: 1,
        message: "Không được bỏ trống thông tin",
      };
    }
    // kiểm tra tên phòng đã tồn tại chưa
    let room = await roomModel.findOne({ roomNumber: data.roomNumber });

    if (room) {
      throw {
        code: 1,
        message: "Tên phòng đã tồn tại",
      };
    }

    room = await roomModel.create({
      roomNumber: data.roomNumber,
      status: "Phòng còn trống",
      isFree: true,
      roomType: data.roomType,
    });

    res.status(200).json({
      code: 0,
      message: "Tạo phòng thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Logout",
    });
  }
};

let viewListRoom = async (req, res) => {
  try {
    const currentPage = parseInt(req.params.currentPage) || 1;

    let rooms;
    let count;

    if (currentPage === -1) {
      // Lấy hết dữ liệu
      rooms = await roomModel.find().sort({ createdAt: -1 });
      count = rooms.length;
    } else {
      count = await roomModel.countDocuments();
      const offset = 12 * (currentPage - 1);

      rooms = await roomModel
        .find()
        .limit(12)
        .skip(offset)
        .sort({ createdAt: -1 });
    }

    if (!rooms || rooms.length === 0) {
      throw {
        code: 1,
        message: "Không có data nào",
      };
    }

    res.status(200).json({
      code: 0,
      message: "Lấy dữ liệu thành công",
      count: count,
      data: rooms,
    });
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Lỗi: viewListRoom",
    });
  }
};

let getById = async (req, res) => {
  try {
    const id = req.params.id;
    await roomModel.findById({ _id: id }).then((room) => res.json(room));
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message,
    });
  }
};

module.exports = {
  add,
  // edit,
  // deleteRoomType,
  viewListRoom,
  // searchRoomType,
  getById,
};
