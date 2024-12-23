import AddGuest from "../admin/pages/guest/AddGuest";
import EditGuest from "../admin/pages/guest/EditGuest";
import Guest from "../admin/pages/guest/Guest";
import GuestDetail from "../admin/pages/guest/GuestDetail";
import AdminHome from "../admin/pages/home/AdminHome";
import Invoice from "../admin/pages/invoice/Invoice";
import InvoiceDetail from "../admin/pages/invoice/InvoiceDetail";
import InvoicePDF from "../admin/pages/invoice/invoicePDF";
import AdminLogin from "../admin/pages/login/AdminLogin";
import AddRegistration from "../admin/pages/registration/AddRegistration";
import EditRegistration from "../admin/pages/registration/EditRegistration";
import Registration from "../admin/pages/registration/Registration";
import RegistrationDetail from "../admin/pages/registration/RegistrationDetail";
import AddRoomType from "../admin/pages/room/roomType/AddRoomType";
import EditRoomType from "../admin/pages/room/roomType/EditRoomType";
import RoomType from "../admin/pages/room/roomType/RoomType";
import RoomTypeDetail from "../admin/pages/room/roomType/RoomTypeDetail";
import AddRoom from "../admin/pages/room/rooms/AddRoom";
import EditRoom from "../admin/pages/room/rooms/EditRoom";
import RoomDetail from "../admin/pages/room/rooms/RoomDetail";
import Rooms from "../admin/pages/room/rooms/Rooms";
import AddService from "../admin/pages/service/AddService";
import EditService from "../admin/pages/service/EditService";
import Service from "../admin/pages/service/Service";
import ServiceDetail from "../admin/pages/service/ServiceDetail";
import AddStaff from "../admin/pages/staff/AddStaff";
import EditStaff from "../admin/pages/staff/EditStaff";
import Staff from "../admin/pages/staff/Staff";
import StaffDetail from "../admin/pages/staff/StaffDetail";

const publicAdminRoutes = [
    { path: "/admin", component: AdminHome },
    //Guest
    { path: "/admin/guest", component: Guest },
    { path: "/admin/guest/:id", component: GuestDetail },
    { path: "/admin/guest/create", component: AddGuest },
    { path: "/admin/guest/edit/:id", component: EditGuest },
    //Room
    { path: "/admin/rooms", component: Rooms },
    { path: "/admin/rooms/:id", component: RoomDetail },
    { path: "/admin/rooms/create", component: AddRoom },
    { path: "/admin/rooms/edit/:id", component: EditRoom },
    //RoomType
    { path: "/admin/roomtype", component: RoomType },
    { path: "/admin/roomtype/:id", component: RoomTypeDetail },
    { path: "/admin/roomtype/create", component: AddRoomType },
    { path: "/admin/roomtype/edit/:id", component: EditRoomType },
    //Staff
    { path: "/admin/staff", component: Staff },
    { path: "/admin/staff/:id", component: StaffDetail },
    { path: "/admin/staff/create", component: AddStaff },
    { path: "/admin/staff/edit/:id", component: EditStaff },
    //Invoice
    { path: "/admin/invoice", component: Invoice },
    { path: "/admin/invoice/:id", component: InvoiceDetail },
    { path: "/admin/invoice/pdf/:id", component: InvoicePDF },
    //Service
    { path: "/admin/service", component: Service },
    { path: "/admin/service/:id", component: ServiceDetail },
    { path: "/admin/service/create", component: AddService },
    { path: "/admin/service/edit/:id", component: EditService },
    //Registration
    { path: "/admin/registration", component: Registration },
    { path: "/admin/registration/:id", component: RegistrationDetail },
    { path: "/admin/registration/create", component: AddRegistration },
    { path: "/admin/registration/edit/:id", component: EditRegistration },
    //Auth
    { path: "/admin/login", component: AdminLogin, layout: null },
];

const privateAdminRoute = [];

export { publicAdminRoutes, privateAdminRoute };
