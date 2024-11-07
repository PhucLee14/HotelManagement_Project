import React, { useEffect, useState } from "react";
import Loading from "../../../../components/loading/Loading";
import { Link, useParams } from "react-router-dom";
import { viewRoomtype } from "../../../../service/roomTypeService";
import formatNumber from "../../../../utils/formatNumber";

const RoomTypeDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewRoomtype(id);
            console.log(data);
            // if (data?.code === 0) {
            setData(data);
            // } else {
            //     setData([]);
            // }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    return isLoading ? (
        <Loading />
    ) : (
        <div className="h-[78vh]">
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Room Type Detail
            </div>
            <div className="flex">
                <div className="max-w-[450px] rounded-xl overflow-hidden mr-14 my-3">
                    <img src={data.images} alt="" />
                </div>
                <div>
                    <div className="flex py-3 border-b">
                        <p className="font-semibold mr-4">
                            Room Category Name:{" "}
                        </p>
                        <p className="text-gray-500">{data.name}</p>
                    </div>
                    <div className="flex py-3 border-b">
                        <p className="font-semibold mr-4">Category: </p>
                        <p className="text-gray-500">{data.capacity}</p>
                    </div>
                    <div className="flex py-3 border-b">
                        <p className="font-semibold mr-4">Room Rates: </p>
                        <p className="text-gray-500">
                            {data.price ? formatNumber(data.price) : ""} VND
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex">
                <Link
                    to="/admin/roomtype"
                    className="rounded-lg text-red-600 py-2 mt-4 w-32"
                >
                    Back to list
                </Link>
            </div>
        </div>
    );
    return <div>RoomTypeDetail</div>;
};

export default RoomTypeDetail;
