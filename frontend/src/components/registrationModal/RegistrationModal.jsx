import React, { useEffect, useState } from "react";
import {
    viewBooking,
    viewListRoomBooking,
    viewListServiceBooking,
} from "../../service/bookingService";
import { viewGuest } from "../../service/guestService";
import { viewListRoom } from "../../service/roomService";
import { viewListRoomType } from "../../service/roomTypeService";
import { viewListService } from "../../service/serviceService";
import { Link } from "react-router-dom";

const RegistrationModal = ({ id, visible, onClose }) => {
    const [booking, setBooking] = useState({});
    const [roomsBooking, setRoomsBooking] = useState([]);
    const [servicesBooking, setServicesBooking] = useState([]);
    const [rooms, setRooms] = useState("");
    const [services, setServices] = useState("");
    const [roomTypes, setRoomTypes] = useState("");
    const [guest, setGuest] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        console.log(id);
    }, []);
    const getBooking = async () => {
        try {
            setIsLoading(true);
            const data = await viewBooking(id);
            const guestData = await viewGuest(data.guest);
            setBooking(data);
            setGuest(guestData);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const getRoomBooking = async () => {
        try {
            setIsLoading(true);
            const roomBooking = await viewListRoomBooking(-1);
            setRoomsBooking(roomBooking);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const getRoom = async () => {
        try {
            setIsLoading(true);
            const room = await viewListRoom(-1);
            setRooms(room);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const getRoomType = async () => {
        try {
            setIsLoading(true);
            const roomtype = await viewListRoomType(-1);
            setRoomTypes(roomtype);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const getServiceBooking = async () => {
        try {
            setIsLoading(true);
            const serviceBooking = await viewListServiceBooking(-1);
            setServicesBooking(serviceBooking);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const getService = async () => {
        try {
            setIsLoading(true);
            const service = await viewListService(-1);
            setServices(service);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getBooking();
        getRoomBooking();
        getRoom();
        getRoomType();
        getServiceBooking();
        getService();
    }, [id]);
    // console.log("booking:", booking);
    return (
        <div
            className={` top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-opacity-50 bg-black ${
                visible ? "fixed" : "hidden"
            }`}
        >
            <div className="bg-white w-1/2 h-2/3 overflow-hidden relative rounded-2xl">
                <div className="overflow-y-scroll h-full">
                    <div className="p-4">
                        <div className="bg-white absolute left-0 top-0 flex justify-between items-center w-full border-b py-3">
                            <div className="text-2xl font-semibold text-gray-600 border-gray-300 ml-4">
                                Registration Form Detail
                            </div>
                            <div
                                className=" cursor-pointer mr-8"
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                <i class="fa-solid fa-xmark text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-12 px-4">
                            <div className="flex">
                                <div className="flex py-3 w-1/2">
                                    <p className="font-semibold mr-4">
                                        Guest Name:{" "}
                                    </p>
                                    <p className="text-gray-500">
                                        {guest.name}
                                    </p>
                                </div>
                                <div className="flex py-3 w-1/2">
                                    <p className="font-semibold mr-4">
                                        Phone Number:{" "}
                                    </p>
                                    <p className="text-gray-500">
                                        {guest.phoneNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex py-3 w-1/2">
                                    <p className="font-semibold mr-4">
                                        Check-In Date:{" "}
                                    </p>
                                    <p
                                        className="text-gray-500"
                                        onClick={() => {
                                            console.log(booking);
                                        }}
                                    >
                                        {new Date(
                                            booking.checkin
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex py-3 w-1/2">
                                    <p className="font-semibold mr-4">
                                        Check-Out Date:{" "}
                                    </p>
                                    <p className="text-gray-500">
                                        {new Date(
                                            booking.checkout
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex py-3">
                                <p className="font-semibold mr-4">
                                    Registration Date:{" "}
                                </p>
                                <p className="text-gray-500">
                                    {new Date(
                                        booking.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex py-3">
                                <p className="font-semibold mr-4">
                                    Room Status:{" "}
                                </p>
                                <p className="text-gray-500">
                                    {booking.roomInteraction}
                                </p>
                            </div>
                            <div className="w-full py-3">
                                <p className="font-semibold mr-4 mb-4">
                                    Booked Rooms
                                </p>
                                <table className="border border-gray-300 w-full rounded-lg">
                                    <tr className="border border-gray-300 text-center bg-gray-100">
                                        <th className="py-4">Room Type</th>
                                        <th> Room Number</th>
                                        <th>Quantity</th>
                                        <th></th>
                                    </tr>
                                    {booking.roomBookings &&
                                    roomsBooking.data &&
                                    rooms.data &&
                                    roomTypes.data
                                        ? booking.roomBookings.flatMap(
                                              (bookingId) => {
                                                  return roomsBooking.data
                                                      .filter(
                                                          (roomBooking) =>
                                                              roomBooking._id ===
                                                              bookingId
                                                      )
                                                      .map((roomBooking) => {
                                                          const room =
                                                              rooms.data.find(
                                                                  (item) =>
                                                                      item._id ===
                                                                      roomBooking.room
                                                              );
                                                          const roomType =
                                                              roomTypes.data.find(
                                                                  (roomtype) =>
                                                                      roomtype._id ===
                                                                      room.roomType
                                                              );
                                                          if (room) {
                                                              return (
                                                                  <tr
                                                                      key={
                                                                          roomBooking._id
                                                                      }
                                                                      className="text-center border"
                                                                  >
                                                                      <td className="py-2">
                                                                          {
                                                                              roomType.name
                                                                          }
                                                                      </td>
                                                                      <td>
                                                                          {
                                                                              room.roomNumber
                                                                          }
                                                                      </td>
                                                                      <td>
                                                                          {
                                                                              roomBooking.headcount
                                                                          }
                                                                      </td>
                                                                  </tr>
                                                              );
                                                          }
                                                          return null;
                                                      });
                                              }
                                          )
                                        : ""}
                                </table>
                            </div>
                            <div
                                className={`w-full py-3 ${
                                    booking.serviceBookings ? "" : "flex"
                                }`}
                            >
                                <p className="font-semibold mr-4 mb-4">
                                    Booked Services:{" "}
                                </p>
                                {/* {console.log("service booking", servicesBooking)} */}
                                {booking.serviceBookings ? (
                                    <table className="border border-gray-300 w-full">
                                        <tr className="border border-gray-300 text-center bg-gray-100">
                                            <th className="py-4">
                                                Service Name
                                            </th>
                                            <th>Quantity</th>
                                        </tr>
                                        {booking.serviceBookings &&
                                        servicesBooking.data &&
                                        services.data
                                            ? booking.serviceBookings.flatMap(
                                                  (bookingId) => {
                                                      return servicesBooking.data
                                                          .filter(
                                                              (
                                                                  serviceBooking
                                                              ) =>
                                                                  serviceBooking._id ===
                                                                  bookingId
                                                          )
                                                          .flatMap(
                                                              (
                                                                  serviceBooking
                                                              ) => {
                                                                  return services.data
                                                                      .filter(
                                                                          (
                                                                              service
                                                                          ) =>
                                                                              service._id ===
                                                                              serviceBooking.service
                                                                      )
                                                                      .map(
                                                                          (
                                                                              service
                                                                          ) => (
                                                                              <tr
                                                                                  key={
                                                                                      service._id
                                                                                  }
                                                                                  className="text-center"
                                                                              >
                                                                                  <td className="py-2">
                                                                                      {
                                                                                          service.name
                                                                                      }
                                                                                  </td>
                                                                                  <td>
                                                                                      {
                                                                                          serviceBooking.quantity
                                                                                      }
                                                                                  </td>
                                                                              </tr>
                                                                          )
                                                                      );
                                                              }
                                                          );
                                                  }
                                              )
                                            : ""}
                                    </table>
                                ) : (
                                    <p className="text-gray-500">
                                        No services booked
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationModal;
