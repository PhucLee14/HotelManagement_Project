import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import Banner from "../../components/banner/Banner";
import home_3 from "../../assets/images/home_3.jpg";
import RoomTag from "../../components/roomTag/RoomTag";
import { viewListRoomType } from "../../service/roomTypeService";
import { Link } from "react-router-dom";
import { viewListFreeRoom } from "../../service/bookingService";

const Room = () => {
    const [roomType, setRoomType] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bookedDate, setBookedDate] = useState({
        checkin: "",
        checkout: "",
    });
    const [selectedValues, setSelectedValues] = useState([]);
    const today = new Date().toISOString().split("T")[0];
    const [submitBtn, setSubmitBtn] = useState(false);

    const getNextDay = (date) => {
        if (!date) return "";
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.toISOString().split("T")[0];
    };

    const getRoomTypes = async () => {
        try {
            setIsLoading(true);
            const data = await viewListRoomType(-1);
            console.log(data);
            if (data?.code === 0) {
                setRoomType(data?.data);
            } else {
                setRoomType([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getRooms = async () => {
        try {
            // setIsLoading(true);
            const data = await viewListFreeRoom(
                bookedDate.checkin,
                bookedDate.checkout
            );
            console.log(data);
            if (data?.code === 0) {
                setRooms(data?.data);
            } else {
                setRooms([]);
            }
            // setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckin = (e) => {
        setBookedDate({
            checkin: e.target.value,
        });
    };

    useEffect(() => {
        getRoomTypes();
    }, []);

    useEffect(() => {
        if (roomType.length > 0) {
            setSelectedValues(
                roomType.map((roomtype, index) => ({
                    roomtypeId: roomtype._id,
                    roomtype: roomtype.name,
                    price: roomtype.price,
                    value: "0",
                    bedQuantity: "",
                    bedType: "",
                }))
            );
        }
    }, [roomType]);

    useEffect(() => {
        localStorage.setItem("bookedDateStored", JSON.stringify(bookedDate));
        localStorage.setItem("roomStored", JSON.stringify(selectedValues));
        setSubmitBtn(selectedValues.some((item) => item.value != "0"));
    }, [selectedValues, bookedDate]);

    useEffect(() => {
        if (bookedDate.checkin) {
            setBookedDate((prev) => ({
                ...prev,
                checkout: getNextDay(bookedDate.checkin),
            }));
        }
    }, [bookedDate.checkin]);

    return isLoading ? (
        <Loading />
    ) : (
        <div className="w-full bg-white flex flex-col items-center">
            <Banner title="Rooms" des="ROOM." />
            <div className="relative w-3/5 bg-white shadow-xl p-8 rounded-xl -top-[70px] flex items-end justify-between">
                <div className="w-2/5">
                    <p className="mb-2 font-semibold">Check In</p>
                    <input
                        type="date"
                        className="border-2 w-full px-4 py-2 rounded-md outline-none"
                        onChange={handleCheckin}
                        min={today}
                    />
                </div>
                <div className="w-2/5">
                    <p className="mb-2 font-semibold">Check Out</p>
                    <input
                        type="date"
                        className={`border-2 w-full px-4 py-2 rounded-md outline-none ${
                            !bookedDate.checkin
                                ? "opacity-50 cursor-default"
                                : ""
                        }`}
                        min={getNextDay(bookedDate.checkin)}
                        onClick={(e) => {
                            if (!bookedDate.checkin) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            setBookedDate((prev) => ({
                                ...prev,
                                checkout: e.target.value,
                            }));
                        }}
                        value={bookedDate.checkout}
                    />
                </div>
                <button
                    className="btn w-1/6 bg-blue-600 hover:bg-blue-500 text-white h-3/5 rounded-lg"
                    onClick={() => {
                        if (bookedDate.checkin && bookedDate.checkout) {
                            getRooms();
                        }
                    }}
                >
                    Check
                </button>
            </div>
            <div className="flex w-3/5 flex-wrap justify-between mb-8">
                {roomType.map((roomtype, index) => {
                    let quantity = 0;
                    rooms.map((room) => {
                        room.roomType == roomtype._id ? quantity++ : "";
                    });

                    const bedQuantity =
                        roomtype.name === "Family" ||
                        roomtype.name === "Superior" ||
                        roomtype.name === "Family Suite"
                            ? 2
                            : 1;

                    let bedType = "Twin Bed";
                    if (
                        roomtype.name === "Family" ||
                        roomtype.name === "Superior"
                    ) {
                        bedType = "Single Bed";
                    } else if (roomtype.name === "Suite") {
                        bedType = "Big Twin Bed";
                    }
                    return (
                        <RoomTag
                            index={index}
                            img={roomtype.images}
                            name={roomtype.name}
                            price={roomtype.price}
                            bed={bedQuantity + " " + bedType}
                            quantity={quantity}
                            onSelectChange={(value) => {
                                const newQuantities = [...selectedValues];
                                newQuantities[index].value = value;
                                newQuantities[index].bedQuantity = bedQuantity;
                                newQuantities[index].bedType = bedType;
                                setSelectedValues(newQuantities);
                            }}
                        />
                    );
                })}
            </div>
            <Link
                className={`btn py-3 mb-8 px-16 bg-black text-white ${
                    submitBtn
                        ? "hover:bg-gray-600"
                        : "cursor-default bg-gray-300"
                }`}
                to="/booking"
                onClick={(e) => {
                    submitBtn ? "" : e.preventDefault();
                }}
            >
                Submit
            </Link>

            <div className="flex flex-col items-center bg-slate-100 pt-12 pb-16 w-full">
                <p className="text-[52px] font-serif font-semibold">
                    Great Offers
                </p>
                <p className="text-gray-600 w-2/5 mb-12">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean.
                </p>
                <div className="w-3/5 h-[540px] m-auto py-4 px-2 flex flex-col items-center mb-48">
                    <div className="flex h-[350px] w-[1200px]">
                        <img src={home_3} alt="" className="h-full w-1/2" />
                        <div className="flex flex-col justify-center p-8 bg-white w-1/2">
                            <p className="text-[40px] font-semibold">
                                Family Room
                            </p>
                            <p className="my-8">
                                Far far away, behind the word mountains, far
                                from the countries Vokalia and Consonantia,
                                there live the blind texts. Separated they live
                                in Bookmarksgrove right at the coast of the
                                Semantics, a large language ocean.
                            </p>
                            <p className="text-indigo-600 font-bold text-2xl ">
                                750.000VND
                            </p>
                        </div>
                    </div>
                    <div className="flex h-[350px] w-[1200px]">
                        <div className="flex flex-col justify-center p-8 bg-white w-1/2">
                            <p className="text-[40px] font-semibold">
                                Suite Room
                            </p>
                            <p className="my-8">
                                Far far away, behind the word mountains, far
                                from the countries Vokalia and Consonantia,
                                there live the blind texts. Separated they live
                                in Bookmarksgrove right at the coast of the
                                Semantics, a large language ocean.
                            </p>
                            <p className="text-indigo-600 font-bold text-2xl ">
                                1.250.000VND
                            </p>
                        </div>
                        <img src={home_3} alt="" className="h-full w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;
