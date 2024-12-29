import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import formatNumber from "../../../utils/formatNumber";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        paddingTop: 0,
        marginTop: 10,
    },
    section: {
        fontFamily: "Times-Roman",
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderColor: "#ddd",
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        width: "23%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: "#ddd",
        padding: 5,
    },
    tableCell: {
        margin: "auto",
        fontSize: 10,
    },
    textBold: {
        fontWeight: 900,
    },
});

const ReportExport = ({ monthlyRevenue, year }) => {
    // Tính tổng cho từng cột
    const totals = monthlyRevenue.reduce(
        (acc, rev) => ({
            totalRoomCharge: acc.totalRoomCharge + rev.totalRoomCharge,
            totalSurcharge: acc.totalSurcharge + rev.totalSurcharge,
            totalServiceCharge: acc.totalServiceCharge + rev.totalServiceCharge,
            totalRevenue: acc.totalRevenue + rev.totalRevenue,
        }),
        {
            totalRoomCharge: 0,
            totalSurcharge: 0,
            totalServiceCharge: 0,
            totalRevenue: 0,
        }
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text
                        style={{
                            fontSize: 12,
                            marginBottom: 40,
                            fontWeight: 900,
                        }}
                    >
                        Revenue Report - {year}
                    </Text>
                    <Text
                        style={{
                            fontSize: 28,
                            marginBottom: 10,
                            fontWeight: 900,
                        }}
                    >
                        Double2P Hotel
                    </Text>
                    <Text
                        style={{
                            fontSize: 8,
                            marginBottom: 10,
                            fontWeight: 900,
                        }}
                    >
                        219 To Ngoc Van, Linh Dong, Ho Chi Minh City
                    </Text>
                    <Text
                        style={{
                            fontSize: 8,
                            marginBottom: 20,
                            fontWeight: 900,
                        }}
                    >
                        0901092207 • phangiadat123@gmail.com
                    </Text>
                    <View style={styles.table}>
                        {/* Header */}
                        <View style={styles.tableRow}>
                            <View
                                style={[
                                    styles.tableCol,
                                    { backgroundColor: "#000", width: "13%" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tableCell,
                                        { color: "#fff" },
                                    ]}
                                >
                                    Month
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.tableCol,
                                    { backgroundColor: "#000" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tableCell,
                                        { color: "#fff" },
                                    ]}
                                >
                                    Room Price (VND)
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.tableCol,
                                    { backgroundColor: "#000" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tableCell,
                                        { color: "#fff" },
                                    ]}
                                >
                                    Surcharge (VND)
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.tableCol,
                                    { backgroundColor: "#000" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tableCell,
                                        { color: "#fff" },
                                    ]}
                                >
                                    Service Charge (VND)
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.tableCol,
                                    { backgroundColor: "#000" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tableCell,
                                        { color: "#fff" },
                                    ]}
                                >
                                    Total Revenue (VND)
                                </Text>
                            </View>
                        </View>
                        {/* Data Rows */}
                        {monthlyRevenue.map((rev) => (
                            <View style={styles.tableRow} key={rev.month}>
                                <View
                                    style={[styles.tableCol, { width: "13%" }]}
                                >
                                    <Text style={styles.tableCell}>
                                        {rev.month}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {formatNumber(rev.totalRoomCharge)}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {formatNumber(rev.totalSurcharge)}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {formatNumber(rev.totalServiceCharge)}
                                    </Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>
                                        {formatNumber(rev.totalRevenue)}
                                    </Text>
                                </View>
                            </View>
                        ))}
                        {/* Total Row */}
                        <View
                            style={[
                                styles.tableRow,
                                { backgroundColor: "#6D6E6C", color: "#fff" },
                            ]}
                        >
                            <View style={[styles.tableCol, { width: "13%" }]}>
                                <Text
                                    style={[styles.tableCell, styles.textBold]}
                                >
                                    Total
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text
                                    style={[styles.tableCell, styles.textBold]}
                                >
                                    {formatNumber(totals.totalRoomCharge)}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text
                                    style={[styles.tableCell, styles.textBold]}
                                >
                                    {formatNumber(totals.totalSurcharge)}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text
                                    style={[styles.tableCell, styles.textBold]}
                                >
                                    {formatNumber(totals.totalServiceCharge)}
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text
                                    style={[styles.tableCell, styles.textBold]}
                                >
                                    {formatNumber(totals.totalRevenue)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={{ fontSize: 12, marginTop: 10 }}>
                    Total Revenue: {formatNumber(totals.totalRevenue)} VND
                </Text>
                <View
                    style={{
                        position: "absolute",
                        bottom: 40,
                        right: 40,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            marginBottom: 50,
                            fontWeight: 900,
                        }}
                    >
                        Manager
                    </Text>
                    <Text style={{ fontSize: 12, marginTop: 10 }}>
                        Manager Name
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default ReportExport;
