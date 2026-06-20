const API_BASE_URL = "https://wynreach-backend.onrender.com/api/campaigns";

export async function finalizeCampaign(campaignId, data) {
  const token = localStorage.getItem("access_token");

  console.log("Finalize payload:", {
    campaignId,
    data,
  });

  const response = await fetch(`${API_BASE_URL}/${campaignId}/finalize`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  console.log("Finalize response:", response.status);

  if (!response.ok) {
    throw new Error("Failed to finalize campaign");
  }

  return response.json();
}
