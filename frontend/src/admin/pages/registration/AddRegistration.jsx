import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { viewListRoomType } from "../../../service/roomTypeService";
import {
    createNewBooking,
    viewListFreeRoom,
} from "../../../service/bookingService";
import toast from "react-hot-toast";
import RoomBookingModal from "../../components/modals/RoomBookingModal";

const AddRegistration = () => {
    const nav = useNavigate();
    const [booking, setBooking] = useState({
        phoneNumber: "",
        checkin: "",
        checkout: "",
        roomBookings: [],
    });

    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleOnClose = () => setShowModal(false);

    const today = new Date().toISOString().split("T")[0];

    const createData = async () => {
        console.log(booking);
        try {
            setIsLoading(true);
            const data = await createNewBooking(booking);
            console.log(data);
            if (data?.code === 0) {
                toast.success(data.message);
                nav("/admin/registration");
            } else {
                toast.error(data.message);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const getNextDay = (date) => {
        if (!date) return "";
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.toISOString().split("T")[0];
    };

    const handleCheckin = (e) => {
        setBooking((prevBooking) => ({
            ...prevBooking,
            checkin: e.target.value,
        }));
    };

    const getRooms = async () => {
        try {
            setIsLoading(true);
            const data = await viewListFreeRoom(
                booking.checkin,
                booking.checkout
            );
            console.log(data);
            if (data?.code === 0) {
                setRooms(data?.data);
            } else {
                setRooms([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const getRoomTypes = async () => {
        try {
            const data = await viewListRoomType(-1);
            console.log(data);
            if (data?.code === 0) {
                setRoomTypes(data?.data);
            } else {
                setRoomTypes([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(roomTypes);

    const handleDelete = (index) => {
        setBooking((prevBooking) => ({
            ...prevBooking,
            roomBookings: prevBooking.roomBookings.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking({
            ...booking,
            [name]: value,
        });
    };

    useEffect(() => {
        if (booking.checkin) {
            setBooking((prevBooking) => ({
                ...prevBooking,
                checkout: getNextDay(booking.checkin),
            }));
        }
    }, [booking.checkin]);

    useEffect(() => {
        getRoomTypes();
    }, []);

    useEffect(() => {
        if (booking.checkin && booking.checkout) {
            getRooms();
        }
    }, [booking.checkin, booking.checkout]);

    return (
        <>
            {console.log(showModal)}
            <RoomBookingModal
                onClose={handleOnClose}
                visible={showModal}
                booking={booking}
                setBooking={setBooking}
                rooms={rooms}
                roomTypes={roomTypes}
            />
            <div>
                <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                    Add New Registration Form
                </div>
                <div>
                    <div className="py-2 text-gray-500">
                        <p className="text-gray-500">Check-in Date</p>
                        <input
                            id="checkin"
                            type="date"
                            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                            onChange={handleCheckin}
                            min={today}
                        />
                    </div>
                    <div className="py-2 text-gray-500">
                        <p className="text-gray-500 z-10">Check-out Date</p>
                        <input
                            id="checkout"
                            type="date"
                            className={`w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2 ${
                                !booking.checkin
                                    ? "opacity-50 cursor-default"
                                    : ""
                            }`}
                            onChange={(e) => {
                                setBooking((prevBooking) => ({
                                    ...prevBooking,
                                    checkout: e.target.value,
                                }));
                            }}
                            onClick={(e) => {
                                if (!booking.checkin) {
                                    e.preventDefault();
                                }
                            }}
                            min={getNextDay(booking.checkin)}
                            value={booking.checkout}
                        />
                    </div>
                    <div className="py-2 text-gray-500">
                        <p className="text-gray-500">Phone Number</p>
                        <input
                            id="phoneNumber"
                            type="text"
                            name="phoneNumber"
                            value={booking.phoneNumber}
                            onChange={handleChange}
                            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                        />
                    </div>
                    <div className="py-2 text-gray-500 flex flex-col w-3/4">
                        <p className="text-gray-500 my-2">Rooms</p>
                        <table className="border border-gray-300">
                            <tr className="border border-gray-300">
                                <th className="py-4">Room Type</th>
                                <th> Room Number</th>
                                <th>Number Of Client</th>
                                <th></th>
                            </tr>
                            {booking.roomBookings
                                ? booking.roomBookings.map(
                                      (roombooking, index) => {
                                          const room = rooms.find(
                                              (room) =>
                                                  room._id === roombooking.room
                                          );
                                          if (!room) return null;

                                          const roomType = roomTypes.find(
                                              (roomtype) =>
                                                  roomtype._id === room.roomType
                                          );
                                          return (
                                              <tr key={index} className="">
                                                  <td className="text-center py-3">
                                                      {roomType
                                                          ? roomType.name
                                                          : ""}
                                                  </td>
                                                  <td className="text-center">
                                                      {roomType
                                                          ? room.roomNumber
                                                          : ""}
                                                  </td>
                                                  <td className="text-center">
                                                      {roombooking.headcount}
                                                  </td>
                                                  <td className="text-center">
                                                      <button
                                                          className="text-red-700 bg-red-200 py-1 px-4 rounded-full mr-2 text-center"
                                                          onClick={() => {
                                                              handleDelete(
                                                                  index
                                                              );
                                                          }}
                                                      >
                                                          Delete
                                                      </button>
                                                  </td>
                                              </tr>
                                          );
                                      }
                                  )
                                : ""}
                        </table>
                        <button
                            id="roomBooking"
                            className={`border-indigo-400 border p-2 text-indigo-600 rounded-lg mt-4 ${
                                !booking.checkout ? " cursor-default" : ""
                            }`}
                            onClick={(e) => {
                                if (!booking.checkout) {
                                    e.preventDefault();
                                } else {
                                    setShowModal(true);
                                }
                            }}
                        >
                            Room Booking
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <button
                            id="create"
                            onClick={() => {
                                createData();
                            }}
                            className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
                        >
                            Create
                        </button>
                        <Link
                            to="/admin/registration"
                            className="rounded-lg text-red-600 py-2 mt-4 w-32"
                        >
                            Back to list
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddRegistration;
