import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addNewService } from "../../../service/serviceService";
import toast from "react-hot-toast";

const AddService = () => {
    const nav = useNavigate();
    const [service, setService] = useState({
        name: "",
        price: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const addData = async () => {
        console.log(service);
        try {
            setIsLoading(true);
            const data = await addNewService(service);
            console.log(data);
            if (data?.code === 0) {
                toast.success(data.message);
                nav("/admin/service");
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
        setService({
            ...service,
            [name]: value,
        });
    };
    return (
        <div className="min-h-[78vh]">
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Add New Service
            </div>
            <div>
                {/* <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Service Code</p>
                    <input
                        type="text"
                        className="w-3/4 outline-none rounded-lg p-1 border-gray-300 border mt-2"
                    />
                </div> */}
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Service Name</p>
                    <input
                        type="text"
                        name="name"
                        value={service.name}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Service Price</p>
                    <input
                        type="text"
                        name="price"
                        value={service.price}
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
                        to="/admin/service"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddService;
