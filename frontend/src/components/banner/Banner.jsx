import React from "react";

const Banner = ({ title, des }) => {
    return (
        <div className="bg-[url('https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg')] w-screen bg-cover h-screen flex flex-col justify-center items-center relative">
            <div class="absolute inset-0 bg-black bg-opacity-50"></div>
            <p className="text-white font-semibold text-[80px] z-10 font-serif">
                {title}
            </p>
            <p className="text-gray-400 font-bold text-sm z-10">{des}</p>
        </div>
    );
};

export default Banner;
