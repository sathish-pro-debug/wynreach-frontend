// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://wynreach-backend.onrender.com/api",
// });


// // GET CONTACTS
// export const getContacts = async () => {
//   const response = await API.get("/contacts");
//   return response.data;
// };


// // CREATE CONTACT
// export const createContact = async (payload) => {
//   const response = await API.post(
//     `/lists/${payload.list_id}/contacts`,
//     payload
//   );

//   return response.data;
// };


// // DELETE CONTACT
// export const deleteContact = async (id) => {
//   const response = await API.delete(`/contacts/${id}`);
//   return response.data;
// };


// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://wynreach-backend.onrender.com/api",
// });


// // =====================================================
// // GET CONTACTS
// // =====================================================

// export const getContacts = async () => {
//   const response = await API.get("/contacts/");
//   return response.data;
// };


// // =====================================================
// // CREATE CONTACT
// // =====================================================

// export const createContact = async (payload) => {
//   const response = await API.post(
//     "/contacts/",
//     payload
//   );

//   return response.data;
// };


// // =====================================================
// // DELETE CONTACT
// // =====================================================

// export const deleteContact = async (id) => {
//   const response = await API.delete(`/contacts/${id}`);
//   return response.data;
// };

// export const updateContact = async (id, payload) => {
//   const response = await API.put(
//     `/contacts/${id}`,
//     payload
//   );

//   return response.data;
// };


import axios from "axios";

const API = axios.create({
  baseURL: "https://wynreach-backend.onrender.com/api",
});


// =====================================================
// GET CONTACTS
// =====================================================

export const getContacts = async () => {

  const response = await API.get(
    "/contacts/"
  );

  return response.data;
};


// =====================================================
// CREATE CONTACT
// =====================================================

export const createContact = async (
  payload
) => {

  const response = await API.post(
    "/contacts/",
    payload
  );

  return response.data;
};


// =====================================================
// DELETE CONTACT
// =====================================================

export const deleteContact = async (
  id
) => {

  const response = await API.delete(
    `/contacts/${id}`
  );

  return response.data;
};


// =====================================================
// UPDATE CONTACT
// =====================================================

export const updateContact = async (
  id,
  payload
) => {

  const response = await API.put(
    `/contacts/${id}`,
    payload
  );

  return response.data;
};


// =====================================================
// ADD CONTACT TO ANOTHER LIST
// =====================================================

export const addContactToList = async (
  contactId,
  listId
) => {

  const response = await API.post(
    `/contacts/${contactId}/add-to-list/${listId}`
  );

  return response.data;
};


// =====================================================
// REMOVE CONTACT FROM LIST
// =====================================================

export const removeContactFromList = async (
  contactId,
  listId
) => {

  const response = await API.delete(
    `/contacts/${contactId}/remove-from-list/${listId}`
  );

  return response.data;
};