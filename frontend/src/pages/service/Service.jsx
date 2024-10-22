import React from "react";
import Banner from "../../components/banner/Banner";
import ServiceTag from "../../components/serviceTag/ServiceTag";
import user1 from "../../assets/images/user-1.png";
import user2 from "../../assets/images/user-2.png";
import user3 from "../../assets/images/user-3.png";
import service1 from "../../assets/images/service1.png";
import service2 from "../../assets/images/service2.png";

const Service = () => {
    return (
        <div className="w-full bg-white flex flex-col items-center">
            <Banner
                title="Services"
                des="EXPERIENCE LUXURY AND COMFORT AT OUR HOTEL."
            />
            <div className="w-3/4 mt-8">
                <ServiceTag
                    reverse={false}
                    thumb={service1}
                    title="Our Restaurant"
                    name="Dining & Drinks"
                    des="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
                />
                <ServiceTag
                    reverse={true}
                    thumb={service1}
                    title="Our Restaurant"
                    name="Dining & Drinks"
                    des="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
                />
            </div>

            <div className="flex flex-col items-center mt-16 bg-slate-100 pt-12 pb-16 w-full">
                <p className="text-[52px] font-serif font-semibold">
                    People Says
                </p>
                <div className="flex w-3/4 text-gray-600 my-10">
                    <div className="flex flex-col items-center mx-4 w-[30%]">
                        <img src={user1} alt="" className="w-16" />
                        <p className="my-4">
                            “A small river named Duden flows by their place and
                            supplies it with the necessary regelialia. It is a
                            paradisematic country, in which roasted parts of
                            sentences fly into your mouth, it has a wonderful
                            atmosphere and makes me feel very comfortable.”
                        </p>
                        <p className="italic">— Jean Smith</p>
                    </div>
                    <div className="flex flex-col items-center mx-4 w-[30%]">
                        <img src={user2} alt="" className="w-16" />
                        <p className="my-4">
                            “Even the all-powerful Pointing has no control about
                            the blind texts it is an almost unorthographic life
                            One day however a small line of blind text by the
                            name of Lorem Ipsum decided to leave for the far
                            World of Grammar.”
                        </p>
                        <p className="italic">— John Doe</p>
                    </div>
                    <div className="flex flex-col items-center mx-4 w-[30%]">
                        <img src={user3} alt="" className="w-16" />
                        <p className="my-4">
                            “When she reached the first hills of the Italic
                            Mountains, she had a last view back on the skyline
                            of her hometown Bookmarksgrove, the headline of
                            Alphabet Village and the subline of her own road,
                            the Line Lane.”
                        </p>
                        <p className="italic">— Jean Doe</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;
