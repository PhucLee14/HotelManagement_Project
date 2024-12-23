import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editGuest, viewGuest } from "../../../service/guestService";
import Loading from "../../../components/loading/Loading";
import toast from "react-hot-toast";

const EditGuest = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [guest, setGuest] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        IDnumber: "",
        dateOfBirth: "",
        guestCategories: "",
        guestType: "",
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            setGuest(await viewGuest(id));
            // if (data?.code === 0) {
            // } else {
            //     setData([]);
            // }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const editData = async () => {
        console.log(guest);
        try {
            setIsLoading(true);
            const data = await editGuest(id, guest);
            console.log(data);
            if (data.code === 0) {
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

    const formatDate = (date) => {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const formattedDateOfBirth = guest.dateOfBirth
        ? formatDate(guest.dateOfBirth)
        : "";

    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Edit Guest
            </div>
            <div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">ID Number</p>
                    <input
                        type="text"
                        name="IDnumber"
                        defaultValue={guest.IDnumber}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Guest Name</p>
                    <input
                        type="text"
                        name="name"
                        defaultValue={guest.name}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Guest Category</p>
                    <select
                        name="guestCategories"
                        onChange={handleChange}
                        id=""
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                        defaultValue={guest.guestCategories}
                    >
                        <option value="Normal">Normal</option>
                        <option value="Vip">Vip</option>
                    </select>
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Guest Type</p>
                    <select
                        name="guestType"
                        onChange={handleChange}
                        id=""
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                        defaultValue={guest.guestType}
                    >
                        <option value="Comestic">Comestic</option>
                        <option value="Foreign">Foreign</option>
                    </select>
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Date Of Birth</p>
                    <input
                        type="date"
                        name="dateOfBirth"
                        defaultValue={formattedDateOfBirth}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Phone Number</p>
                    <input
                        type="text"
                        name="phoneNumber"
                        defaultValue={guest.phoneNumber}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            editData();
                        }}
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
                        disabled={isLoading}
                    >
                        Submit
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

export default EditGuest;
