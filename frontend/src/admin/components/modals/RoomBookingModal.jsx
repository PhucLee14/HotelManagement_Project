import { useState } from "react";

const RoomBookingModal = ({
    visible,
    onClose,
    booking,
    setBooking,
    rooms,
    roomTypes,
}) => {
    const [choosenRoomType, setChoosenRoomType] = useState("");
    const [choosenRoom, setChoosenRoom] = useState("");
    const [clientQuantity, setClientQuantity] = useState("");

    const handleSubmit = () => {
        setBooking((prevBooking) => ({
            ...prevBooking,
            roomBookings: [
                ...prevBooking.roomBookings,
                { room: choosenRoom, headcount: clientQuantity },
            ],
        }));
        console.log("booking", booking);
        onClose();
        setChoosenRoomType("");
        setChoosenRoom("");
        setClientQuantity("");
    };

    return (
        <div
            className={` top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 z-60 flex items-center justify-center ${
                visible ? "fixed" : "hidden"
            }`}
        >
            <div className="bg-white w-1/2 rounded-xl animate-modalFaceIn">
                <div className=" flex flex-col items-center w-full relative p-8">
                    <div
                        className="absolute right-0 top-0 cursor-pointer px-4 py-2"
                        onClick={() => {
                            onClose();
                            setChoosenRoomType("");
                            setChoosenRoom("");
                            setClientQuantity("");
                        }}
                    >
                        <i className="fa-regular fa-xmark p-2"></i>
                    </div>
                    <div className="text-[36px] text-gray-600 font-semibold my-4">
                        Add Room Form
                    </div>
                    <div className="w-full">
                        <div className=" mb-4">
                            <p className="text-gray-500 mb-2">Room Type</p>
                            <select
                                id="roomType"
                                className="select select-bordered w-full text-gray-500"
                                value={choosenRoomType}
                                onChange={(e) => {
                                    setChoosenRoomType(e.target.value);
                                }}
                            >
                                <option disabled hidden value=""></option>
                                {roomTypes.map((roomType) => {
                                    return (
                                        <option
                                            key={roomType._id}
                                            value={roomType._id}
                                            id={`roomType-${roomType.name}`}
                                        >
                                            {roomType.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className=" mb-4">
                            <p className="text-gray-500 mb-2">Room</p>
                            <select
                                id="room"
                                className="select select-bordered w-full text-gray-500"
                                value={choosenRoom}
                                onChange={(e) => {
                                    setChoosenRoom(e.target.value);
                                }}
                            >
                                <option disabled hidden value=""></option>
                                {roomTypes.map((roomType) => {
                                    return roomType._id === choosenRoomType
                                        ? rooms
                                              .filter(
                                                  (room) =>
                                                      room.roomType ===
                                                      roomType._id
                                              )
                                              .filter(
                                                  (room) =>
                                                      !booking.roomBookings.some(
                                                          (booking) =>
                                                              booking.room ===
                                                              room._id
                                                      )
                                              )
                                              .map((room) => (
                                                  <option
                                                      key={room._id}
                                                      value={room._id}
                                                      id={`room-${room.roomNumber}`}
                                                  >
                                                      {room.roomNumber}
                                                  </option>
                                              ))
                                        : "";
                                })}
                            </select>
                        </div>
                        <div className=" mb-4">
                            <p className="text-gray-500 mb-2">
                                Client Quantity
                            </p>
                            <select
                                id="clientQuantity"
                                className="select select-bordered w-full text-gray-500"
                                value={clientQuantity}
                                onChange={(e) => {
                                    setClientQuantity(e.target.value);
                                }}
                            >
                                <option disabled hidden value=""></option>
                                {roomTypes.map((roomType) =>
                                    roomType._id === choosenRoomType
                                        ? (() => {
                                              const options = [];
                                              for (
                                                  let i = 1;
                                                  i <= roomType.capacity;
                                                  i++
                                              ) {
                                                  options.push(
                                                      <option
                                                          key={i}
                                                          value={i}
                                                          id={`clientQuantity-${i}`}
                                                      >
                                                          {i}
                                                      </option>
                                                  );
                                              }
                                              return options;
                                          })()
                                        : ""
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            id="submit-form"
                            className={`py-2 px-16 text-white ${
                                choosenRoomType && choosenRoom && clientQuantity
                                    ? "bg-black"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                            onClick={handleSubmit}
                            disabled={
                                !choosenRoomType ||
                                !choosenRoom ||
                                !clientQuantity
                            }
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomBookingModal;
