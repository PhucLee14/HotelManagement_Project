import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewListRoomType } from "../../../service/roomTypeService";
import { viewListRoom } from "../../../service/roomService";
import Loading from "../../../components/loading/Loading";
import {
    viewBooking,
    viewListRoomBooking,
    viewListServiceBooking,
} from "../../../service/bookingService";
import { viewGuest } from "../../../service/guestService";
import { viewListService } from "../../../service/serviceService";
import { viewStaff } from "../../../service/staffService";
import { viewBillDetail } from "../../../service/billService";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    PDFDownloadLink,
    Font,
} from "@react-pdf/renderer";
import RobotoCondensed from "../../../assets/Fonts/static/RobotoCondensed-Black.ttf";

// Register Arial font
Font.register({
    family: "RobotoCondensed",
    src: RobotoCondensed,
});

// Define styles for PDF
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: "#f5f5f0",
    },
    section: {
        margin: 3,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
        fontFamily: "RobotoCondensed",
    },
    container: {
        flexDirection: "row",
        marginBottom: 20,
    },
    leftColumn: {
        paddingRight: 10,
    },
    rightColumn: {
        paddingLeft: 10,
        alignItems: "flex-end",
    },
    tableRow: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000",
        padding: 5,
        // marginBottom: 5,
    },
    tableCell: {
        flex: 1,
    },
});

const InvoicePDF = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                console.log("Fetching data...");
                const billDetail = await viewBillDetail(id);
                const bookingData = await viewBooking(billDetail.booking);
                const guestData = await viewGuest(billDetail.guest);
                const staffData = await viewStaff(billDetail.staff);
                const roomsBooking = await viewListRoomBooking(-1);
                const servicesBooking = await viewListServiceBooking(-1);
                const rooms = await viewListRoom(-1);
                const services = await viewListService(-1);
                const roomTypes = await viewListRoomType(-1);

                setData({
                    bill: billDetail,
                    booking: bookingData,
                    guest: guestData,
                    staff: staffData,
                    roomsBooking: roomsBooking,
                    servicesBooking: servicesBooking,
                    rooms: rooms,
                    services: services,
                    roomTypes: roomTypes,
                });
                console.log("Data fetched successfully", {
                    booking: bookingData,
                    guest: guestData,
                    staff: staffData,
                    roomsBooking: roomsBooking,
                    servicesBooking: servicesBooking,
                    rooms: rooms,
                    services: services,
                    roomTypes: roomTypes,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return <Loading />;
    }

    // Calculate total with discount if applicable
    const calculateTotal = () => {
        const {
            roomCharge,
            serviceCharge,
            surchargeForeign,
            surchargeQuantity,
            discount,
        } = data.bill;
        if (data.guest.guestCategories === "Vip" && discount) {
            return (
                roomCharge +
                serviceCharge +
                surchargeForeign +
                surchargeQuantity -
                discount
            );
        }
        return (
            roomCharge + serviceCharge + surchargeForeign + surchargeQuantity
        );
    };

    // Render PDF
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    <View style={[styles.section, styles.leftColumn]}>
                        <Text style={styles.title}>Invoice</Text>
                        <Text style={styles.text}>
                            Guest Name: {data.guest.name}
                        </Text>
                        <Text style={styles.text}>
                            Phone Number: {data.guest.phoneNumber}
                        </Text>
                        <Text style={styles.text}>
                            Registration Date:{" "}
                            {new Date(
                                data.booking.createdAt
                            ).toLocaleDateString()}
                        </Text>
                        <Text style={styles.text}>
                            Check-In Date:{" "}
                            {new Date(
                                data.booking.checkin
                            ).toLocaleDateString()}
                        </Text>
                        <Text style={styles.text}>
                            Check-Out Date:{" "}
                            {new Date(
                                data.booking.checkout
                            ).toLocaleDateString()}
                        </Text>
                        <Text style={styles.text}>
                            Staff Name: {data.staff.name}
                        </Text>
                    </View>
                    <View style={[styles.section, styles.rightColumn]}>
                        <Text style={styles.title}>Contact</Text>
                        <Text style={styles.text}>218 To Ngoc Van</Text>
                        <Text style={styles.text}>Linh Dong Ward</Text>
                        <Text style={styles.text}>Ho Chi Minh City</Text>
                        <Text style={styles.text}>Phone: 0901092207</Text>
                        <Text style={styles.text}>
                            Email: phangiadat123@gmail.com
                        </Text>
                    </View>
                </View>
                {data.booking.roomBookings &&
                    data.booking.roomBookings.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.title}>Booked Rooms</Text>
                            <View style={styles.tableRow}>
                                <Text style={[styles.text, styles.tableCell]}>
                                    Room Type
                                </Text>
                                <Text style={[styles.text, styles.tableCell]}>
                                    Room Number
                                </Text>
                                <Text style={[styles.text, styles.tableCell]}>
                                    Quantity
                                </Text>
                                <Text style={[styles.text, styles.tableCell]}>
                                    Price
                                </Text>
                            </View>
                            {data.booking.roomBookings.map((bookingId) => {
                                console.log("ID phòng", bookingId);
                                console.log("Dữ liệu phòng", data.roomsBooking);
                                return data.roomsBooking.data
                                    .filter(
                                        (roomBooking) =>
                                            roomBooking._id === bookingId
                                    )
                                    .map((roomBooking) => {
                                        const room = data.rooms.data.find(
                                            (item) =>
                                                item._id === roomBooking.room
                                        );
                                        console.log("Room", room._id);
                                        console.log("RoomBooking", roomBooking);
                                        const roomType =
                                            data.roomTypes.data.find(
                                                (roomtype) =>
                                                    roomtype._id ===
                                                    room.roomType
                                            );
                                        console.log("roomtype", roomType);
                                        return (
                                            <View
                                                key={room._id}
                                                style={styles.tableRow}
                                            >
                                                {console.log(room._id)}
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        styles.tableCell,
                                                    ]}
                                                >
                                                    {roomType.name}
                                                    {console.log(roomType.name)}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        styles.tableCell,
                                                    ]}
                                                >
                                                    {room.roomNumber}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        styles.tableCell,
                                                    ]}
                                                >
                                                    {roomBooking.headcount}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        styles.tableCell,
                                                    ]}
                                                >
                                                    {roomType.price}
                                                </Text>
                                            </View>
                                        );
                                    });
                            })}
                        </View>
                    )}

                {data.booking.serviceBookings &&
                    data.booking.serviceBookings.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.title}>Booked Services</Text>
                            <View style={styles.tableRow}>
                                <Text style={[styles.text, styles.tableCell]}>
                                    Service Name
                                </Text>
                                <Text style={[styles.text, styles.tableCell]}>
                                    Quantity
                                </Text>
                                <Text style={[styles.text, styles.tableCell]}>
                                    Price
                                </Text>
                            </View>
                            {data.booking.serviceBookings.map((bookingId) => {
                                return data.servicesBooking.data
                                    .filter(
                                        (serviceBooking) =>
                                            serviceBooking._id === bookingId
                                    )
                                    .map((serviceBooking) => {
                                        return data.services.data
                                            .filter(
                                                (service) =>
                                                    service._id ===
                                                    serviceBooking.service
                                            )
                                            .map((service) => (
                                                <View
                                                    key={service._id}
                                                    style={styles.tableRow}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.text,
                                                            styles.tableCell,
                                                        ]}
                                                    >
                                                        {service.name}
                                                        {console.log(
                                                            service.name
                                                        )}
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            styles.text,
                                                            styles.tableCell,
                                                        ]}
                                                    >
                                                        {
                                                            serviceBooking.quantity
                                                        }
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            styles.text,
                                                            styles.tableCell,
                                                        ]}
                                                    >
                                                        {service.price}
                                                    </Text>
                                                </View>
                                            ));
                                    });
                            })}
                        </View>
                    )}

                {data.bill && (
                    <View style={styles.section}>
                        <View
                            style={[
                                styles.container,
                                styles.rightColumn,
                                { flexDirection: "column" },
                            ]}
                        >
                            <Text style={styles.text}>
                                Room Charge: {data.bill.roomCharge} VNĐ
                            </Text>
                            <Text style={styles.text}>
                                Service Charge: {data.bill.serviceCharge} VNĐ
                            </Text>
                            {data.guest.guestCategories === "Vip" &&
                                data.bill.discount && (
                                    <Text style={styles.text}>
                                        Discount: {data.bill.discount} VNĐ
                                    </Text>
                                )}
                            <Text style={styles.text}>
                                Surcharge For Quantity:{" "}
                                {data.bill.surchargeQuantity} VNĐ
                            </Text>
                            <Text style={styles.text}>
                                Surcharge For Foreign:{" "}
                                {data.bill.surchargeForeign} VNĐ
                            </Text>
                            <Text style={styles.text}>
                                Total: {calculateTotal()} VNĐ
                            </Text>
                        </View>
                    </View>
                )}
                <View style={styles.section}>
                    <Text style={styles.text}>
                        Hello {data.guest.name}, thank you for being our
                        valuable customer. We hope our letter finds you in the
                        best of health and wealth.
                    </Text>
                    <Text style={styles.text}>Yours Sincerely,</Text>
                    <Text style={styles.text}>Double2P Hotel</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            <PDFViewer style={{ width: "100%", height: "810px" }}>
                <MyDocument />
            </PDFViewer>
            <PDFDownloadLink
                document={<MyDocument />}
                fileName={`invoice-${data.guest.name}.pdf`}
                style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#fff",
                    backgroundColor: "#4F46E5",
                    borderRadius: "5px",
                    marginTop: "10px",
                    display: "inline-block",
                }}
            >
                {({ loading }) =>
                    loading ? "Loading document..." : "Download Invoice"
                }
            </PDFDownloadLink>
        </div>
    );
};

export default InvoicePDF;
