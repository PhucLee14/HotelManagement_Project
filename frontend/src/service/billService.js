import apiBackend from "../utils/apiBackend";

export const viewListBill = (currentPage) => {
    return apiBackend.get(`/api/bill/viewListBill/${currentPage}`);
};

export const viewBillDetail = (id) => {
    return apiBackend.get(`/api/bill/detail/${id}`);
};

export const searchBill = (currentPage, keyword) => {
    return apiBackend.get(`/api/bill/searchBill/${currentPage}/${keyword}`);
};

export const getRevenueByMonthYear = (month, year) => {
    return apiBackend.get(`/api/bill/revenue/${month}/${year}`);
};
