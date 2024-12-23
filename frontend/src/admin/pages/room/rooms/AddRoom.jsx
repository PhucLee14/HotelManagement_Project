import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addNewRoom } from "../../../../service/roomService";
import { viewListRoomType } from "../../../../service/roomTypeService";
import toast from "react-hot-toast";

const AddRoom = () => {
    const nav = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [room, setRoom] = useState({
        roomNumber: "",
        roomType: "",
    });

    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewListRoomType(-1);
            console.log(data);
            if (data?.code === 0) {
                setData(data?.data);
                if (data?.data?.length > 0) {
                    setRoom((prevRoom) => ({
                        ...prevRoom,
                        roomType: data.data[0]._id,
                    }));
                }
            } else {
                setData([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const addData = async () => {
        console.log(room);
        try {
            setIsLoading(true);
            const data = await addNewRoom(room);
            console.log(data);
            if (data?.code === 0) {
                toast.success(data.message);
                nav("/admin/rooms");
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
        setRoom({
            ...room,
            [name]: value,
        });
    };

    return (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Add New Room
            </div>
            <div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Room Code</p>
                    <input
                        type="text"
                        name="roomNumber"
                        value={room.roomNumber}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Room Category</p>
                    <select
                        name="roomType"
                        value={room.roomType}
                        onChange={handleChange}
                        id=""
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    >
                        {data.map((roomtype) => (
                            <option key={roomtype._id} value={roomtype._id}>
                                {roomtype.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            addData();
                        }}
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
                        // disabled={isLoading}
                    >
                        Create
                    </button>
                    <Link
                        to="/admin/rooms"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddRoom;
