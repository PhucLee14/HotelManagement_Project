import React from "react";
import { Link } from "react-router-dom";

const EventTag = ({ background, date, title, content }) => {
    return (
        <div className="w-96 mx-3">
            <Link to="">
                <img src={background} alt="" className="w-full" />
            </Link>
            <div className="bg-white">
                <div className="p-8 pb-20">
                    <p className="font-bold text-gray-400 mb-2">{date}</p>
                    <Link className="text-xl font-serif">{title}</Link>
                    <p className="text-gray-600 mt-4">{content}</p>
                </div>
            </div>
        </div>
    );
};

export default EventTag;
