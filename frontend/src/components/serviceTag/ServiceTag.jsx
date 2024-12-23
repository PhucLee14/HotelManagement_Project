import React from "react";

const ServiceTag = ({ reverse, thumb, title, name, des }) => {
    return (
        <div
            className={`flex items-center rounded-none h-[85vh] ${
                reverse ? "flex-row-reverse" : ""
            }`}
        >
            <div className="w-1/2 h-full">
                <img src={thumb} alt="" className="h-full w-full" />
            </div>
            <div
                className={`relative bg-white bg-opacity-90 flex flex-col justify-center rounded-lg w-1/2 ${
                    reverse ? "-right-40 text-right" : " -left-40"
                }`}
            >
                <div className="p-24">
                    <p className="text-blue-600 font-serif text-xl font-semibold uppercase">
                        {title}
                    </p>
                    <p className="text-[28px] font-medium my-8">{name}</p>
                    <p className="text-gray-600">{des}</p>
                    <button className="px-4 py-2 border-2 border-black mt-8 hover:bg-black hover:text-white duration-300">
                        Learn more
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceTag;
