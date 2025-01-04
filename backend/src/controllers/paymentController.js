const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();
const guestModel = require("../models/guestModel");
const bookingModel = require("../models/bookingModel");
const roomBookingModel = require("../models/roomBookingModel");
const roomModel = require("../models/roomModel");

const URL_FRONTEND = process.env.URL_FRONTEND;

const accessKey = "F8BBA842ECF85";
const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

let payment = async (req, res) => {
    const { amount, bookingInfo } = req.body;
    const orderInfo = "Hotel Payment With Momo";
    const partnerCode = "MOMO";
    const redirectUrl = URL_FRONTEND;
    const ipnUrl =
        "https://0e98-171-243-49-212.ngrok-free.app/api/payment/callback";
    const requestType = "payWithMethod";
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = Buffer.from(JSON.stringify({ bookingInfo })).toString(
        "base64"
    );
    const orderGroupId = "";
    const autoCapture = true;
    const lang = "vi";

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");

    const requestBody = JSON.stringify({
        partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        lang,
        requestType,
        autoCapture,
        extraData,
        orderGroupId,
        signature,
        orderExpireTime: 10,
    });

    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
        },
        data: requestBody,
    };

    try {
        const result = await axios(options);
        return res.status(200).json(result.data);
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message,
        });
    }
};

let callback = async (req, res) => {
    console.log(req.body.resultCode);

    if (req.body.resultCode == 0) {
        const extraData = Buffer.from(req.body.extraData, "base64").toString(
            "utf-8"
        );
        const bookingInfo = JSON.parse(extraData).bookingInfo;

        let guest = await guestModel.findOne({
            phoneNumber: bookingInfo.phoneNumber,
        });

        if (!guest) {
            guest = await guestModel.create({
                name: bookingInfo.guestName,
                phoneNumber: bookingInfo.phoneNumber,
                dateOfBirth: bookingInfo.birthday,
                guestCategories: "Normal",
            });
        }

        const checkin = new Date(bookingInfo.checkIn);
        const checkout = new Date(bookingInfo.checkOut);

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

        const createdRoomBookings = [];
        for (let room of bookingInfo.room) {
            let roomIndex = 0;
            const roomType = room.roomtypeId;
            const quantity = parseInt(room.value);
            const headcounts = room.headCount;

            // Filter available rooms by room type
            const availableRoomsOfType = availableRooms.filter(
                (room) => room.roomType.toString() === roomType
            );

            // Check if enough available rooms of this type
            if (availableRoomsOfType.length < quantity) {
                return res.status(400).json({
                    error: "Not enough available rooms of type " + roomType,
                });
            }

            // Take the required number of rooms
            const selectedRooms = availableRoomsOfType.slice(0, quantity);

            // Create room bookings for selected rooms
            for (let selectedRoom of selectedRooms) {
                const createdRoomBooking = await roomBookingModel.create({
                    room: selectedRoom._id,
                    headcount: headcounts[roomIndex],
                });
                createdRoomBookings.push(createdRoomBooking._id);
                roomIndex++;
            }
        }

        // Tạo một đặt phòng mới với thông tin được cung cấp và danh sách các đặt phòng của phòng
        const booking = await bookingModel.create({
            guest: guest._id,
            checkin: checkin,
            checkout: checkout,
            roomInteraction: "Not Checked In",
            roomBookings: createdRoomBookings,
            isDeposit: true,
        });
        console.log(booking);

        return res
            .status(200)
            .json({ message: "Booking created successfully", booking });
    }
    return res.status(200).json(req.body);
};

let transactionStatus = async (req, res) => {
    const { orderId } = req.body;

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

    const signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");

    const requestBody = JSON.stringify({
        partnerCode: "MOMO",
        requestId: orderId,
        orderId,
        signature,
        lang: "vi",
    });

    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/query",
        headers: {
            "Content-Type": "application/json",
        },
        data: requestBody,
    };
    try {
        const result = await axios(options);
        return res.status(200).json(result.data);
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message,
        });
    }
};

let getData = async (req, res) => {
    const data = req.body;
    console.log(data);
    return res.status(200).json(req.body);
};

module.exports = {
    payment,
    callback,
    transactionStatus,
};
