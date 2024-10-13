import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [check, setCheck] = useState(false);
    document.onscroll = () => {
        window.scrollY >= 180 ? setCheck(true) : setCheck(false);
    };
    return (
        <div>
            <div
                className={`navbar bg-base-100 fixed top-0 flex justify-between z-40 text-white transition-all px-4 ${
                    check
                        ? "py-4 bg-black bg-opacity-50 backdrop-blur-sm"
                        : "py-10 bg-transparent"
                }`}
            >
                <div className="">
                    <Link className="btn btn-ghost text-2xl" to="/">
                        MPP Hotel
                    </Link>
                </div>
                <div className="">
                    <ul className="menu menu-horizontal px-1 ">
                        <li className="">
                            <Link className="font-semibold mx-2" to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="font-semibold mx-2" to="/room">
                                Room
                            </Link>
                        </li>
                        <li>
                            <Link className="font-semibold mx-2" to="/about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link className="font-semibold mx-2" to="/service">
                                Service
                            </Link>
                        </li>
                        <li>
                            <Link className="font-semibold mx-2" to="/search">
                                Booking History
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
