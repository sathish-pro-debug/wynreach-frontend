export async function getSuppressionCount(listId) {

  const response = await fetch(
    `https://wynreach-backend.onrender.com/api/suppressions/count-by-list/${listId}`
  );

  return response.json();
}