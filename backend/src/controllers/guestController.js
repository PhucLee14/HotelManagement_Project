const guestModel = require("../models/guestModel");

let add = async (req, res) => {
  try {
    const data = req.body;
    if (
      !data.name ||
      !data.phoneNumber ||
      !data.IDnumber ||
      !data.dateOfBirth ||
      !data.guestCategories
    ) {
      throw {
        code: 1,
        message: "Không được bỏ trống thông tin",
      };
    }
    // Kiểm tra tuổi, khách hàng phải đủ 18 tuổi
    const dateOfBirth = new Date(data.dateOfBirth);
    const age = new Date().getFullYear() - dateOfBirth.getFullYear();
    const isBirthdayPassed =
      new Date().setFullYear(new Date().getFullYear()) >=
      dateOfBirth.setFullYear(new Date().getFullYear());

    if (age < 18 || (age === 18 && !isBirthdayPassed)) {
      throw {
        code: 1,
        message: "Khách hàng phải đủ 18 tuổi",
      };
    }

    // Kiểm tra số điện thoại bắt đầu với số 0 và là định dạng tại Việt Nam
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      throw {
        code: 1,
        message:
          "Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số",
      };
    }

    // Kiểm tra số IDnumber phải bắt đầu từ số 0 và đủ 12 chữ số
    const idRegex = /^0\d{11}$/;
    if (!idRegex.test(data.IDnumber)) {
      throw {
        code: 1,
        message:
          "Số CCCD không hợp lệ. Số CCCD phải bắt đầu bằng số 0 và có 12 chữ số",
      };
    }

    // kiểm tra khách hàng đã tồn tại hay chưa
    let guest = await guestModel.findOne({ phoneNumber: data.phoneNumber });

    if (guest) {
      throw {
        code: 1,
        message: "Số điện thoại đã tồn tại",
      };
    }

    guest = await guestModel.findOne({ IDnumber: data.IDnumber });
    if (guest) {
      throw {
        code: 1,
        message: "Số CCCD đã tồn tại",
      };
    }

    guest = await guestModel.create({
      name: data.name,
      phoneNumber: data.phoneNumber,
      IDnumber: data.IDnumber,
      dateOfBirth: data.dateOfBirth,
      guestCategories: data.guestCategories,
    });
    res.status(200).json({
      code: 0,
      message: "Tạo khách hàng thành công",
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
    const data = req.body;
    const id = req.params.id;
    // Kiểm tra ID hợp lệ
    if (!id) {
      return res.status(400).json({
        code: 1,
        message: "ID không tồn tại",
      });
    }

    if (
      !data.name ||
      !data.phoneNumber ||
      !data.IDnumber ||
      !data.dateOfBirth ||
      !data.guestCategories
    ) {
      throw {
        code: 1,
        message: "Không được bỏ trống thông tin",
      };
    }

    // Kiểm tra tuổi, khách hàng phải đủ 18 tuổi
    const dateOfBirth = new Date(data.dateOfBirth);
    const age = new Date().getFullYear() - dateOfBirth.getFullYear();
    const isBirthdayPassed =
      new Date().setFullYear(new Date().getFullYear()) >=
      dateOfBirth.setFullYear(new Date().getFullYear());

    if (age < 18 || (age === 18 && !isBirthdayPassed)) {
      throw {
        code: 1,
        message: "Khách hàng phải đủ 18 tuổi",
      };
    }

    // Kiểm tra số điện thoại bắt đầu với số 0 và là định dạng tại Việt Nam
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      throw {
        code: 1,
        message:
          "Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số",
      };
    }

    // Kiểm tra số IDnumber phải bắt đầu từ số 0 và đủ 12 chữ số
    const idRegex = /^0\d{11}$/;
    if (!idRegex.test(data.IDnumber)) {
      throw {
        code: 1,
        message:
          "Số CCCD không hợp lệ. Số CCCD phải bắt đầu bằng số 0 và có 12 chữ số",
      };
    }
    // Kiểm tra xem IDnumber đã tồn tại cho khách hàng khác hay không
    let existingGuestWithID = await guestModel.findOne({
      IDnumber: data.IDnumber,
      _id: { $ne: id },
    });
    if (existingGuestWithID) {
      throw {
        code: 1,
        message: "Số CCCD đã tồn tại cho khách hàng khác",
      };
    }

    // Kiểm tra xem phoneNumber đã tồn tại cho khách hàng khác hay không
    let existingGuestWithPhone = await guestModel.findOne({
      phoneNumber: data.phoneNumber,
      _id: { $ne: id },
    });
    if (existingGuestWithPhone) {
      throw {
        code: 1,
        message: "Số điện thoại đã tồn tại cho khách hàng khác",
      };
    }

    // Cập nhật thông tin khách hàng
    let updatedGuest = await guestModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          phoneNumber: data.phoneNumber,
          IDnumber: data.IDnumber,
          dateOfBirth: data.dateOfBirth,
          guestCategories: data.guestCategories,
        },
      },
      { new: true }
    );

    res.status(200).json({
      code: 0,
      message: "Chỉnh sửa thông tin khách hàng thành công",
      data: updatedGuest,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Logout",
    });
  }
};

let getById = async (req, res) => {
    try {
      const id = req.params.id;
      await guestModel.findById({ _id: id }).then((guest) => res.json(guest));
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
    getById
};