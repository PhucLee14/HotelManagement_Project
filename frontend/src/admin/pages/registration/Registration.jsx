import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    searchBooking,
    viewListBooking,
} from "../../../service/bookingService";
import { viewListGuest } from "../../../service/guestService";
import Loading from "../../../components/loading/Loading";

const Registration = () => {
    const [registrations, setRegistrations] = useState([]);
    const [guests, setGuests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("Not Checked In");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);

    const getGuest = async () => {
        try {
            setIsLoading(true);
            const data = await viewListGuest(-1);
            if (data?.code === 0) {
                setGuests(data?.data);
            } else {
                setGuests([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFilterChange = (status) => {
        setFilter(status);
    };

    const getData = async (page, keyword = "") => {
        try {
            setIsLoading(true);
            let searchData;
            if (keyword) {
                searchData = await searchBooking(page, keyword);
            } else {
                searchData = await viewListBooking(page);
            }
            if (searchData?.code === 0) {
                setRegistrations(searchData?.data);
            } else {
                setRegistrations([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = () => {
        getData(currentPage, searchKeyword);
    };

    useEffect(() => {
        getData(currentPage);
    }, [currentPage]);

    useEffect(() => {
        getGuest();
    }, []);

    useEffect(() => {
        const filtered = registrations.filter(
            (registration) => registration.roomInteraction === filter
        );
        setFilteredRegistrations(filtered);
        setTotalPages(Math.ceil(filtered.length / 12));
    }, [registrations, filter]);

    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="flex justify-between items-center mb-4">
                <div className="text-[40px] font-semibold text-gray-600">
                    Registration Form List
                </div>
                <div>
                    <Link
                        to="/admin/registration/create"
                        className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
                        id="add_registration"
                    >
                        Add new
                    </Link>
                </div>
            </div>
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-md">
                <div className="flex justify-between">
                    <div className="flex w-1/4 m-4">
                        <input
                            type="text"
                            className="border-2 outline-none px-4 py-2 w-full rounded-s-lg"
                            placeholder="Input name or phone number"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />
                        <button
                            className="border-2 border-l-0 bg-white hover:bg-gray-50 outline-none px-4 rounded-e-lg"
                            onClick={handleSearch}
                        >
                            <i class="fa-solid fa-magnifying-glass text-gray-500"></i>
                        </button>
                    </div>
                    <div className="dropdown m-4 mr-12">
                        <div
                            tabIndex={0}
                            className="text-indigo-600 px-4 py-3 cursor-pointer font-bold"
                        >
                            Room Status
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu shadow bg-base-100 rounded-md w-44 border-2"
                        >
                            <li onClick={() => handleFilterChange("")}>
                                <a>Tất cả</a>
                            </li>
                            <li
                                onClick={() =>
                                    handleFilterChange("Not Checked In")
                                }
                            >
                                <a>Not Checked In</a>
                            </li>
                            <li
                                onClick={() =>
                                    handleFilterChange("Checked In")
                                }
                            >
                                <a>Checked In</a>
                            </li>
                            <li
                                onClick={() =>
                                    handleFilterChange("Checked Out")
                                }
                            >
                                <a>Checked Out</a>
                            </li>
                            <li
                                onClick={() =>
                                    handleFilterChange("Reservation Cancelled")
                                }
                            >
                                <a>Reservation Cancelled</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <table className=" rounded-lg text-left m-4 mt-0 bg-white overflow-hidden">
                    <tr className="border bg-gray-200 rounded-lg overflow-hidden">
                        <th className="text-gray-600 font-medium py-4 pl-4">
                            Guest Name
                        </th>
                        <th className="text-gray-600 font-medium">
                            Phone Number
                        </th>
                        <th className="text-gray-600 font-medium">
                            Check-In Date
                        </th>
                        <th className="text-gray-600 font-medium">
                            Check-Out Date
                        </th>
                        <th className="text-gray-600 font-medium">
                            Registration Date
                        </th>
                        <th className="text-gray-600 font-medium">
                            Room Status
                        </th>
                        <th className="text-gray-600 font-medium text-center">
                            Action
                        </th>
                    </tr>
                    {filteredRegistrations.map((registration) => {
                        const guest = guests.find(
                            (g) => g._id === registration.guest
                        );
                        return guest ? (
                            <tr
                                className="border hover:bg-gray-100"
                                key={registration._id}
                            >
                                <td className="py-4 pl-4 text-gray-500">
                                    {guest.name}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {guest.phoneNumber}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {new Date(
                                        registration.checkin
                                    ).toLocaleDateString()}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {new Date(
                                        registration.checkout
                                    ).toLocaleDateString()}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {new Date(
                                        registration.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {registration.roomInteraction}
                                </td>
                                <td className="py-4 text-gray-500 text-center">
                                    {registration.roomInteraction ===
                                        "Checked Out" ||
                                    registration.roomInteraction ===
                                        "Reservation Cancelled" ? (
                                        ""
                                    ) : (
                                        <Link
                                            to={`/admin/registration/edit/${registration._id}`}
                                            className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full mr-2"
                                        >
                                            Edit
                                        </Link>
                                    )}
                                    <Link
                                        to={`/admin/registration/${registration._id}`}
                                        className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full"
                                    >
                                        Detail
                                    </Link>
                                </td>
                            </tr>
                        ) : null;
                    })}
                </table>
                <div className="flex justify-center my-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`mx-1 px-3 py-1 rounded ${
                                currentPage === index + 1
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Registration;
