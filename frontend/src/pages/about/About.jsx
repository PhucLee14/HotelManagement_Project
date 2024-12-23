import React from "react";
import Banner from "../../components/banner/Banner";
import Intro from "../../components/intro/Intro";
import slider_1 from "../../assets/images/slider-1.jpg";
import slider_2 from "../../assets/images/slider-2.jpg";
import slider_3 from "../../assets/images/slider-3.jpg";
import slider_4 from "../../assets/images/slider-4.jpg";
import slider_5 from "../../assets/images/slider-5.jpg";
import slider_6 from "../../assets/images/slider-6.jpg";
import slider_7 from "../../assets/images/slider-7.jpg";
import SLide from "../../components/slide/SLide";

const About = () => {
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
            <Banner
                title="About Us"
                des="DISCOVER YOUR PERFECT RETREAT AT OUR BOUTIQUE HOTEL."
            />
            <Intro />
            <div className="flex flex-col items-center my-24">
                <p className="text-[52px] font-serif font-semibold">
                    Leadership
                </p>
                <p className="text-gray-600 w-2/5 mb-12">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean.
                </p>
                <div className="flex w-3/4 justify-between"></div>
            </div>
            <div className="flex flex-col items-center mt-16 bg-slate-100 pt-12 pb-16 w-full">
                <p className="text-[52px] font-serif font-semibold">Photos</p>
                <p className="text-gray-600 w-2/5 mb-12">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean.
                </p>
                <div className="w-3/5 h-[540px] m-auto py-4 px-2 relative group">
                    <SLide slides={sliders} />
                </div>
            </div>
            <div className="flex flex-col items-center my-24">
                <p className="text-[52px] font-serif font-semibold mb-20">
                    History
                </p>
                <ul className="timeline timeline-vertical mr-[32%]">
                    <li>
                        <div className="timeline-start">2008</div>
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="timeline-end timeline-box">
                            <p className="text-2xl mb-2 font-semibold">
                                The Birth of the Company
                            </p>
                            <p>
                                Far far away, behind the word mountains, far
                                from the countries Vokalia and Consonantia,
                                there live the blind texts. Separated they live
                                in Bookmarksgrove right at the coast of the
                                Semantics, a large language ocean.
                            </p>
                        </div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-start">2011</div>
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="timeline-end timeline-box my-8">
                            <p className="text-2xl mb-2 font-semibold">
                                Company Full Blast
                            </p>
                            <p>
                                Far far away, behind the word mountains, far
                                from the countries Vokalia and Consonantia,
                                there live the blind texts. Separated they live
                                in Bookmarksgrove right at the coast of the
                                Semantics, a large language ocean.
                            </p>
                        </div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-start">2019</div>
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="timeline-end timeline-box">
                            <p className="text-2xl mb-2 font-semibold">
                                More Branches Worldwide
                            </p>
                            <p>
                                Far far away, behind the word mountains, far
                                from the countries Vokalia and Consonantia,
                                there live the blind texts. Separated they live
                                in Bookmarksgrove right at the coast of the
                                Semantics, a large language ocean.
                            </p>
                            <p>
                                A small river named Duden flows by their place
                                and supplies it with the necessary regelialia.
                                It is a paradisematic country, in which roasted
                                parts of sentences fly into your mouth.
                            </p>
                        </div>
                    </li>
                </ul>
                <div className="flex w-3/4 justify-between"></div>
            </div>
        </div>
    );
};

export default About;
