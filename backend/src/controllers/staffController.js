const jwtActions = require("../middleware/jwtActions");
const staffModel = require("../models/staffModel");
const bcrypt = require("bcrypt");

let login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw {
                code: 1,
                message: "Không được bỏ trống thông tin",
            };
        }
        let staff = await staffModel.findOne({ username });

        if (!staff) {
            throw {
                code: 1,
                message: "Tài khoản hoặc mật khẩu không đúng",
            };
        }

        if (!staff.password) {
            throw {
                code: 1,
                message: "Tài khoản hoặc mật khẩu không đúng",
            };
        }
        // console.log(password);
        // console.log(staff.password);
        hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const isPasswordValid = await bcrypt.compare(password, staff.password);

        if (!isPasswordValid) {
            throw {
                code: 1,
                message: "Tài khoản hoặc mật khẩu không chính xác",
            };
        }

        let payload = {
            id: staff._id,
        };

        const token = jwtActions.createJWT(payload);

        // Lưu token vào cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 ngày
        });

        res.status(200).json({
            code: 0,
            message: "Đăng nhập thành công",
            data: { _id: staff._id, name: staff.name, token },
        });
    } catch (error) {
        console.error(error);
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Đã có lỗi xảy ra: Login",
        });
    }
};

let logout = async (req, res) => {
    try {
        // xóa cookie
        res.clearCookie("token");

        res.status(200).json({
            code: 0,
            message: "Đăng xuất thành công",
        });
    } catch (error) {
        console.error(error);
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Đã có lỗi xảy ra: Logout",
        });
    }
};

let refresh = async (req, res) => {
    try {
        const staffId = req.staffId;

        if (!staffId) {
            throw {
                code: 1,
                message: "Đã có lỗi xảy ra khi refresh: Không tìm thấy staffId",
            };
        }

        let staff = await staffModel.findById(staffId);

        if (!staff) {
            throw {
                code: 1,
                message: "Đã có lỗi xảy ra khi refresh: Không tìm thấy staff",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Refresh thành công",
            data: staff,
        });
    } catch (error) {
        console.error(error);
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Đã có lỗi xảy ra: Refresh",
        });
    }
};

let add = async (req, res) => {
    try {
        const data = req.body;
        console.log(data.name);
        if (
            !data.name ||
            !data.username ||
            !data.password ||
            !data.phoneNumber ||
            !data.IDnumber ||
            !data.dateOfBirth ||
            !data.role
        ) {
            throw {
                code: 1,
                message: "Không được bỏ trống thông tin",
            };
        }

        // Kiểm tra tuổi, nhân viên phải đủ 18 tuổi
        const dateOfBirth = new Date(data.dateOfBirth);
        const age = new Date().getFullYear() - dateOfBirth.getFullYear();
        const isBirthdayPassed =
            new Date().setFullYear(new Date().getFullYear()) >=
            dateOfBirth.setFullYear(new Date().getFullYear());

        if (age < 18 || (age === 18 && !isBirthdayPassed)) {
            throw {
                code: 1,
                message: "Nhân viên phải đủ 18 tuổi",
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
        let staff = await staffModel.findOne({ phoneNumber: data.phoneNumber });

        if (staff) {
            throw {
                code: 1,
                message: "Số điện thoại đã tồn tại",
            };
        }

        staff = await staffModel.findOne({ IDnumber: data.IDnumber });
        if (staff) {
            throw {
                code: 1,
                message: "Số CCCD đã tồn tại",
            };
        }
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(data.password, 10);

        staff = await staffModel.create({
            name: data.name,
            username: data.username,
            password: hashedPassword,
            phoneNumber: data.phoneNumber,
            IDnumber: data.IDnumber,
            dateOfBirth: data.dateOfBirth,
            role: data.role,
        });

        res.status(200).json({
            code: 0,
            message: "Thêm nhân viên thành công",
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
        if (
            !data.name ||
            !data.username ||
            !data.phoneNumber ||
            !data.IDnumber ||
            !data.dateOfBirth ||
            !data.role
        ) {
            throw {
                code: 1,
                message: "Không được bỏ trống thông tin",
            };
        }

        let staff = await staffModel.findById(id);
        if (!staff) {
            throw {
                code: 1,
                message: "Nhân viên đã tồn tại",
            };
        }

        // Kiểm tra tuổi, nhân viên phải đủ 18 tuổi
        const dateOfBirth = new Date(data.dateOfBirth);
        const age = new Date().getFullYear() - dateOfBirth.getFullYear();
        const isBirthdayPassed =
            new Date().setFullYear(new Date().getFullYear()) >=
            dateOfBirth.setFullYear(new Date().getFullYear());

        if (age < 18 || (age === 18 && !isBirthdayPassed)) {
            throw {
                code: 1,
                message: "Nhân viên phải đủ 18 tuổi",
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

        // Kiểm tra xem IDnumber đã tồn tại cho nhân viên khác hay không
        let existingStaffWithID = await staffModel.findOne({
            IDnumber: data.IDnumber,
            _id: { $ne: id },
        });

        if (existingStaffWithID) {
            throw {
                code: 1,
                message: "Số CCCD đã tồn tại cho nhân viên khác",
            };
        }

        // Kiểm tra xem phoneNumber đã tồn tại cho nhân viên khác hay không
        let existingStaffWithPhone = await staffModel.findOne({
            phoneNumber: data.phoneNumber,
            _id: { $ne: id },
        });
        if (existingStaffWithPhone) {
            throw {
                code: 1,
                message: "Số điện thoại đã tồn tại cho nhân viên khác",
            };
        }

        let hashedPassword = null;
        if (data.password) {
            hashedPassword = await bcrypt.hash(data.password, 10);
        }

        // Create the update object
        let updateData = {
            name: data.name,
            username: data.username,
            phoneNumber: data.phoneNumber,
            IDnumber: data.IDnumber,
            dateOfBirth: data.dateOfBirth,
            role: data.role,
        };

        // Conditionally add the password to the update object
        if (hashedPassword) {
            updateData.password = hashedPassword;
        }

        // Cập nhật thông tin nhân viên
        let existingStaff = await staffModel.findByIdAndUpdate(
            id,
            {
                $set: updateData,
            },
            { new: true }
        );

        res.status(200).json({
            code: 0,
            message: "Chỉnh sửa thông tin nhân viên thành công",
        });
    } catch (error) {
        console.error(error);
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Đã có lỗi xảy ra: Logout",
        });
    }
};

let viewListStaff = async (req, res) => {
    try {
        const currentPage = parseInt(req.params.currentPage) || 1;

        let staffs;
        let count;

        if (currentPage === -1) {
            // Lấy hết dữ liệu
            staffs = await staffModel.find().sort({ createdAt: -1 });
            count = staffs.length;
        } else {
            count = await staffModel.countDocuments();
            const offset = 12 * (currentPage - 1);

            staffs = await staffModel
                .find()
                .limit(12)
                .skip(offset)
                .sort({ createdAt: -1 });
        }

        if (!staffs || staffs.length === 0) {
            throw {
                code: 1,
                message: "Không có data nào",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Lấy dữ liệu thành công",
            count: count,
            data: staffs,
        });
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Lỗi: viewListStaff",
        });
    }
};

let searchStaff = async (req, res) => {
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

        const count = await staffModel.countDocuments({
            $or: [{ name: regex }, { phoneNumber: regex }],
        });

        const offset = 12 * (currentPage - 1);

        const staffs = await staffModel
            .find({
                $or: [{ name: regex }, { phoneNumber: regex }],
            })
            .limit(12)
            .skip(offset)
            .sort({ createdAt: -1 });

        if (!staffs || staffs.length === 0) {
            throw {
                code: 1,
                message: "Không có data nào",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Tìm kiếm thành công",
            count: count,
            data: staffs,
        });
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Lỗi: searchGuest",
        });
    }
};

let getById = async (req, res) => {
    try {
        const id = req.params.id;
        await staffModel.findById({ _id: id }).then((staff) => res.json(staff));
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message,
        });
    }
};

module.exports = {
    login,
    refresh,
    logout,
    add,
    edit,
    viewListStaff,
    searchStaff,
    getById,
};
