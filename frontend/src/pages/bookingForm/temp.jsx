// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import thumb from "../../assets/images/thumbimg.png";
// import { viewListRoomType } from "../../service/roomTypeService";
// import { viewListFreeRoom } from "../../service/bookingService";
// import { payment } from "../../service/paymentService";
// import { getGuestByPhoneNumber } from "../../service/guestService";
// import toast from "react-hot-toast";
// import { createNewBooking } from "../../service/bookingService";

// const BookingForm = () => {
//     const [rooms, setRooms] = useState([]);
//     const [bookedDate, setBookedDate] = useState({});
//     const [roomTypes, setRoomTypes] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [paymentLink, setPaymentLink] = useState("");
//     const [paymentData, setPaymentData] = useState({ amount: 100000 });
//     const [total, setTotal] = useState(0);
//     const [freeRooms, setFreeRooms] = useState([]);
//     const [guest, setGuest] = useState({
//         name: "",
//         phoneNumber: "",
//         dateOfBirth: "",
//     });
//     const [isGuestFetched, setIsGuestFetched] = useState(false);
//     const [headCount, setHeadCount] = useState();
//     const [bookingInfo, setBookingInfo] = useState({});
//     const [booking, setBooking] = useState({
//         phoneNumber: "",
//         checkin: "",
//         checkout: "",
//         roomBookings: [],
//     });

//     const getRoomType = async () => {
//         try {
//             setIsLoading(true);
//             const data = await viewListRoomType(-1);
//             console.log(data);
//             if (data?.code === 0) {
//                 setRoomTypes(data?.data);
//             } else {
//                 setRoomTypes([]);
//             }
//             setIsLoading(false);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const getFreeRooms = async (checkin, checkout) => {
//         try {
//             setIsLoading(true);
//             const data = await viewListFreeRoom(checkin, checkout);
//             console.log(data);
//             if (data?.code === 0) {
//                 setFreeRooms(data?.data);
//             } else {
//                 setFreeRooms([]);
//             }
//             setIsLoading(false);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const getPaymentLink = async () => {
//         try {
//             setIsLoading(true);
//             const data = await payment({ ...paymentData, bookingInfo });
//             setPaymentLink(data.payUrl);
//             setIsLoading(false);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchGuest = async () => {
//         try {
//             setIsLoading(true);
//             const data = await getGuestByPhoneNumber(guest.phoneNumber);
//             console.log("guest data", data);
//             if (data?.code === 0) {
//                 const formattedDateOfBirth = data.data.dateOfBirth
//                     ? formatDate(data.data.dateOfBirth)
//                     : "";
//                 setGuest({
//                     ...guest,
//                     name: data.data.name,
//                     dateOfBirth: formattedDateOfBirth,
//                 });
//                 setIsGuestFetched(true);
//             } else {
//                 setIsGuestFetched(false);
//             }
//             setIsLoading(false);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setGuest({
//             ...guest,
//             [name]: value,
//         });
//     };

//     const formatDate = (date) => {
//         const d = new Date(date);
//         const month = String(d.getMonth() + 1).padStart(2, "0");
//         const day = String(d.getDate()).padStart(2, "0");
//         const year = d.getFullYear();
//         return `${year}-${month}-${day}`;
//     };

//     const handleHeadCountChange = (index, i, e) => {
//         const newArr = [...headCount];
//         newArr[index][i] = Number(e.target.value);
//         setHeadCount(newArr);
//     };

//     const bookingWithoutPayment = async () => {
//         rooms.map((room) => {
//             console.log(room.roomtypeId);
//         });
//         console.log(rooms);

//         // try {
//         //     setIsLoading(true);
//         //     const data = await createNewBooking(booking);
//         //     console.log(data);
//         //     if (data?.code === 0) {
//         //         toast.success(data.message);
//         //         nav("/");
//         //     } else {
//         //         toast.error(data.message);
//         //     }
//         //     setIsLoading(false);
//         // } catch (error) {
//         //     console.error(error);
//         //     setIsLoading(false);
//         // }
//     };

//     //Fetch Guest
//     useEffect(() => {
//         if (guest.phoneNumber.length === 10) {
//             fetchGuest();
//         } else {
//             setIsGuestFetched(false);
//         }
//     }, [guest.phoneNumber]);

//     useEffect(() => {
//         if (!isGuestFetched)
//             setGuest({
//                 ...guest,
//                 name: "",
//                 dateOfBirth: "",
//             });
//     }, [isGuestFetched]);

//     //Total
//     useEffect(() => {
//         const newTotal = rooms.reduce(
//             (sum, room) => sum + Number(room.value) * room.price,
//             0
//         );
//         setTotal(newTotal);
//         setPaymentData({
//             amount: newTotal / 2,
//         });
//     }, [rooms]);

//     //Get data from localstorage, get room type
//     useEffect(() => {
//         getRoomType();
//         const storedRoom = localStorage.getItem("roomStored");
//         if (storedRoom) {
//             setRooms(
//                 JSON.parse(storedRoom).filter((room) => room.value !== "0")
//             );
//         }
//         const storedBookedDate = localStorage.getItem("bookedDateStored");
//         if (storedBookedDate) {
//             setBookedDate(JSON.parse(storedBookedDate));
//         }
//     }, []);

//     useEffect(() => {
//         const newArray = rooms.map((room) =>
//             new Array(Number(room.value)).fill(1)
//         );
//         setHeadCount(newArray);
//     }, [rooms]);

//     //Set Booking Info
//     useEffect(() => {
//         const filteredRooms = rooms.map((room, index) => ({
//             index: index,
//             roomtypeId: room.roomtypeId,
//             value: room.value,
//             price: room.price * Number(room.value),
//             headcount: headCount[index],
//         }));
//         setBookingInfo({
//             guestName: guest.name,
//             phoneNumber: guest.phoneNumber,
//             birthday: guest.dateOfBirth,
//             checkIn: bookedDate.checkin,
//             checkOut: bookedDate.checkout,
//             room: filteredRooms,
//             total: total,
//         });
//         setBooking({
//             phoneNumber: guest.phoneNumber,
//             checkin: bookedDate.checkin,
//             checkout: bookedDate.checkout,
//             roomBookings: filteredRooms.map((room) => ({
//                 room: room.roomtypeId,
//                 headcount: room.value,
//             })),
//         });
//         getFreeRooms(bookingInfo.checkIn, bookingInfo.checkOut);
//     }, [guest, headCount]);

//     return (
//         <div className="bg-white min-h-screen w-screen">
//             <div
//                 className={`navbar fixed top-0 flex justify-center z-40 text-black border-b transition-all px-4 bg-white bg-opacity-80 backdrop-blur-sm`}
//             >
//                 <div className="">
//                     <Link className="btn btn-ghost text-2xl" to="/">
//                         Double2P Hotel
//                     </Link>
//                 </div>
//             </div>
//             {rooms.length > 0 ? (
//                 <div className="flex flex-col items-center">
//                     <img src={thumb} className="w-full" alt="" />
//                     <p className="text-[32px] font-bold mb-8">HOTEL BOOKING</p>
//                     <div className="w-1/2">
//                         <div className="w-full">
//                             <p>
//                                 Phone Number
//                                 <span className="text-red-600">*</span>
//                             </p>
//                             <input
//                                 type="text"
//                                 placeholder="Type here"
//                                 className="input input-bordered w-full mt-2"
//                                 name="phoneNumber"
//                                 value={guest.phoneNumber}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="flex mt-8 mb-16">
//                             <div className="w-1/2 mr-3">
//                                 <p>
//                                     Name
//                                     <span className="text-red-600">*</span>
//                                 </p>
//                                 <input
//                                     type="text"
//                                     placeholder="Type here"
//                                     className="input input-bordered w-full mt-2"
//                                     name="name"
//                                     value={guest.name}
//                                     onChange={handleChange}
//                                     disabled={isGuestFetched}
//                                 />
//                             </div>
//                             <div className="w-1/2 ml-3">
//                                 <p>
//                                     Birthday
//                                     <span className="text-red-600">*</span>
//                                 </p>
//                                 <input
//                                     type="date"
//                                     placeholder="Type here"
//                                     className="input input-bordered w-full mt-2"
//                                     name="dateOfBirth"
//                                     value={guest.dateOfBirth}
//                                     onChange={handleChange}
//                                     disabled={isGuestFetched}
//                                 />
//                             </div>
//                         </div>
//                         {rooms.map((room, index) => {
//                             return room.value !== "0" ? (
//                                 <div key={index} className="mt-8">
//                                     <div className="w-full flex">
//                                         <p className="w-1/2">
//                                             Room Type:
//                                             <span className="font-semibold ml-2">
//                                                 {room.roomtype}
//                                             </span>
//                                         </p>
//                                         <p className="w-1/2 ml-5">
//                                             Room Quantity:
//                                             <span className="font-semibold ml-2">
//                                                 {room.value}
//                                             </span>
//                                         </p>
//                                     </div>
//                                     <div className="mt-4">
//                                         <p>
//                                             Room Detail:{" "}
//                                             <span className="font-semibold">
//                                                 {room.bedQuantity}{" "}
//                                                 {room.bedType}
//                                             </span>
//                                         </p>
//                                     </div>
//                                     <div className="mt-4">
//                                         <p>
//                                             Price:{" "}
//                                             <span className="font-semibold">
//                                                 {Number(room.value) *
//                                                     room.price}
//                                             </span>
//                                         </p>
//                                     </div>
//                                     <div className="flex border-b border-gray-300 pb-8">
//                                         {roomTypes.map((roomtype) =>
//                                             roomtype.name === room.roomtype
//                                                 ? Array.from({
//                                                       length: Number(
//                                                           room.value
//                                                       ),
//                                                   }).map((_, i) => (
//                                                       <div
//                                                           key={i}
//                                                           className="mt-4 mr-4"
//                                                       >
//                                                           <p>Room {i + 1}</p>
//                                                           <select
//                                                               name=""
//                                                               id=""
//                                                               className="pr-16 pl-2 py-2 rounded-sm border mt-2"
//                                                               defaultValue="1"
//                                                               onChange={(e) =>
//                                                                   handleHeadCountChange(
//                                                                       index,
//                                                                       i,
//                                                                       e
//                                                                   )
//                                                               }
//                                                           >
//                                                               {Array.from({
//                                                                   length: Number(
//                                                                       roomtype.capacity
//                                                                   ),
//                                                               }).map((_, j) => (
//                                                                   <option
//                                                                       key={j}
//                                                                       value={
//                                                                           j + 1
//                                                                       }
//                                                                   >
//                                                                       {j + 1}
//                                                                   </option>
//                                                               ))}
//                                                           </select>
//                                                       </div>
//                                                   ))
//                                                 : null
//                                         )}
//                                     </div>
//                                 </div>
//                             ) : null;
//                         })}
//                         <div className="pt-8 mb-8">
//                             <div className="flex w-full mb-4">
//                                 <p className="w-1/2">
//                                     Check-In:{" "}
//                                     <span className="font-semibold">
//                                         {bookedDate.checkin}
//                                     </span>
//                                 </p>
//                                 <p className="w-1/2 ml-5">
//                                     Check-Out:{" "}
//                                     <span className="font-semibold">
//                                         {bookedDate.checkout}
//                                     </span>
//                                 </p>
//                             </div>
//                             <p>
//                                 Total:{" "}
//                                 <span className="font-semibold">{total}</span>
//                             </p>
//                         </div>

//                         <button
//                             className="btn w-full bg-blue-500 hover:bg-blue-400 text-white border-blue-500"
//                             onClick={() => {
//                                 if (
//                                     guest.phoneNumber &&
//                                     guest.name &&
//                                     guest.dateOfBirth
//                                 ) {
//                                     if (guest.phoneNumber.length != 10) {
//                                         toast.error(
//                                             "Số điện thoại phải đủ 10 số"
//                                         );
//                                     } else if (
//                                         new Date().getFullYear() -
//                                             new Date(
//                                                 guest.dateOfBirth
//                                             ).getFullYear() >=
//                                         18
//                                     ) {
//                                         getPaymentLink();
//                                         document
//                                             .getElementById("my_modal_2")
//                                             .showModal();
//                                     } else
//                                         toast.error(
//                                             "Bạn chưa đủ tuổi để thực hiện hành động này"
//                                         );
//                                 } else
//                                     toast.error(
//                                         "Vui lòng điền hết thông tin cần thiết"
//                                     );
//                             }}
//                         >
//                             Book Now
//                         </button>
//                         <button
//                             className="mt-4 btn w-full border-blue-500 bg-white text-blue-500 hover:border-blue-300 hover:bg-white hover:text-blue-300"
//                             onClick={() => {
//                                 if (
//                                     guest.phoneNumber &&
//                                     guest.name &&
//                                     guest.dateOfBirth
//                                 ) {
//                                     if (guest.phoneNumber.length != 10) {
//                                         toast.error(
//                                             "Số điện thoại phải đủ 10 số"
//                                         );
//                                     } else if (
//                                         new Date().getFullYear() -
//                                             new Date(
//                                                 guest.dateOfBirth
//                                             ).getFullYear() >=
//                                         18
//                                     ) {
//                                         bookingWithoutPayment();
//                                     } else
//                                         toast.error(
//                                             "Bạn chưa đủ tuổi để thực hiện hành động này"
//                                         );
//                                 } else
//                                     toast.error(
//                                         "Vui lòng điền hết thông tin cần thiết"
//                                     );
//                             }}
//                         >
//                             Book Now
//                         </button>
//                         <dialog id="my_modal_2" className="modal ">
//                             <div className="modal-box flex flex-col items-center">
//                                 <h3 className="font-bold text-2xl">
//                                     Confirm Payment?
//                                 </h3>
//                                 <Link
//                                     className="btn bg-black hover:bg-gray-600 text-white py-3 w-1/3 mt-8 font-semibold block text-center text-base"
//                                     onClick={() => {}}
//                                     to={paymentLink}
//                                 >
//                                     Comfirm
//                                 </Link>
//                             </div>
//                             <form method="dialog" className="modal-backdrop">
//                                 <button>close</button>
//                             </form>
//                         </dialog>
//                         <div className="w-full flex justify-center mb-4">
//                             <Link
//                                 className=" text-red-600 text-center py-3 mt-4 font-semibold"
//                                 to="/room"
//                             >
//                                 Decline
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="h-screen w-screen flex flex-col justify-center items-center">
//                     <p className="text-[40px]">403 Forbidden</p>
//                     <i class="fa-regular fa-cloud-exclamation text-[60px]"></i>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BookingForm;
