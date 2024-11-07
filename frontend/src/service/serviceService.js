import apiBackend from "../utils/apiBackend";

//get List service
export const viewListService = (currentPage) => {
  return apiBackend.get(`/api/service/viewListService/${currentPage}`);
};

export const searchService = (currentPage, keyword) => {
  return apiBackend.get(`/api/service/searchService/${currentPage}/${keyword}`);
};

//get service by id
export const viewService = (id) => {
  return apiBackend.get(`/api/service/${id}`);
};

//Add new service
export const addNewService = (data) => {
  return apiBackend.post(`/api/service/add`, data);
};

//Edit service
export const editService = (id, data) => {
  return apiBackend.post(`/api/service/edit/${id}`, data);
};
