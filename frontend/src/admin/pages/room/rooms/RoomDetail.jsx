import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import { viewRoom } from "../../../../service/roomService";
import { viewRoomtype } from "../../../../service/roomTypeService";

const RoomDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [roomType, setRoomType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewRoom(id);
            const roomTypeData = await viewRoomtype(data.roomType);
            console.log(data);
            // if (data?.code === 0) {
            setData(data);
            setRoomType(roomTypeData.name);
            console.log(roomType);
            // } else {
            //     setData([]);
            // }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    console.log(data);
    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Room {data.roomNumber}
            </div>
            <div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Room Status: </p>
                    <p className="text-gray-500">{data.status}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Room Category: </p>
                    <p className="text-gray-500">{roomType}</p>
                </div>
                <div className="flex">
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

export default RoomDetail;
