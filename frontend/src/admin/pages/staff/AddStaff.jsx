import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../components/loading/Loading";
import { addNewStaff } from "../../../service/staffService";

const AddStaff = () => {
    const nav = useNavigate();
    const [staff, setStaff] = useState({
        IDnumber: "",
        name: "",
        dateOfBirth: "",
        role: "Receptionist",
        phoneNumber: "",
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const addData = async () => {
        console.log(staff);
        try {
            setIsLoading(true);
            const data = await addNewStaff(staff);
            console.log(data);
            if (data?.code === 0) {
                toast.success(data.message);
                nav("/admin/staff");
            } else {
                toast.error(data.message);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaff({
            ...staff,
            [name]: value,
        });
    };

    return (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Add New Staff
            </div>
            <div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">ID Number</p>
                    <input
                        type="text"
                        name="IDnumber"
                        value={staff.IDnumber}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Staff Name</p>
                    <input
                        type="text"
                        name="name"
                        value={staff.name}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Date Of Birth</p>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={staff.dateOfBirth}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Job Title</p>
                    <select
                        name="role"
                        value={staff.role}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    >
                        <option value="Receptionist">
                            Receptionist
                        </option>
                        <option value="Sales Staff">
                            Sales Staff
                        </option>
                        <option value="Accountant">
                            Accountant
                        </option>
                    </select>
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Phone Number</p>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={staff.phoneNumber}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Account</p>
                    <input
                        type="text"
                        name="username"
                        value={staff.username}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Password</p>
                    <input
                        type="text"
                        name="password"
                        value={staff.password}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            addData();
                        }}
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
                        disabled={isLoading}
                    >
                        Create
                    </button>
                    <Link
                        to="/admin/staff"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddStaff;
