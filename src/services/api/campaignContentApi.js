const API_BASE_URL = 'http://127.0.0.1:8000/api/campaigns';

export async function updateCampaignContent(campaignId, data) {

  console.log('Step3 payload:', {
    campaignId,
    data,
  });

  const response = await fetch(
    `${API_BASE_URL}/${campaignId}/content`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  console.log('Step3 response status:', response.status);

  if (!response.ok) {
    const errorData = await response.text();

    console.log('Backend error:', errorData);

    throw new Error('Failed to update campaign content');
  }

  return response.json();
}