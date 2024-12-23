import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addNewGuest } from "../../../service/guestService";
import toast from "react-hot-toast";

const AddGuest = () => {
    const nav = useNavigate();
    const [guest, setGuest] = useState({
        IDnumber: "",
        name: "",
        guestCategories: "Normal",
        guestType: "Domestic",
        dateOfBirth: "",
        phoneNumber: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const addData = async () => {
        console.log(guest);
        try {
            setIsLoading(true);
            const data = await addNewGuest(guest);
            console.log(data);
            if (data?.code === 0) {
                toast.success(data.message);
                nav("/admin/guest");
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
        setGuest({
            ...guest,
            [name]: value,
        });
    };
    return (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Add New Guest
            </div>
            <div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">ID Number</p>
                    <input
                        id="guest_id"
                        type="text"
                        name="IDnumber"
                        value={guest.IDnumber}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Guest Name</p>
                    <input
                        id="guest_name"
                        type="text"
                        name="name"
                        value={guest.name}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Guest Category</p>
                    <select
                        name="guestCategories"
                        value={guest.guestCategories}
                        onChange={handleChange}
                        id="guest_category"
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    >
                        <option value="">Normal</option>
                        <option value="Vip">Vip</option>
                    </select>
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Guest Type</p>
                    <select
                        name="guestType"
                        value={guest.guestType}
                        onChange={handleChange}
                        id="guest_type"
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    >
                        <option value="">Domestic</option>
                        <option value="Foreign">Foreign</option>
                    </select>
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Date Of Birth</p>
                    <input
                        id="guest_birth"
                        type="date"
                        name="dateOfBirth"
                        value={guest.dateOfBirth}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Phone Number</p>
                    <input
                        id="guest_phonenumber"
                        type="text"
                        name="phoneNumber"
                        value={guest.phoneNumber}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        id="submit"
                        onClick={() => {
                            addData();
                        }}
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
                        disabled={isLoading}
                    >
                        Create
                    </button>
                    <Link
                        to="/admin/guest"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddGuest;
