import React, { useState } from "react";
import SLide from "../../components/slide/SLide";
import Banner from "../../components/banner/Banner";
import home_3 from "../../assets/images/home_3.jpg";
import home_4 from "../../assets/images/home_4.jpg";
import home_5 from "../../assets/images/home_5.jpg";
import slider_1 from "../../assets/images/slider-1.jpg";
import slider_2 from "../../assets/images/slider-2.jpg";
import slider_3 from "../../assets/images/slider-3.jpg";
import slider_4 from "../../assets/images/slider-4.jpg";
import slider_5 from "../../assets/images/slider-5.jpg";
import slider_6 from "../../assets/images/slider-6.jpg";
import slider_7 from "../../assets/images/slider-7.jpg";
import meal from "../../assets/images/meal.jpg";
import EventTag from "../../components/eventTag/EventTag";
import Intro from "../../components/intro/Intro";

const Home = () => {
    const sliders = [
        slider_1,
        slider_2,
        slider_3,
        slider_4,
        slider_5,
        slider_6,
        slider_7,
    ];
    return (
        <div className="w-full bg-white flex flex-col items-center">
            <Banner title="A Best Place To Stay" des="BOUTIQUE HOTEL." />
            <Intro />

            <div className="flex flex-col items-center my-24">
                <p className="text-[52px] font-serif font-semibold">
                    Room & Suites
                </p>
                <p className="text-gray-600 mb-12 text-justify w-4/5 md:w-2/5">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean.
                </p>
                <div className="flex sm:flex-row flex-col w-5/6 justify-center">
                    <img
                        src={home_3}
                        alt=""
                        className="sm:w-1/3 mx-3 shadow-xl mb-8"
                    />
                    <img
                        src={home_4}
                        alt=""
                        className="sm:w-1/3 mx-3 shadow-xl mb-8"
                    />
                    <img
                        src={home_5}
                        alt=""
                        className="sm:w-1/3 mx-3 shadow-xl"
                    />
                </div>
            </div>

            <div className="flex flex-col items-center mt-16 bg-slate-100 pt-12 pb-16 w-full">
                <p className="text-[52px] font-serif font-semibold">Photos</p>
                <p className="text-gray-600 mb-12 text-justify w-4/5 md:w-2/5">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean.
                </p>
                <div className="sm:w-3/5 w-4/5 h-[540px] m-auto py-4 relative group">
                    <SLide slides={sliders} />
                </div>
            </div>

            <div
                className="relative flex flex-col items-center bg-opacity-50 w-full py-24 bg-contain"
                style={{
                    backgroundImage: `url(${meal})`,
                }}
            >
                <div class="absolute inset-0 bg-black bg-opacity-75"></div>
                <div className="z-10 flex flex-col items-center text-white">
                    <p className="text-[52px] font-serif font-semibold">
                        The Menu
                    </p>
                    <p className=" mb-12 w-4/5 md:w-2/5">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts. Separated they live in Bookmarksgrove right at
                        the coast of the Semantics, a large language ocean.
                    </p>
                    <div className="flex justify-center">
                        <div className="w-1/3 mr-4">
                            <div className="flex flex-col items-center my-12">
                                <p className="text-blue-500 text-2xl">$20.00</p>
                                <p className="text-[24px] font-serif">
                                    Murgh Tikka Masala
                                </p>
                                <p className="text-gray-300 text-center">
                                    Far far away, behind the word mountains, far
                                    from the countries Vokalia and Consonantia,
                                    there live the blind texts.
                                </p>
                            </div>
                            <div className="flex flex-col items-center my-12">
                                <p className="text-blue-500 text-2xl">$20.00</p>
                                <p className="text-[24px] font-serif">
                                    Murgh Tikka Masala
                                </p>
                                <p className="text-gray-300 text-center">
                                    Far far away, behind the word mountains, far
                                    from the countries Vokalia and Consonantia,
                                    there live the blind texts.
                                </p>
                            </div>
                            <div className="flex flex-col items-center my-12">
                                <p className="text-blue-500 text-2xl">$20.00</p>
                                <p className="text-[24px] font-serif">
                                    Murgh Tikka Masala
                                </p>
                                <p className="text-gray-300 text-center">
                                    Far far away, behind the word mountains, far
                                    from the countries Vokalia and Consonantia,
                                    there live the blind texts.
                                </p>
                            </div>
                        </div>
                        <div className="w-1/3 ml-4">
                            <div className="flex flex-col items-center my-12">
                                <p className="text-blue-500 text-2xl">$20.00</p>
                                <p className="text-[24px] font-serif">
                                    Murgh Tikka Masala
                                </p>
                                <p className="text-gray-300 text-center">
                                    Far far away, behind the word mountains, far
                                    from the countries Vokalia and Consonantia,
                                    there live the blind texts.
                                </p>
                            </div>
                            <div className="flex flex-col items-center my-12">
                                <p className="text-blue-500 text-2xl">$20.00</p>
                                <p className="text-[24px] font-serif">
                                    Murgh Tikka Masala
                                </p>
                                <p className="text-gray-300 text-center">
                                    Far far away, behind the word mountains, far
                                    from the countries Vokalia and Consonantia,
                                    there live the blind texts.
                                </p>
                            </div>
                            <div className="flex flex-col items-center my-12">
                                <p className="text-blue-500 text-2xl">$20.00</p>
                                <p className="text-[24px] font-serif">
                                    Murgh Tikka Masala
                                </p>
                                <p className="text-gray-300 text-center">
                                    Far far away, behind the word mountains, far
                                    from the countries Vokalia and Consonantia,
                                    there live the blind texts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center bg-slate-100 py-20 w-full">
                <p className="text-[52px] font-serif font-semibold">Events</p>
                <p className="text-gray-600 mb-12 text-justify w-4/5 sm:w-2/5">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean.
                </p>
                <div className="py-4 flex md:flex-row flex-col items-center w-4/5 sm:w-3/4">
                    <EventTag
                        background={slider_1}
                        date="FEBRUARY 26, 2018"
                        title="Travel Hacks to Make Your Flight More Comfortable"
                        content="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
                    />
                    <EventTag
                        background={slider_2}
                        date="FEBRUARY 26, 2018"
                        title="5 Job Types That Aallow You To Earn As You Travel The World"
                        content="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
                    />
                    <EventTag
                        background={slider_3}
                        date="FEBRUARY 26, 2018"
                        title="30 Great Ideas On Gifts For Travelers"
                        content="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
