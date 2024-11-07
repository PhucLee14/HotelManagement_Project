import apiBackend from "../utils/apiBackend";

//get List staff
export const viewListStaff = (currentPage) => {
  return apiBackend.get(`/api/staff/viewListStaff/${currentPage}`);
};

export const searchStaff = (currentPage, keyword) => {
  return apiBackend.get(`/api/staff/searchStaff/${currentPage}/${keyword}`);
};

//get staff by id
export const viewStaff = (id) => {
  return apiBackend.get(`/api/staff/${id}`);
};

//Add new staff
export const addNewStaff = (data) => {
  return apiBackend.post(`/api/staff/add`, data);
};

//Edit staff
export const editStaff = (id, data) => {
  return apiBackend.post(`/api/staff/edit/${id}`, data);
};

//Login
export const loginStaff = (username, password) => {
  return apiBackend.post(`/api/staff/login`, { username, password });
};

//Refresh
export const refreshStaff = () => {
  return apiBackend.post(`/api/staff/refresh`);
};

//Logout
export const logoutStaff = () => {
  return apiBackend.post(`/api/staff/logout`);
};
