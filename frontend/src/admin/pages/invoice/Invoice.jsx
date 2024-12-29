import React, { useEffect, useState } from "react";
import { searchBill, viewListBill } from "../../../service/billService";
import Loading from "../../../components/loading/Loading";
import { Link } from "react-router-dom";
import { viewListGuest } from "../../../service/guestService";
import { viewListStaff } from "../../../service/staffService";
import formatNumber from "../../../utils/formatNumber";

const Invoice = () => {
    const [bills, setBill] = useState([]);
    const [guests, setGuests] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(false);
        }
    };

    const getStaff = async () => {
        try {
            setIsLoading(true);
            const data = await viewListStaff(-1);
            if (data?.code === 0) {
                setStaffs(data?.data);
            } else {
                setStaffs([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const calculateTotal = (bills, guests) => {
        const {
            roomCharge,
            serviceCharge,
            surchargeForeign,
            surchargeQuantity,
            discount,
        } = bills;
        if (guests.guestCategories === "Vip" && discount) {
            return (
                roomCharge +
                serviceCharge +
                surchargeForeign +
                surchargeQuantity -
                discount
            );
        }
        return (
            roomCharge + serviceCharge + surchargeForeign + surchargeQuantity
        );
    };

    const getBill = async (page, keyword = "") => {
        try {
            setIsLoading(true);
            let searchData;
            if (keyword) {
                searchData = await searchBill(page, keyword);
            } else {
                searchData = await viewListBill(page);
            }
            if (searchData?.code === 0) {
                setBill(searchData?.data);
                setTotalPages(Math.ceil(searchData?.count / 12));
            } else {
                setBill([]);
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
        getBill(currentPage, searchKeyword);
    };

    useEffect(() => {
        getGuest();
        getStaff();
    }, []);

    useEffect(() => {
        getBill(currentPage);
    }, [currentPage]);

    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="text-[40px] font-semibold text-gray-600 mb-4">
                Invoice List
            </div>
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-md">
                <div className="flex w-1/4 m-4">
                    <input
                        type="text"
                        className="border-2 outline-none px-4 py-2 w-full rounded-s-lg"
                        placeholder="Input name of guest or staff"
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
                <table className="rounded-lg text-left m-4 mt-0 bg-white overflow-hidden">
                    <thead>
                        <tr className="border bg-gray-200 rounded-lg overflow-hidden">
                            <th className="text-gray-600 font-medium py-4 pl-4">
                                Guest Name
                            </th>
                            <th className="text-gray-600 font-medium">
                                Total Amount
                            </th>
                            <th className="text-gray-600 font-medium">
                                Staff Name
                            </th>
                            <th className="text-gray-600 font-medium">
                                Invoice Date
                            </th>
                            <th className="text-gray-600 font-medium text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => {
                            const guest = guests.find(
                                (g) => g._id === bill.guest
                            );
                            const staff = staffs.find(
                                (s) => s._id === bill.staff
                            );
                            console.log(bill);
                            console.log(calculateTotal(bill, guest));
                            console.log(bill.roomCharge);
                            console.log(bill.serviceCharge);
                            console.log(bill.surchargeForeign);
                            console.log(bill.surchargeQuantity);

                            return (
                                <tr
                                    className="border hover:bg-gray-100"
                                    key={bill._id}
                                >
                                    <td className="py-4 text-gray-500 pl-4">
                                        {guest?.name}
                                    </td>
                                    <td className="py-4 text-gray-500">
                                        {formatNumber(
                                            calculateTotal(bill, guest)
                                        )}{" "}
                                        VND
                                    </td>
                                    <td className="py-4 text-gray-500">
                                        {staff?.name}
                                    </td>
                                    <td className="py-4 text-gray-500">
                                        {new Date(
                                            bill.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 text-gray-500 text-center">
                                        <Link
                                            to={`/admin/invoice/${bill._id}`}
                                            className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full mr-1"
                                        >
                                            Detail
                                        </Link>
                                        <Link
                                            to={`/admin/invoice/pdf/${bill._id}`}
                                            className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full ml-1"
                                        >
                                            PDF
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
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

export default Invoice;
