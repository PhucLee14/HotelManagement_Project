import apiBackend from "../utils/apiBackend";

export const viewListRoom = (currentPage) => {
    return apiBackend.get(`/api/room/viewListRoom/${currentPage}`);
};

export const addNewRoom = (data) => {
    return apiBackend.post(`/api/room/add`, data);
};

export const viewRoom = (id) => {
    return apiBackend.get(`/api/room/${id}`);
};
