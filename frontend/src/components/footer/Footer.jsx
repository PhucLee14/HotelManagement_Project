import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="w-screen bg-black text-zinc-400 font-medium py-20 px-40">
            <div className="flex justify-between">
                <div>
                    <ul>
                        <li className="mb-4">
                            <Link to="#">About Us</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="#">Terms & Conditions</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="#">Privacy Policy</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="#">Rooms</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className="mb-4">
                            <Link to="#">The Rooms & Suites</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="#">About Us</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="#">Contact Us</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="#">Restaurant</Link>
                        </li>
                    </ul>
                </div>
                <div className="text-white">
                    <div>
                        <p className="mb-2">Address:</p>
                        <p>
                            219 To Ngoc Van, Linh Dong <br /> Ho Chi Minh City
                        </p>
                    </div>
                    <div className="mt-4">
                        <p>Phone:</p>
                        <p> 0901092207</p>
                    </div>
                    <div className="mt-4">
                        <p className="">Email:</p>
                        <p> phangiadat123@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full mt-36">
                <div className="w-1/2">
                    Copyright © 2024 All rights reserved
                </div>
                <div className="w-1/2">
                    <Link target="_blank" className="mx-2 text-xl">
                        <i class="fa-brands fa-facebook-f"></i>
                    </Link>
                    <Link target="_blank" className="mx-2 text-xl">
                        <i class="fa-brands fa-instagram"></i>
                    </Link>
                    <Link target="_blank" className="mx-2 text-xl">
                        <i class="fa-brands fa-twitter"></i>
                    </Link>
                    <Link target="_blank" className="mx-2 text-xl">
                        <i class="fa-brands fa-linkedin-in"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
