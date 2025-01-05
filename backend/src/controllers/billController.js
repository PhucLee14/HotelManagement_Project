const billModel = require("../models/billModel");
const guestModel = require("../models/guestModel");
const staffModel = require("../models/staffModel");

let viewListBill = async (req, res) => {
    try {
        const currentPage = parseInt(req.params.currentPage) || 1;

        let bills;
        let count;

        if (currentPage === -1) {
            // Get all data
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
                message: "No data found",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Data retrieved successfully",
            data: bills,
            count: count,
        });
    } catch (error) {
        res.status(500).json({
            code: error.code || 500,
            message: error.message || "Internal server error",
        });
    }
};

let searchBill = async (req, res) => {
    try {
        const { keyword, currentPage } = req.params;
        const regex = new RegExp(keyword, "i");
        const offset = 12 * (currentPage - 1);

        const guests = await guestModel.find({
            name: regex,
        });

        const staffs = await staffModel.find({
            name: regex,
        });

        if (
            (!guests || guests.length === 0) &&
            (!staffs || staffs.length === 0)
        ) {
            throw {
                code: 1,
                message: "No matching guests or staff found",
            };
        }

        const guestIds = guests.map((guest) => guest._id);
        const staffIds = staffs.map((staff) => staff._id);

        // Find bills for these guests or staff
        const bills = await billModel
            .find({
                $or: [
                    { guest: { $in: guestIds } },
                    { staff: { $in: staffIds } },
                ],
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
                message: "No data found",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Data retrieved successfully",
            data: bills,
            count: count,
        });
    } catch (error) {
        res.status(500).json({
            code: error.code || 500,
            message: error.message || "Internal server error",
        });
    }
};

let getById = async (req, res) => {
    try {
        const bill = await billModel.findById(req.params.id);

        if (!bill) {
            throw {
                code: 1,
                message: "Bill not found",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Bill retrieved successfully",
            data: bill,
        });
    } catch (error) {
        res.status(500).json({
            code: error.code || 500,
            message: error.message || "Internal server error",
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
                    totalRoomCharge: { $sum: "$roomCharge" },
                    totalServiceCharge: { $sum: "$serviceCharge" },
                    totalSurcharge: {
                        $sum: {
                            $sum: ["$surchargeForeign", "$surchargeQuantity"],
                        },
                    },
                    totalRevenue: {
                        $sum: {
                            $sum: [
                                "$roomCharge",
                                "$serviceCharge",
                                "$surchargeForeign",
                                "$surchargeQuantity",
                            ],
                        },
                    },
                },
            },
        ]);

        if (totalRevenue.length === 0 || !totalRevenue[0].totalRevenue) {
            return res.status(200).json({
                code: 0,
                message: "No revenue data found",
                data: {
                    totalRevenue: 0,
                    totalRoomCharge: 0,
                    totalServiceCharge: 0,
                    totalSurcharge: 0,
                },
            });
        }

        res.status(200).json({
            code: 0,
            message: "Revenue data retrieved successfully",
            data: {
                totalRevenue: totalRevenue[0].totalRevenue,
                totalRoomCharge: totalRevenue[0].totalRoomCharge,
                totalServiceCharge: totalRevenue[0].totalServiceCharge,
                totalSurcharge: totalRevenue[0].totalSurcharge,
            },
        });
    } catch (error) {
        res.status(500).json({
            code: 1,
            message: "An error occurred while retrieving revenue data",
        });
    }
};

module.exports = {
    viewListBill,
    searchBill,
    getById,
    getRevenueByMonthYear,
};
