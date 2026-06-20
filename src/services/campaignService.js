const API_BASE_URL = 'http://127.0.0.1:8000/api/campaigns';

export async function createCampaign(data) {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create campaign');
  }

  return response.json();
}