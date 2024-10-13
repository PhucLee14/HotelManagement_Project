import About from "../pages/about/About";
import BookingForm from "../pages/bookingForm/BookingForm";
import Home from "../pages/home/Home";
import Room from "../pages/room/Room";
import Search from "../pages/search/Search";
import Service from "../pages/service/Service";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/room", component: Room },
    { path: "/about", component: About },
    { path: "/service", component: Service },
    { path: "/search", component: Search },
    { path: "/booking", component: BookingForm, layout: null },
];

const privateRoute = [];

export { publicRoutes, privateRoute };
