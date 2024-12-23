import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import {
    searchBookingByPhoneNumber,
    viewListBooking,
} from "../../service/bookingService";
import { viewListGuest } from "../../service/guestService";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/loading/LoadingComponent";
import RegistrationModal from "../../components/registrationModal/RegistrationModal";
import slider_1 from "../../assets/images/slider-1.jpg";
import slider_2 from "../../assets/images/slider-2.jpg";
import slider_3 from "../../assets/images/slider-3.jpg";
import EventTag from "../../components/eventTag/EventTag";

const Search = () => {
    const [registrations, setRegistrations] = useState([]);
    const [guests, setGuests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [modal, setModal] = useState(false);
    const [id, setId] = useState("");

    useEffect(() => {
        getData();
        getGuest();
    }, [phoneNumber]);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await searchBookingByPhoneNumber(1, phoneNumber);
            if (data?.code === 0) {
                setRegistrations(data?.data);
            } else {
                setRegistrations([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(registrations);

    const getGuest = async () => {
        try {
            // setIsLoading(true);
            const data = await viewListGuest(-1);
            if (data?.code === 0) {
                setGuests(data?.data);
            } else {
                setGuests([]);
            }
            // setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnClose = () => setModal(false);
    return (
        <div className="w-full bg-white flex flex-col items-center">
            <Banner title="Search" des="FINDING YOUR REGISTRATION FORM" />
            <div className="flex flex-col items-center my-24 w-3/4">
                <p className="text-[52px] font-serif font-semibold">
                    Booking History
                </p>
                <div className="w-full">
                    <form
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log(phoneNumber);
                        }}
                        className="flex mt-4"
                    >
                        <input
                            type="text"
                            placeholder="Input your phone number"
                            className="border-2 outline-none px-4 py-2 w-full rounded-s-2xl"
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                            defaultValue={phoneNumber}
                            value={phoneNumber}
                        />
                        <button
                            className="border-2 border-l-0 hover:bg-gray-50 outline-none px-4 py-2 rounded-e-2xl"
                            onClick={() => {
                                setPhoneNumber("");
                            }}
                        >
                            <i class="fa-sharp fa-solid fa-xmark text-gray-500"></i>
                        </button>
                    </form>
                    {isLoading ? (
                        <LoadingComponent />
                    ) : registrations.length != 0 ? (
                        <table className="w-full text-left mt-6">
                            <thead>
                                <tr className="border bg-gray-200">
                                    <th className="text-gray-600 font-medium py-4 pl-6">
                                        Guest Name
                                    </th>
                                    <th className="text-gray-600 font-medium">
                                        Check-In Date
                                    </th>
                                    <th className="text-gray-600 font-medium">
                                        Check-Out Date
                                    </th>
                                    <th className="text-gray-600 font-medium">
                                        Registration Date
                                    </th>
                                    <th className="text-gray-600 font-medium">
                                        Room Status
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map((registration) => {
                                    return (
                                        <tr
                                            className="border hover:bg-gray-100"
                                            key={registration._id}
                                        >
                                            <td className="py-4 text-gray-500 pl-6 font-semibold">
                                                {registration.guest.name}
                                            </td>
                                            <td className="py-4 text-gray-500">
                                                {new Date(
                                                    registration.checkin
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 text-gray-500">
                                                {new Date(
                                                    registration.checkout
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 text-gray-500">
                                                {new Date(
                                                    registration.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 text-gray-500">
                                                {registration.roomInteraction}
                                            </td>
                                            <td>
                                                <button
                                                    className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full"
                                                    onClick={() => {
                                                        setId(registration._id);
                                                        setModal(true);
                                                    }}
                                                >
                                                    Detail
                                                </button>

                                                <RegistrationModal
                                                    id={id}
                                                    onClose={handleOnClose}
                                                    visible={modal}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center mt-8">
                            <i class="fa-regular fa-cloud-xmark text-[40px]"></i>
                            <p className="font-semibold text-2xl">
                                Data not found
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-center bg-slate-100 py-20 w-full">
                <p className="text-[52px] font-serif font-semibold">Events</p>
                <p className="text-gray-600 w-2/5 mb-12">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean.
                </p>
                <div className="w-3/4 py-4 px-2 flex">
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

export default Search;
