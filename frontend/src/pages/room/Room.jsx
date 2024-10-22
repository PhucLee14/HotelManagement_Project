import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import Banner from "../../components/banner/Banner";
import home_3 from "../../assets/images/home_3.jpg";
import RoomTag from "../../components/roomTag/RoomTag";
import { viewListRoomType } from "../../service/roomTypeService";
import { Link } from "react-router-dom";
import { viewListFreeRoom } from "../../service/bookingService";

const Room = () => {
    return (
        <div className="w-full bg-white flex flex-col items-center">
            <Banner title="Rooms" des="ROOM." />
            <div className="relative w-3/5 bg-white shadow-xl p-8 rounded-xl -top-[70px] flex items-end justify-between">
                <div className="w-2/5">
                    <p className="mb-2 font-semibold">Check In</p>
                    <input
                        type="date"
                        className="border-2 w-full px-4 py-2 rounded-md outline-none"
                    />
                </div>
                <div className="w-2/5">
                    <p className="mb-2 font-semibold">Check Out</p>
                    <input
                        type="date"
                        className={`border-2 w-full px-4 py-2 rounded-md outline-none `}
                    />
                </div>
                <button className="btn w-1/6 bg-blue-600 hover:bg-blue-500 text-white h-3/5 rounded-lg">
                    Check
                </button>
            </div>
            <div className="flex w-3/5 flex-wrap justify-between mb-8">
                <RoomTag
                    index={index}
                    img={roomtype.images}
                    name={roomtype.name}
                    price={roomtype.price}
                    bed={bedQuantity + " " + bedType}
                    quantity={quantity}
                    onSelectChange={(value) => {
                        const newQuantities = [...selectedValues];
                        newQuantities[index].value = value;
                        newQuantities[index].bedQuantity = bedQuantity;
                        newQuantities[index].bedType = bedType;
                        setSelectedValues(newQuantities);
                    }}
                />
            </div>
            <Link
                className={`btn py-3 mb-8 px-16 bg-black text-white ${
                    submitBtn
                        ? "hover:bg-gray-600"
                        : "cursor-default bg-gray-300"
                }`}
                to="/booking"
                onClick={(e) => {
                    submitBtn ? "" : e.preventDefault();
                }}
            >
                Submit
            </Link>

            <div className="flex flex-col items-center bg-slate-100 pt-12 pb-16 w-full">
                <p className="text-[52px] font-serif font-semibold">
                    Great Offers
                </p>
                <p className="text-gray-600 w-2/5 mb-12">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean.
                </p>
                <div className="w-3/5 h-[540px] m-auto py-4 px-2 flex flex-col items-center mb-48">
                    <div className="flex h-[350px] w-[1200px]">
                        <img src={home_3} alt="" className="h-full w-1/2" />
                        <div className="flex flex-col justify-center p-8 bg-white w-1/2">
                            <p className="text-[40px] font-semibold">
                                Family Room
                            </p>
                            <p className="my-8">
                                Far far away, behind the word mountains, far
                                from the countries Vokalia and Consonantia,
                                there live the blind texts. Separated they live
                                in Bookmarksgrove right at the coast of the
                                Semantics, a large language ocean.
                            </p>
                            <p className="text-indigo-600 font-bold text-2xl ">
                                750.000VND
                            </p>
                        </div>
                    </div>
                    <div className="flex h-[350px] w-[1200px]">
                        <div className="flex flex-col justify-center p-8 bg-white w-1/2">
                            <p className="text-[40px] font-semibold">
                                Suite Room
                            </p>
                            <p className="my-8">
                                Far far away, behind the word mountains, far
                                from the countries Vokalia and Consonantia,
                                there live the blind texts. Separated they live
                                in Bookmarksgrove right at the coast of the
                                Semantics, a large language ocean.
                            </p>
                            <p className="text-indigo-600 font-bold text-2xl ">
                                1.250.000VND
                            </p>
                        </div>
                        <img src={home_3} alt="" className="h-full w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;
