import apiBackend from "../utils/apiBackend";

export const payment = (data) => {
    return apiBackend.post(`/api/payment`, data);
};

export const getData = (data) => {
    return apiBackend.post(`/api/payment/getdata`, data);
};
