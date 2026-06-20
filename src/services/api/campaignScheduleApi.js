const API_BASE_URL = 'http://127.0.0.1:8000/api/campaigns';

export async function updateCampaignSchedule(campaignId, data) {

  console.log('Step4 payload:', {
    campaignId,
    data,
  });

  const response = await fetch(
    `${API_BASE_URL}/${campaignId}/schedule`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  console.log('Step4 response:', response.status);

 if (!response.ok) {
  const errorText = await response.text();

  console.error('Schedule API Error:', {
    status: response.status,
    body: errorText,
  });

  throw new Error(
    `Schedule update failed (${response.status}): ${errorText}`
  );
}

  return response.json();
}