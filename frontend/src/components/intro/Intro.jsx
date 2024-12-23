import React from "react";
import home_1 from "../../assets/images/home_1.jpg";
import home_2 from "../../assets/images/home_2.jpg";

const Intro = () => {
    return (
        <div className="flex justify-center bg-slate-100">
            <div className="w-2/3 justify-between items-center mt-14 mb-40 flex flex-col-reverse xl:flex-row">
                <div className="w-full xl:w-1/3">
                    <p className="text-[52px] font-serif font-semibold">
                        Welcome!
                    </p>
                    <p className="text-gray-600">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove right at
                        the coast of the Semantics, a large language ocean.
                    </p>
                    <div className="mt-8">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
                            Learn more
                        </button>
                        <button className="text-blue-600 ml-12 font-semibold">
                            SEE VIDEO
                        </button>
                    </div>
                </div>
                <div className="w-full relative mb-12 xl:w-3/5">
                    <div className="">
                        <img
                            src={home_1}
                            alt=""
                            className="w-full rounded-lg"
                        />
                        <img
                            src={home_2}
                            alt=""
                            className="absolute rounded-full right-0 border-8 border-slate-100 -translate-y-2/3 translate-x-1/3 w-40 h-40 md:w-60 md:h-60"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
