import React from "react";

const LoadingComponent = () => {
    return (
        <div className="w-full h-full flex flex-col gap-4 justify-center">
            <div className="flex">
                <div className="skeleton h-8 w-1/3"></div>
                <div className="skeleton h-8 w-1/3 mx-4"></div>
                <div className="skeleton h-8 w-1/3"></div>
            </div>
            <div className="skeleton h-8 w-full"></div>
            <div className="skeleton h-8 w-full"></div>
        </div>
    );
};

export default LoadingComponent;
