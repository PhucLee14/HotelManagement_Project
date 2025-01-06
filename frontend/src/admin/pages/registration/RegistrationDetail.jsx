import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewListRoomType } from "../../../service/roomTypeService";
import { viewListRoom } from "../../../service/roomService";
import Loading from "../../../components/loading/Loading";
import {
    viewBooking,
    viewListRoomBooking,
    viewListServiceBooking,
} from "../../../service/bookingService";
import { viewGuest } from "../../../service/guestService";
import { viewListService } from "../../../service/serviceService";

const RegistrationDetail = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState({});
    const [roomsBooking, setRoomsBooking] = useState([]);
    const [servicesBooking, setServicesBooking] = useState([]);
    const [rooms, setRooms] = useState("");
    const [services, setServices] = useState("");
    const [roomTypes, setRoomTypes] = useState("");
    const [guest, setGuest] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getBooking();
        getRoomBooking();
        getRoom();
        getRoomType();
        getServiceBooking();
        getService();
    }, []);

    const getBooking = async () => {
        try {
            setIsLoading(true);
            const data = await viewBooking(id);
            const guestData = await viewGuest(data.guest);
            setBooking(data);
            setGuest(guestData);
            setIsLoading(false);
            console.log(booking);
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

    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Registration Form Detail
            </div>
            <div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Guest Name: </p>
                    <p className="text-gray-500">{guest.name}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Phone Number: </p>
                    <p className="text-gray-500">{guest.phoneNumber}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Registration Date: </p>
                    <p className="text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Check-In Date: </p>
                    <p className="text-gray-500">
                        {new Date(booking.checkin).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Check-Out Date: </p>
                    <p className="text-gray-500">
                        {new Date(booking.checkout).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Room Status: </p>
                    <p className="text-gray-500">{booking.roomInteraction}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Have Foreign Guest: </p>
                    <p className="text-gray-500">
                        {booking.haveForeignGuest ? "true" : "false"}
                    </p>
                </div>
                <div className="w-3/4 py-3">
                    <p className="font-semibold mr-4 mb-4">Booked Rooms</p>
                    <table className="border border-gray-300 w-full">
                        <tr className="border border-gray-300">
                            <th className="py-4">Room Type</th>
                            <th> Room Number</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                        {booking.roomBookings &&
                        roomsBooking.data &&
                        rooms.data &&
                        roomTypes.data
                            ? booking.roomBookings.flatMap((bookingId) => {
                                  return roomsBooking.data
                                      .filter(
                                          (roomBooking) =>
                                              roomBooking._id === bookingId
                                      )
                                      .map((roomBooking) => {
                                          const room = rooms.data.find(
                                              (item) =>
                                                  item._id === roomBooking.room
                                          );
                                          console.log(rooms.data);
                                          const roomType = roomTypes.data.find(
                                              (roomtype) =>
                                                  roomtype._id === room.roomType
                                          );
                                          if (room) {
                                              return (
                                                  <tr
                                                      key={roomBooking._id}
                                                      className="text-center"
                                                  >
                                                      <td className="py-2">
                                                          {roomType.name}
                                                      </td>
                                                      <td>{room.roomNumber}</td>
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
                              })
                            : ""}
                    </table>
                </div>
                <div
                    className={`w-1/2 py-3 ${
                        booking.serviceBookings ? "" : "flex"
                    }`}
                >
                    <p className="font-semibold mr-4 mb-4">Booked Services: </p>
                    {booking.serviceBookings ? (
                        <table className="border border-gray-300 w-full">
                            <tr className="border border-gray-300">
                                <th className="py-4">Service Name</th>
                                <th>Quantity</th>
                            </tr>
                            {booking.serviceBookings &&
                            servicesBooking.data &&
                            services.data
                                ? booking.serviceBookings.flatMap(
                                      (bookingId) => {
                                          return servicesBooking.data
                                              .filter(
                                                  (serviceBooking) =>
                                                      serviceBooking._id ===
                                                      bookingId
                                              )
                                              .flatMap((serviceBooking) => {
                                                  return services.data
                                                      .filter(
                                                          (service) =>
                                                              service._id ===
                                                              serviceBooking.service
                                                      )
                                                      .map((service) => (
                                                          <tr
                                                              key={service._id}
                                                              className="text-center"
                                                          >
                                                              <td className="py-2">
                                                                  {service.name}
                                                              </td>
                                                              <td>
                                                                  {
                                                                      serviceBooking.quantity
                                                                  }
                                                              </td>
                                                          </tr>
                                                      ));
                                              });
                                      }
                                  )
                                : ""}
                        </table>
                    ) : (
                        <p className="text-gray-500">No services booked</p>
                    )}
                </div>
                <div className="flex">
                    <Link
                        to="/admin/registration"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationDetail;
