import React, { useEffect, useState } from "react";
import Loading from "../../../components/loading/Loading";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getBookingCountByMonthYear } from "../../../service/bookingService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportExport from "./ReportExport";
import {
    getRevenueByMonthYear,
    viewListBill,
} from "../../../service/billService";
import { viewListRoom } from "../../../service/roomService";
import { viewListStaff } from "../../../service/staffService";
import { viewListGuest } from "../../../service/guestService";
import formatNumber from "../../../utils/formatNumber";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AdminHome = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [revenueData, setRevenueData] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [rooms, setRooms] = useState([]);
    const [staffs, setStaff] = useState([]);
    const [guests, setGuests] = useState([]);
    const [bills, setBills] = useState([]);
    const [totalCharge, setTotalCharge] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);

    const years = Array.from(
        { length: 10 },
        (v, i) => new Date().getFullYear() - i
    );

    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const getData = async () => {
        try {
            setIsLoading(true);

            // Lấy danh sách phòng, nhân viên, khách hàng, hóa đơn
            const rooms = await viewListRoom(-1);
            const staff = await viewListStaff(-1);
            const guest = await viewListGuest(-1);
            const bill = await viewListBill(-1);

            setRooms(rooms?.data);
            setStaff(staff?.data);
            setGuests(guest?.data);
            setBills(bill?.data);

            // Lấy doanh thu từng tháng theo năm
            const revenuePromises = months.map(async (month) => {
                const { data } = await getRevenueByMonthYear(month, year); // Sử dụng year
                return {
                    month,
                    totalRevenue: data.totalRevenue || 0,
                    totalRoomCharge: data.totalRoomCharge || 0,
                    totalSurcharge: data.totalSurcharge || 0,
                    totalServiceCharge: data.totalServiceCharge || 0,
                };
            });
            const revenueData = await Promise.all(revenuePromises);
            setMonthlyRevenue(revenueData);

            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    console.log("revenueData: ", revenueData);

    useEffect(() => {
        getData();
    }, [year]);

    useEffect(() => {
        if (bills) {
            let accumulatedCharge = 0;
            bills.forEach((bill) => {
                if (bill.surchargeForeign && bill.surchargeQuantity) {
                    accumulatedCharge +=
                        bill.roomCharge +
                        bill.serviceCharge +
                        bill.surchargeForeign +
                        bill.surchargeQuantity;
                }
            });
            setTotalCharge(accumulatedCharge);
        }
    }, [bills]);

    console.log(rooms);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const revenue = await Promise.all(
                    months.map(async (month) => {
                        const { data } = await getRevenueByMonthYear(
                            month,
                            year
                        );
                        return data;
                    })
                );

                const revenueData = {
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                    datasets: [
                        {
                            label: "Revenue",
                            data: revenue.map((data) => data.totalRevenue),
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Total Room Price",
                            data: revenue.map((data) => data.totalRoomCharge),
                            backgroundColor: "rgba(255, 205, 86, 0.2)",
                            borderColor: "rgba(255, 205, 86, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Total Service Price",
                            data: revenue.map(
                                (data) => data.totalServiceCharge
                            ),
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Total Surchage",
                            data: revenue.map((data) => data.totalSurcharge),
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                    ],
                };

                const booking = await Promise.all(
                    months.map(async (month, index) => {
                        const { data } = await getBookingCountByMonthYear(
                            month,
                            year
                        );

                        return data;
                    })
                );

                const bookingData = {
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                    datasets: [
                        {
                            label: "Total Bookings",
                            data: booking.map((data) => data.totalBookingCount),
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Canceled Bookings",
                            data: booking.map(
                                (data) => data.canceledBookingCount
                            ),
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                    ],
                };

                setRevenueData(revenueData);
                setBookingData(bookingData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [year]);

    console.log("monthlyRevenue: ", monthlyRevenue);

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <div className="flex justify-between">
                <div className="text-[40px] font-semibold text-gray-600 mb-4">
                    Dashboard
                </div>
                <div className="my-2">
                    <PDFDownloadLink
                        document={
                            <ReportExport
                                monthlyRevenue={monthlyRevenue}
                                year={year}
                            />
                        }
                        fileName={`Revenue_Report_${year}.pdf`}
                    >
                        {({ loading }) =>
                            loading ? (
                                <button className="btn btn-secondary" disabled>
                                    Generating PDF...
                                </button>
                            ) : (
                                <button className="btn btn-primary bg-indigo-600 text-white">
                                    Export Revenue Report
                                </button>
                            )
                        }
                    </PDFDownloadLink>
                </div>
            </div>
            <div className="flex w-full gap-4">
                <div className="w-1/4 bg-white px-8 flex rounded-lg justify-between items-center border-l-4 border-blue-500">
                    <div>
                        <div className="text-blue-500 font-semibold text-md mb-1">
                            Total Rooms
                        </div>
                        <p className="text-2xl font-semibold">{rooms.length}</p>
                    </div>
                    <div className="py-10">
                        <i class="fa-sharp fa-regular fa-house-user text-[44px] text-gray-400"></i>
                    </div>
                </div>
                <div className="w-1/4 bg-white px-8 flex rounded-lg justify-between items-center border-l-4 border-red-500">
                    <div>
                        <div className="text-red-500 font-semibold text-md mb-1">
                            Guests
                        </div>
                        <p className="text-2xl font-semibold">
                            {guests.length}
                        </p>
                    </div>
                    <div className="py-10">
                        <i class="fa-solid fa-user text-[44px] text-gray-400"></i>
                    </div>
                </div>
                <div className="w-1/4 bg-white px-8 flex rounded-lg justify-between items-center border-l-4 border-green-500">
                    <div>
                        <div className="text-green-500 font-semibold text-md mb-1">
                            Staff
                        </div>
                        <p className="text-2xl font-semibold">
                            {staffs.length}
                        </p>
                    </div>
                    <div className="py-10">
                        <i class="fa-regular fa-users text-[44px] text-gray-400"></i>
                    </div>
                </div>
                <div className="w-1/4 bg-white px-8 flex rounded-lg justify-between items-center border-l-4 border-yellow-500">
                    <div>
                        <div className="text-yellow-500 font-semibold text-md mb-1">
                            Total Charge
                        </div>
                        <p className="text-2xl font-semibold">
                            {formatNumber(totalCharge)}VND
                        </p>
                    </div>
                    <div className="py-10">
                        <i class="fa-solid fa-money-bills text-[44px] text-gray-400"></i>
                    </div>
                </div>
            </div>

            <div className=" bg-white rounded-lg mt-4">
                <div className="m-4 pt-4">
                    <label className="mr-2">Year:</label>
                    <select
                        className="select border border-gray-300 rounded min-h-0 h-8"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-4 rounded-lg p-4">
                    <div className="mt-8 w-1/2">
                        {revenueData && (
                            <Bar
                                data={revenueData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                        },
                                        title: {
                                            display: true,
                                            text: `Yearly Bookings Statistics for ${year}`,
                                        },
                                    },
                                }}
                            />
                        )}
                    </div>
                    <div className="mt-8 w-1/2">
                        {bookingData && (
                            <Bar
                                data={bookingData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                        },
                                        title: {
                                            display: true,
                                            text: `Monthly Bookings Statistics for ${year}`,
                                        },
                                    },
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;
