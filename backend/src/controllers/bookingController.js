const roomModel = require("../models/roomModel");
const roomBookingModel = require("../models/roomBookingModel");
const guestModel = require("../models/guestModel");
const bookingModel = require("../models/bookingModel");
const serviceBookingModel = require("../models/serviceBookingModel");
const roomTypeModel = require("../models/roomTypeModel");
const serviceModel = require("../models/serviceModel");
const billModel = require("../models/billModel");

const createBooking = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        if (
            !data.phoneNumber ||
            !data.checkin ||
            !data.checkout ||
            !data.roomBookings
        ) {
            throw {
                code: 1,
                message: "Không được bỏ trống thông tin",
            };
        }

        const guest = await guestModel.findOne({
            phoneNumber: data.phoneNumber,
        });

        if (!guest) {
            throw {
                code: 1,
                message: "Không tồn tại khách hàng có số điện thoại trên",
            };
        }

        // Tạo một mảng các đặt phòng từ roomBookings được cung cấp
        const createdRoomBookings = await Promise.all(
            data.roomBookings.map(async (roomBooking) => {
                const createdRoomBooking = await roomBookingModel.create(
                    roomBooking
                );
                return createdRoomBooking._id;
            })
        );

        // Tạo một đặt phòng mới với thông tin được cung cấp và danh sách các đặt phòng của phòng
        const booking = await bookingModel.create({
            guest: guest._id,
            checkin: data.checkin,
            checkout: data.checkout,
            roomInteraction: "Not Checked In",
            roomBookings: createdRoomBookings,
            haveForeignGuest: false,
        });

        res.status(200).json({
            code: 0,
            message: "Đặt phòng thành công",
        });
    } catch (error) {
        console.error(error);
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Đã có lỗi xảy ra: Booking",
        });
    }
};

let editBooking = async (req, res) => {
    console.log("Dữ liệu nhận được từ client:", req.body);
    const { roomInteraction, serviceBookings, haveForeignGuest } = req.body;
    console.log("haveForeignGuest:", haveForeignGuest);

    const id = req.params.id;

    // Valid room interaction states
    const validRoomInteractions = [
        "Checked In",
        "Reservation Cancelled",
        "Checked Out",
    ];

    try {
        // Check if roomInteraction is valid
        if (!validRoomInteractions.includes(roomInteraction)) {
            throw {
                code: 1,
                message: "Hành động tương tác phòng đấy không tồn tại",
            };
        }

        const booking = await bookingModel
            .findById(id)
            .populate("roomBookings");
        if (!booking) {
            throw {
                code: 1,
                message: "Booking không tồn tại",
            };
        }

        const currentDate = new Date().toISOString().split("T")[0]; // format to YYYY-MM-DD;
        const checkin = booking.checkin.toISOString().split("T")[0];

        if (roomInteraction === "Checked In") {
            if (checkin > currentDate) {
                throw {
                    code: 1,
                    message: "Chưa tới ngày nhận phòng",
                };
            }
            // Update hiện trạng phòng
            const roomBookingIds = booking.roomBookings.map((rb) => rb.room);
            await roomModel.updateMany(
                { _id: { $in: roomBookingIds } },
                { $set: { isFree: false } }
            );
            console.log("nhan phong", haveForeignGuest);
        }

        let createdServiceBookings = null;
        if (serviceBookings && roomInteraction === "Checked Out") {
            createdServiceBookings = await Promise.all(
                serviceBookings.map(async (serviceBooking) => {
                    const createdServiceBooking =
                        await serviceBookingModel.create(serviceBooking);
                    return createdServiceBooking._id;
                })
            );
            // Update hiện trạng phòng
            const roomBookingIds = booking.roomBookings.map((rb) => rb.room);
            await roomModel.updateMany(
                { _id: { $in: roomBookingIds } },
                { $set: { isFree: true } }
            );
            console.log("tra phong", haveForeignGuest);
        }

        let updatedBooking = await bookingModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    roomInteraction: roomInteraction,
                    serviceBookings: createdServiceBookings,
                    haveForeignGuest: haveForeignGuest,
                },
            },
            { new: true }
        );

        if (!updatedBooking) {
            throw {
                code: 1,
                message: "Booking không tồn tại",
            };
        }

        let bill = null;
        if (roomInteraction === "Checked Out") {
            const daysStayed =
                (new Date(booking.checkout) - new Date(booking.checkin)) /
                (1000 * 60 * 60 * 24);

            let surchargeGuestQuantity = [];

            const eachRoomCharges = await Promise.all(
                booking.roomBookings.map(async (rb) => {
                    const roomBooking = await roomBookingModel.findById(rb);
                    const room = await roomModel.findById(roomBooking.room);
                    const roomType = await roomTypeModel.findById(
                        room.roomType
                    );
                    const headcount = roomBooking.headcount;
                    let surchargeTemp = 0;
                    if (headcount >= roomType.capacity) {
                        surchargeTemp =
                            (roomType.price * daysStayed * 25) / 100;
                    }
                    surchargeGuestQuantity.push(surchargeTemp);
                    return roomType.price * daysStayed;
                })
            );

            const roomCharge = eachRoomCharges.reduce(
                (total, charge) => total + charge,
                0
            );

            console.log(surchargeGuestQuantity);

            const surchargeQuantity = surchargeGuestQuantity.reduce(
                (total, surcharge) => total + surcharge,
                0
            );

            const eachServiceCharges = await Promise.all(
                updatedBooking.serviceBookings.map(async (sb) => {
                    const serviceBooking = await serviceBookingModel.findById(
                        sb
                    );
                    const service = await serviceModel.findById(
                        serviceBooking.service
                    );
                    return service.price * serviceBooking.quantity;
                })
            );

            const serviceCharge = eachServiceCharges.reduce(
                (total, charge) => total + charge,
                0
            );

            let surchargeForeignGuest = 0;

            if (haveForeignGuest) {
                surchargeForeignGuest = 0.5;
            }

            const surchargeForeign =
                (roomCharge + serviceCharge) * surchargeForeignGuest;

            //Create a new bill
            bill = await billModel.create({
                guest: booking.guest,
                staff: req.staffId,
                booking: id,
                roomCharge: roomCharge,
                serviceCharge: serviceCharge,
                surchargeForeign: surchargeForeign,
                surchargeQuantity: surchargeQuantity,
            });
        }

        if (bill) {
            res.status(200).json({
                code: 0,
                message:
                    "Chỉnh sửa thông tin thuê phòng thành công và hóa đơn đã được tạo",
                data: updatedBooking,
                bill: bill,
            });
        } else {
            res.status(200).json({
                code: 0,
                message: "Chỉnh sửa thông tin thuê phòng thành công",
                data: updatedBooking,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Đã có lỗi xảy ra: Booking",
        });
    }
};

let searchBooking = async (req, res) => {
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

        const guests = await guestModel.find({
            $or: [{ name: regex }, { phoneNumber: regex }],
        });

        if (!guests || guests.length === 0) {
            throw {
                code: 1,
                message: "Không tìm thấy khách hàng nào phù hợp",
            };
        }

        const guestIds = guests.map((guest) => guest._id);

        // Tìm các đặt phòng của các khách hàng này
        const bookings = await bookingModel
            .find({ guest: { $in: guestIds } })
            .limit(12)
            .skip(offset)
            .sort({ createdAt: -1 });

        const count = await bookingModel.countDocuments({
            guest: { $in: guestIds },
        });

        if (!bookings || bookings.length === 0) {
            throw {
                code: 1,
                message: "Không có dữ liệu nào",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Tìm kiếm thành công",
            count: count,
            data: bookings,
        });
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Lỗi: searchBooking",
        });
    }
};

const getAvailableRooms = async (req, res) => {
    try {
        const { checkin, checkout } = req.params;
        // Tìm tất cả các đặt phòng có ngày check-in hoặc check-out chồng chéo với khoảng thời gian đã cung cấp
        const bookedRooms = await bookingModel
            .find({
                $and: [
                    { checkin: { $lt: checkout } },
                    { checkout: { $gt: checkin } },
                    {
                        roomInteraction: {
                            $nin: ["Reservation Cancelled", "Checked Out"],
                        },
                    },
                ],
            })
            .populate("roomBookings");

        // Lấy danh sách tất cả các ID phòng đã được đặt
        const bookedRoomIds = bookedRooms.flatMap((booking) =>
            booking.roomBookings.map((roomBooking) => roomBooking.room)
        );

        // Tìm tất cả các phòng không nằm trong danh sách các ID phòng đã được đặt
        const availableRooms = await roomModel.find({
            _id: { $nin: bookedRoomIds },
        });

        // Trả về danh sách các phòng còn trống
        res.status(200).json({
            code: 0,
            message: "Lấy dữ liệu thành công",
            data: availableRooms,
        });
    } catch (error) {
        console.error(error);
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Đã có lỗi xảy ra: Booking",
        });
    }
};

let viewListBooking = async (req, res) => {
    try {
        const currentPage = parseInt(req.params.currentPage) || 1;

        let bookings;
        let count;

        if (currentPage === -1) {
            // Lấy hết dữ liệu
            bookings = await bookingModel.find().sort({ createdAt: -1 });
            count = bookings.length;
        } else {
            count = await bookingModel.countDocuments();
            const offset = 12 * (currentPage - 1);

            bookings = await bookingModel
                .find()
                .limit(100)
                .skip(offset)
                .sort({ createdAt: -1 });
        }

        if (!bookings || bookings.length === 0) {
            throw {
                code: 1,
                message: "Không có data nào",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Lấy dữ liệu thành công",
            count: count,
            data: bookings,
        });
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Lỗi: viewListBooking",
        });
    }
};

let viewListRoomBooking = async (req, res) => {
    try {
        const currentPage = parseInt(req.params.currentPage) || 1;

        let roomBookings;
        let count;

        if (currentPage === -1) {
            // Lấy hết dữ liệu
            roomBookings = await roomBookingModel
                .find()
                .sort({ createdAt: -1 });
            count = roomBookings.length;
        } else {
            count = await roomBookingModel.countDocuments();
            const offset = 12 * (currentPage - 1);

            roomBookings = await roomBookingModel
                .find()
                .limit(12)
                .skip(offset)
                .sort({ createdAt: -1 });
        }

        if (!roomBookings || roomBookings.length === 0) {
            throw {
                code: 1,
                message: "Không có data nào",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Lấy dữ liệu thành công",
            count: count,
            data: roomBookings,
        });
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Lỗi: viewListRoomBooking",
        });
    }
};

let viewListServiceBooking = async (req, res) => {
    try {
        const currentPage = parseInt(req.params.currentPage) || 1;

        let serviceBookings;
        let count;

        if (currentPage === -1) {
            // Lấy hết dữ liệu
            serviceBookings = await serviceBookingModel
                .find()
                .sort({ createdAt: -1 });
            count = serviceBookings.length;
        } else {
            count = await serviceBookingModel.countDocuments();
            const offset = 12 * (currentPage - 1);

            serviceBookings = await serviceBookingModel
                .find()
                .limit(12)
                .skip(offset)
                .sort({ createdAt: -1 });
        }

        if (!serviceBookings || serviceBookings.length === 0) {
            throw {
                code: 1,
                message: "Không có data nào",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Lấy dữ liệu thành công",
            count: count,
            data: serviceBookings,
        });
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Lỗi: viewListServiceBooking",
        });
    }
};

let getById = async (req, res) => {
    try {
        const id = req.params.id;
        await bookingModel
            .findById({ _id: id })
            .then((booking) => res.json(booking));
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message,
        });
    }
};

let getRoomBookingById = async (req, res) => {
    try {
        const id = req.params.id;
        await roomBookingModel
            .findById({ _id: id })
            .then((roomBooking) => res.json(roomBooking));
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message,
        });
    }
};

let getServiceBookingById = async (req, res) => {
    try {
        const id = req.params.id;
        await serviceBookingModel
            .findById({ _id: id })
            .then((serviceBooking) => res.json(serviceBooking));
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message,
        });
    }
};

let searchBookingByPhoneNumber = async (req, res) => {
    try {
        const currentPage = parseInt(req.params.currentPage) || 1;
        const keyword = req.params.keyword || null;

        if (!keyword) {
            throw {
                code: 1,
                message: "Hãy nhập nội dung tìm kiếm",
            };
        }

        const offset = 12 * (currentPage - 1);

        const guest = await guestModel.findOne({ phoneNumber: keyword });

        if (!guest) {
            throw {
                code: 1,
                message: "Không tìm thấy khách hàng nào với số điện thoại này",
            };
        }

        const bookings = await bookingModel
            .find({ guest: guest._id })
            .limit(12)
            .skip(offset)
            .sort({ createdAt: -1 })
            .populate("guest")
            .populate("roomBookings")
            .populate("serviceBookings");

        const count = await bookingModel.countDocuments({ guest: guest._id });

        if (!bookings || bookings.length === 0) {
            throw {
                code: 1,
                message: "Không có dữ liệu nào",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Tìm kiếm thành công",
            count: count,
            data: bookings,
        });
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Lỗi: searchBooking",
        });
    }
};

const getBookingCountByMonthYear = async (req, res) => {
    try {
        const { month, year } = req.params;
        const startDate = new Date(year, month - 1, 1); // month - 1 vì tháng bắt đầu từ 0 (0 - 11)
        const endDate = new Date(year, month, 0); // Ngày cuối cùng của tháng trước

        const totalBookingCount = await bookingModel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
        });

        const canceledBookingCount = await bookingModel.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
            roomInteraction: "Reservation Cancelled",
        });

        res.status(200).json({
            code: 0,
            message: "Lấy số lượng booking thành công",
            data: {
                totalBookingCount: totalBookingCount,
                canceledBookingCount: canceledBookingCount,
            },
        });
    } catch (error) {
        res.status(500).json({
            code: 1,
            message: "Đã có lỗi xảy ra: getBookingCountByMonthYear",
        });
    }
};

module.exports = {
    createBooking,
    editBooking,
    searchBooking,
    getAvailableRooms,
    viewListBooking,
    viewListRoomBooking,
    viewListServiceBooking,
    getById,
    getRoomBookingById,
    getServiceBookingById,
    searchBookingByPhoneNumber,
    getBookingCountByMonthYear,
};
