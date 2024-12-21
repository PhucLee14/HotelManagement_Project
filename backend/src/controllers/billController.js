const billModel = require("../models/billModel");
const guestModel = require("../models/guestModel");
const staffModel = require("../models/staffModel");

let viewListBill = async (req, res) => {
  try {
    const currentPage = parseInt(req.params.currentPage) || 1;

    let bills;
    let count;

    if (currentPage === -1) {
      // Lấy hết dữ liệu
      bills = await billModel.find().sort({ createdAt: -1 });
      count = bills.length;
    } else {
      count = await billModel.countDocuments();
      const offset = 12 * (currentPage - 1);

      bills = await billModel
        .find()
        .limit(12)
        .skip(offset)
        .sort({ createdAt: -1 });
    }

    if (!bills || bills.length === 0) {
      throw {
        code: 1,
        message: "Không có data nào",
      };
    }

    res.status(200).json({
      code: 0,
      message: "Lấy dữ liệu thành công",
      count: count,
      data: bills,
    });
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Lỗi: viewListBill",
    });
  }
};

let searchBill = async (req, res) => {
  try {
    const currentPage = parseInt(req.params.currentPage) || 1;
    const keyword = req.params.keyword || null;

    if (!keyword) {
      throw {
        code: 1,
        message: "Hãy nhập nội dung tìm kiếm",
      };
    }
    const regex = new RegExp(keyword, "i");

    const offset = 12 * (currentPage - 1);

    // Tìm các khách hàng phù hợp hoặc nhân viên phù hợp
    const guests = await guestModel.find({
      name: regex,
    });

    const staffs = await staffModel.find({
      name: regex,
    });

    if ((!guests || guests.length === 0) && (!staffs || staffs.length === 0)) {
      throw {
        code: 1,
        message: "Không tìm thấy khách hàng hoặc nhân viên nào phù hợp",
      };
    }

    const guestIds = guests.map((guest) => guest._id);
    const staffIds = staffs.map((staff) => staff._id);

    // Tìm các hóa đơn của các khách hàng hoặc nhân viên này
    const bills = await billModel
      .find({
        $or: [{ guest: { $in: guestIds } }, { staff: { $in: staffIds } }],
      })
      .limit(12)
      .skip(offset)
      .sort({ createdAt: -1 });

    const count = await billModel.countDocuments({
      $or: [{ guest: { $in: guestIds } }, { staff: { $in: staffIds } }],
    });

    if (!bills || bills.length === 0) {
      throw {
        code: 1,
        message: "Không có dữ liệu nào",
      };
    }

    res.status(200).json({
      code: 0,
      message: "Tìm kiếm thành công",
      count: count,
      data: bills,
    });
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Lỗi: searchBill",
    });
  }
};

let getById = async (req, res) => {
  try {
    const id = req.params.id;
    await billModel.findById({ _id: id }).then((bill) => res.json(bill));
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message,
    });
  }
};

const getRevenueByMonthYear = async (req, res) => {
  try {
    const { month, year } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const totalRevenue = await billModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalRoomCharge: { $sum: "$roomCharge" }, // Tổng tiền phòng
          totalServiceCharge: { $sum: "$serviceCharge" }, // Tổng tiền dịch vụ
          totalRevenue: {
            $sum: { $sum: ["$roomCharge", "$serviceCharge"] },
          },
        },
      },
    ]);

    if (totalRevenue.length === 0 || !totalRevenue[0].totalRevenue) {
      // Trả về 0 nếu không có doanh thu
      return res.status(200).json({
        code: 0,
        message: "Không có doanh thu nào trong tháng và năm này",
        data: {
          totalRevenue: 0,
          totalRoomCharge: 0,
          totalServiceCharge: 0,
        },
      });
    }

    res.status(200).json({
      code: 0,
      message: "Lấy doanh thu thành công",
      data: {
        totalRevenue: totalRevenue[0].totalRevenue,
        totalRoomCharge: totalRevenue[0].totalRoomCharge,
        totalServiceCharge: totalRevenue[0].totalServiceCharge,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 1,
      message: "Đã có lỗi xảy ra khi lấy doanh thu",
    });
  }
};

module.exports = {
  viewListBill,
  searchBill,
  getById,
  getRevenueByMonthYear,
};
