import apiBackend from "../utils/apiBackend";

export const viewListRoomType = (currentPage) => {
  return apiBackend.get(`/api/roomtype/viewListRoomType/${currentPage}`);
};

export const searchRoomtype = (currentPage, keyword) => {
  return apiBackend.get(
    `/api/roomtype/searchRoomtype/${currentPage}/${keyword}`
  );
};

export const addNewRoomType = (data) => {
  return apiBackend.post(`/api/roomtype/add`, data);
};
//get roomtype by id
export const viewRoomtype = (id) => {
  return apiBackend.get(`/api/roomtype/${id}`);
};

//Edit roomtype
export const editRoomType = (id, data) => {
  return apiBackend.post(`/api/roomtype/edit/${id}`, data);
};
