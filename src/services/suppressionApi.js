// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://wynreach-backend.onrender.com/api",
// });


// // GET ALL SUPPRESSIONS
// export const getSuppressions =
//   async () => {

//     const response =
//       await API.get(
//         "/suppressions"
//       );

//     return response.data;
// };


// // SUPPRESS CONTACT
// export const suppressContact =
//   async (id, reason) => {

//     const response =
//       await API.patch(
//         `/suppressions/${id}/suppress`,
//         {
//           reason
//         }
//       );

//     return response.data;
// };


// // RESTORE CONTACT
// export const restoreSuppression =
//   async (id) => {

//     const response =
//       await API.patch(
//         `/suppressions/${id}/restore`
//       );

//     return response.data;
// };


import axios from "axios";

const API = axios.create({
  baseURL: "https://wynreach-backend.onrender.com/api",
});


// =====================================================
// GET ALL SUPPRESSIONS
// =====================================================

export const getSuppressions = async () => {

  const response = await API.get(
    "/suppressions/"
  );

  return response.data;
};


// =====================================================
// SUPPRESS CONTACT
// =====================================================

export const suppressContact = async (
  id,
  payload
) => {

  const response = await API.patch(
    `/suppressions/${id}/suppress`,
    payload
  );

  return response.data;
};


// =====================================================
// RESTORE CONTACT
// =====================================================

export const restoreSuppression = async (
  id
) => {

  const response = await API.patch(
    `/suppressions/${id}/restore`
  );

  return response.data;
};