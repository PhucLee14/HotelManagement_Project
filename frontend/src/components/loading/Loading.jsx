import React from "react";
import gojo1 from "../../assets/images/gojo1.png";
import gojo2 from "../../assets/images/gojo2.png";

const Loading = () => {
    return (
        <div className="fixed top-0 right-0 left-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.2)] backdrop-blur-[1px]">
            <span className="loading loading-spinner loading-lg"></span>
            {/* <div className="h-200 w-200">
                <div className="animate-spin-reverse flex flex-col justify-between items-end h-[136px] absolute ">
                    <img src={gojo1} alt="" className="w-[100px]" />
                </div>
                <div className="animate-spin-reverse-in flex flex-col justify-end items-end h-[130px] absolute">
                    <img src={gojo2} alt="" className="w-[100px] " />
                </div>
            </div> */}
        </div>
    );
};

export default Loading;
