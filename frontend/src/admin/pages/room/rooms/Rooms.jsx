import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewListRoom } from "../../../../service/roomService";
import Loading from "../../../../components/loading/Loading";
import { viewListRoomType } from "../../../../service/roomTypeService";

const Rooms = () => {
    const [data, setData] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
        getRoomTypes();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewListRoom(-1);
            if (data?.code === 0) {
                setData(data?.data.reverse());
            } else {
                setData([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getRoomTypes = async () => {
        try {
            const data = await viewListRoomType(-1);
            if (data?.code === 0) {
                setRoomTypes(data?.data);
            } else {
                setRoomTypes([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getRoomTypeName = (roomTypeId) => {
        const roomType = roomTypes.find((rt) => rt._id === roomTypeId);
        return roomType ? roomType.name : "Unknown";
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="flex justify-between items-center mb-4 mr-8">
                <div className="text-[40px] font-semibold text-gray-600">
                    Room List
                </div>
                <div>
                    <Link
                        to="/admin/rooms/create"
                        className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
                    >
                        Add new{" "}
                    </Link>
                </div>
            </div>
            <div className="flex w-1/4 mt-4">
                <input
                    type="text"
                    className="border-2 outline-none px-4 py-2 w-full rounded-s-lg"
                    placeholder="Input name of room type"
                />
                <button className="border-2 border-l-0 bg-white hover:bg-gray-50 outline-none px-4 rounded-e-lg">
                    <i class="fa-solid fa-magnifying-glass text-gray-500"></i>
                </button>
            </div>
            <div className="mt-2 flex flex-wrap">
                {data
                    .sort(
                        (a, b) =>
                            parseInt(a.roomNumber) - parseInt(b.roomNumber)
                    )
                    .map((room) => (
                        <div
                            key={room._id}
                            className={`w-[24%] mt-4 bg-white rounded-lg border-l-4 mr-2 shadow-md ${
                                room.isFree
                                    ? "border-[#1cc88a]"
                                    : "border-red-600"
                            }`}
                        >
                            <div className="flex flex-col p-6">
                                <div>
                                    <p
                                        className={`uppercase font-semibold text-lg ${
                                            room.isFree
                                                ? "text-[#1cc88a]"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {getRoomTypeName(room.roomType)}
                                    </p>
                                    <p className="font-semibold text-lg mt-4">
                                        {room.roomNumber}
                                    </p>
                                </div>
                                <div className="flex justify-end mt-2 -mr-2 -mb-2">
                                    <Link
                                        to={`/admin/rooms/edit/${room._id}`}
                                        className={` py-2 px-6 rounded-lg font-semibold ${
                                            room.isFree
                                                ? "text-[#1cc88a]"
                                                : "text-red-600"
                                        }`}
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to={`/admin/rooms/${room._id}`}
                                        className={`text-white py-2 px-6 rounded-lg ${
                                            room.isFree
                                                ? "bg-[#1cc88a]"
                                                : "bg-red-600"
                                        }`}
                                    >
                                        Detail
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Rooms;
