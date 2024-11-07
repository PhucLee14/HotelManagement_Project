import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../../redux/auth/authAction";

const AdminDefaultLayout = ({ children }) => {
    const [roomMenu, setRoommenu] = useState(false);
    const auth = useSelector((state) => state.auth);
    console.log(auth);

    const dispatch = useDispatch();
    const nav = useNavigate();

    const onclickLogout = (e) => {
        e.preventDefault();
        dispatch(handleLogout(nav));
        console.log("Đã bấm nút");
    };
    return (
        <div className="flex">
            <div className="h-screen w-[252px] fixed bg-indigo-600 text-white">
                <Link
                    to="/admin"
                    className="h-16 border-b max-w-full border-slate-400 mx-6 flex justify-center items-center text-lg font-bold tracking-widest"
                >
                    <i class="fa-solid fa-buildings mr-4 text-[24px]"></i>
                    <p className="text-md">Double2P Hotel</p>
                </Link>
                <ul>
                    <li>
                        <Link
                            className="w-full block p-4 font-semibold"
                            to="/admin"
                        >
                            <i class="fa-regular fa-gauge-max px-2"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li
                        className={`p-4 font-semibold overflow-hidden transition-menu ${
                            roomMenu ? "h-40" : "h-14"
                        }`}
                    >
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                setRoommenu(!roomMenu);
                            }}
                        >
                            <i class="fa-solid fa-gear px-2"></i>
                            Room
                        </div>
                        <ul className="bg-white text-black mx-2 mt-4 rounded">
                            <li className="p-3 px-6">
                                <Link to="/admin/rooms">Rooms</Link>
                            </li>
                            <li className="p-3 px-6">
                                <Link to="/admin/roomtype">Room Type</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link
                            className="w-full block p-4 font-semibold"
                            to="/admin/guest"
                            id="guest_page"
                        >
                            <i class="fa-solid fa-people px-2"></i>
                            Guest
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="w-full block p-4 font-semibold"
                            to="/admin/staff"
                        >
                            <i class="fa-solid fa-user px-2"></i>
                            Staff
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="w-full block p-4 font-semibold"
                            to="/admin/service"
                        >
                            <i class="fa-solid fa-bell-concierge px-2"></i>
                            Service
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="w-full block p-4 font-semibold"
                            to="/admin/invoice"
                        >
                            <i class="fa-solid fa-file-invoice px-2"></i>
                            Invoice
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="w-full block p-4 font-semibold"
                            to="/admin/registration"
                        >
                            <i class="fa-regular fa-calendar-lines-pen px-2"></i>
                            Registration Form
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="ml-[252px] w-full">
                <div className=" w-[calc(100%-252px)] fixed flex justify-end items-center h-16 shadow-lg bg-white">
                    <div className="mr-8">
                        <i class="fa-solid fa-bell mr-4"></i>
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div className="dropdown px-4 border-l">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn m- h-2 bg-transparent border-none shadow-none"
                        >
                            {auth?.data?.name}
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box mr-4"
                        >
                            {/* <li>
                                <a>Item 1</a>
                            </li> */}
                            <li>
                                <a onClick={onclickLogout}>Log out</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 bg-gray-100 h-[calc(100%)]">
                    <div className="m-8 pt-4">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminDefaultLayout;
