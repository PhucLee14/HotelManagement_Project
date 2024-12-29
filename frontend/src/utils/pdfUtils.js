import { jsPDF } from "jspdf";

const generatePDFReport = (revenueData) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Revenue Report", 20, 20);

    doc.setFontSize(12);
    doc.text("Monthly Revenue Data", 20, 30);

    const headers = ["Month", "Total Revenue", "Total Room Price"];
    const rows = revenueData.map((data) => [
        data.month,
        data.totalRevenue,
        data.totalRoomCharge,
    ]);

    const startY = 40;
    const rowHeight = 10;

    // Add headers
    headers.forEach((header, index) => {
        doc.text(header, 20 + index * 60, startY);
    });

    // Add rows
    rows.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            doc.text(
                cell.toString(),
                20 + cellIndex * 60,
                startY + (rowIndex + 1) * rowHeight
            );
        });
    });

    doc.save("revenue_report.pdf");
};

export default generatePDFReport;
