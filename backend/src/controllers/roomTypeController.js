const roomtypeModel = require("../models/roomTypeModel");

let add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.price || !data.images || !data.capacity) {
      throw {
        code: 1,
        message: "Không được bỏ trống thông tin",
      };
    }
    // kiểm tra tên loại phòng đã tồn tại chưa
    let roomType = await roomtypeModel.findOne({ name: data.name });

    if (roomType) {
      throw {
        code: 1,
        message: "Tên loại phòng đã tồn tại",
      };
    }

    roomType = await roomtypeModel.create({
      name: data.name,
      price: data.price,
      images: data.images,
      capacity: data.capacity,
    });

    res.status(200).json({
      code: 0,
      message: "Tạo loại phòng thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Logout",
    });
  }
};

let edit = async (req, res) => {
  try {
    data = req.body;
    const id = req.params.id;

    if (!data.name || !data.price || !data.images || !data.capacity) {
      throw {
        code: 1,
        message: "Không được bỏ trống thông tin",
      };
    }

    // Kiểm tra xem tên loại phòng đã tồn tại cho một loại phòng khác chưa
    let existingRoomType = await roomtypeModel.findOne({
      name: data.name,
      _id: { $ne: id },
    });
    if (existingRoomType) {
      throw {
        code: 1,
        message: "Tên loại phòng đã tồn tại cho một loại phòng khác",
      };
    }

    // Cập nhật thông tin loại phòng
    let updatedRoomType = await roomtypeModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          price: data.price,
          images: data.images,
          capacity: data.capacity,
        },
      },
      { new: true }
    );

    res.status(200).json({
      code: 0,
      message: "Chỉnh sửa thông tin loại phòng thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Logout",
    });
  }
};

let deleteRoomType = async (req, res) => {
  try {
    const { id, name } = req.body;

    // Kiểm tra xem loại phòng có tồn tại không
    let roomType = await roomtypeModel.findOne({ name });
    if (!roomType) {
      throw {
        code: 1,
        message: "Loại phòng không tồn tại",
      };
    }

    // Xoá loại phòng
    await roomtypeModel.findOneAndDelete({ name });

    res.status(200).json({
      code: 0,
      message: "Xoá loại phòng thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Không thể xoá loại phòng",
    });
  }
};

let viewListRoomType = async (req, res) => {
  try {
    const currentPage = parseInt(req.params.currentPage) || 1;

    let roomTypes;
    let count;

    if (currentPage === -1) {
      // Lấy hết dữ liệu
      roomTypes = await roomtypeModel.find().sort({ createdAt: -1 });
      count = roomTypes.length;
    } else {
      count = await roomtypeModel.countDocuments();
      const offset = 12 * (currentPage - 1);

      roomTypes = await roomtypeModel
        .find()
        .limit(12)
        .skip(offset)
        .sort({ createdAt: -1 });
    }

    if (!roomTypes || roomTypes.length === 0) {
      throw {
        code: 1,
        message: "Không có data nào",
      };
    }

    res.status(200).json({
      code: 0,
      message: "Lấy dữ liệu thành công",
      count: count,
      data: roomTypes,
    });
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Lỗi: viewListRoomType",
    });
  }
};

let searchRoomType = async (req, res) => {
  try {
    const currentPage = req.params.currentPage || 1;
    const keyword = req.params.keyword || null;

    if (!keyword) {
      throw {
        code: 1,
        message: "Hãy nhập nội dung tìm kiếm",
      };
    }

    const regex = new RegExp(keyword, "i");

    const count = await roomtypeModel.countDocuments({
      name: regex, // Tìm kiếm tiêu đề chứa từ khóa
    });

    const offset = 12 * (currentPage - 1);

    const roomType = await roomtypeModel
      .find({
        name: regex,
      })
      .limit(12)
      .skip(offset)
      .sort({ createdAt: -1 });

    if (!roomType || roomType.length === 0) {
      throw {
        code: 1,
        message: "Không có data nào",
      };
    }

    res.status(200).json({
      code: 0,
      message: "Tìm kiếm thành công",
      count: count,
      data: roomType,
    });
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Lỗi: searchRoomType ",
    });
  }
};

let getById = async (req, res) => {
  try {
    const id = req.params.id;
    await roomtypeModel
      .findById({ _id: id })
      .then((roomtype) => res.json(roomtype));
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message,
    });
  }
};

module.exports = {
  add,
  edit,
  deleteRoomType,
  viewListRoomType,
  searchRoomType,
  getById,
};
