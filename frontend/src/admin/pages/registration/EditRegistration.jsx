import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editBooking, viewBooking } from "../../../service/bookingService";
import Loading from "../../../components/loading/Loading";
import { viewListService } from "../../../service/serviceService";
import ServiceBookingModal from "../../components/modals/ServiceBookingModal";
import toast from "react-hot-toast";

const EditRegistration = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [booking, setBooking] = useState([]);
    const [services, setServices] = useState([]);
    const [roomInteraction, setRoomInteraction] = useState("");
    const [serviceBooking, setServiceBooking] = useState([]);
    const [haveForeignGuest, setHaveForeignGuest] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClose = () => setShowModal(false);

    useEffect(() => {
        getBooking();
        getServices();
    }, []);

    const getBooking = async () => {
        try {
            setIsLoading(true);
            const data = await viewBooking(id);
            setBooking(data);
            setHaveForeignGuest(data.haveForeignGuest);
            data.roomInteraction === "Not Checked In"
                ? setRoomInteraction("Checked In")
                : setRoomInteraction("Checked Out");
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(booking);
    console.log(booking.haveForeignGuest);

    const getServices = async () => {
        try {
            setIsLoading(true);
            const data = await viewListService(-1);
            setServices(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (index) => {
        setServiceBooking((prevService) =>
            prevService.filter((_, i) => i !== index)
        );
    };

    const editDataBooking = async () => {
        try {
            setIsLoading(true);
            const data = await editBooking(
                id,
                roomInteraction,
                serviceBooking,
                haveForeignGuest
            );
            console.log("haveForeignGuest:", haveForeignGuest);
            if (data.code === 0) {
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

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <ServiceBookingModal
                onClose={handleOnClose}
                visible={showModal}
                serviceBooking={serviceBooking}
                setServiceBooking={setServiceBooking}
                services={services}
            />
            <div className="h-[78vh]">
                <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                    Edit Registration Form
                </div>
                <div>
                    {booking.roomInteraction === "Not Checked In" ? (
                        <div className="py-2 text-gray-500">
                            <p className="text-gray-500 mb-2">
                                Room Category Name
                            </p>
                            <select
                                className="select select-bordered w-full text-gray-500"
                                defaultValue="Checked In"
                                onChange={(e) => {
                                    setRoomInteraction(e.target.value);
                                }}
                            >
                                <option value="Checked In">
                                    Checked In
                                </option>
                                <option value="Reservation Cancelled">
                                    Reservation Cancelled
                                </option>
                            </select>
                            <div className="flex mt-2">
                                <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    className="mr-2"
                                    onChange={(e) =>
                                        setHaveForeignGuest(e.target.checked)
                                    }
                                />
                                <p>Is there a foreign guest?</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="py-2 text-gray-500">
                                <p className="text-gray-500 mb-2">
                                    Room Status
                                </p>
                                <input
                                    className=" w-3/4 text-gray-500 border border-gray-300 rounded-lg py-2 px-4 "
                                    disabled
                                    value="Checked Out"
                                />
                            </div>
                            <div className="py-2 text-gray-500 w-full">
                                <p className="text-gray-500 mb-2">Services</p>
                                <table className="border border-gray-300 w-3/4">
                                    <tr className="border border-gray-300">
                                        <th className="py-4">Service Name</th>
                                        <th>Service Quantity</th>
                                        <th></th>
                                    </tr>
                                    {serviceBooking
                                        ? serviceBooking.map(
                                              (booking, index) => (
                                                  <tr
                                                      key={index}
                                                      className="text-center"
                                                  >
                                                      <td className="py-3">
                                                          {services.data.map(
                                                              (service) => {
                                                                  return service._id ===
                                                                      booking.service
                                                                      ? service.name
                                                                      : "";
                                                              }
                                                          )}
                                                      </td>
                                                      <td>
                                                          {booking.quantity}
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
                                              )
                                          )
                                        : ""}
                                </table>
                                <button
                                    className={`border-indigo-400 border p-2 text-indigo-600 rounded-lg mt-4 w-3/4`}
                                    onClick={(e) => {
                                        setShowModal(true);
                                    }}
                                >
                                    Add Services
                                </button>
                            </div>
                        </>
                    )}
                    <div className="flex flex-col">
                        <Link
                            className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20 text-center"
                            onClick={editDataBooking}
                        >
                            Submit
                        </Link>
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

export default EditRegistration;
