import axios from "axios";

const API = axios.create({
  baseURL: "https://wynreach-backend.onrender.com/api",
});

export const getLists = async () => {
  const response = await API.get("/lists");
  return response.data;
};

export const createList = async (payload) => {
  console.log("LIST PAYLOAD:", payload);

  const response = await API.post(
    "/lists",
    payload
  );

  return response.data;
};

export const deleteList = async (id) => {
  const response = await API.delete(`/lists/${id}`);
  return response.data;
};

export const archiveList = async (id) => {
  const response = await API.patch(`/lists/${id}/archive`);
  return response.data;
};

export const restoreList = async (id) => {
  const response = await API.patch(`/lists/${id}/restore`);
  return response.data;
};

export const addContact = async (
  listId,
  payload
) => {

  const response = await API.post(
    `/lists/${listId}/contacts`,
    payload
  );

  return response.data;
};