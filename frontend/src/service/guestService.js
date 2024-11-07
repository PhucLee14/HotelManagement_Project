import apiBackend from "../utils/apiBackend";

//get List guest
export const viewListGuest = (currentPage) => {
  return apiBackend.get(`/api/guest/viewListGuest/${currentPage}`);
};

export const searchGuest = (currentPage, keyword) => {
  return apiBackend.get(`/api/guest/searchGuest/${currentPage}/${keyword}`);
};

//get guest by id
export const viewGuest = (id) => {
  return apiBackend.get(`/api/guest/${id}`);
};

//get guest by phone number
export const getGuestByPhoneNumber = (phoneNumber) => {
  return apiBackend.get(`/api/guest/phoneNumber/${phoneNumber}`);
};

//Add new guest
export const addNewGuest = (data) => {
  return apiBackend.post(`/api/guest/add`, data);
};

//Edit guest
export const editGuest = (id, data) => {
  return apiBackend.post(`/api/guest/edit/${id}`, data);
};
