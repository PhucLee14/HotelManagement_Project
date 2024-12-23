import React, { useEffect, useState } from "react";

const SLide = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        const isFirstImage = currentIndex === 0;
        const slide = isFirstImage ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(slide);
    };

    const nextImage = () => {
        const isLastImage = currentIndex === slides.length - 1;
        const slide = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(slide);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex]);

    console.log(slides[0]);
    return (
        <div className="h-full">
            <div
                className=" absolute top-[45%] -translate-x-0 translate-y-[-50%] left-6 text-2xl cursor-pointer"
                onClick={prevImage}
            >
                <i class="fa-regular fa-chevron-left"></i>
            </div>
            <div
                className="w-full h-5/6 bg-center bg-cover rounded-2xl duration-500"
                style={{
                    backgroundImage: `url(${slides[currentIndex]})`,
                }}
            ></div>

            <div
                className=" absolute top-[45%] translate-x-0 translate-y-[-50%] right-6 text-2xl cursor-pointer"
                onClick={nextImage}
            >
                <i class="fa-solid fa-chevron-right"></i>
            </div>
        </div>
    );
};

export default SLide;
