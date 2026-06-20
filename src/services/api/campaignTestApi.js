const API_BASE_URL = 'http://127.0.0.1:8000/api/campaigns';

export async function sendTestEmailApi(
  campaignId,
  data
) {
  console.log('Test email payload:', {
    campaignId,
    data,
  });

  const response = await fetch(
    `${API_BASE_URL}/${campaignId}/test-email`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  console.log('Test email response:', response.status);

  if (!response.ok) {
    throw new Error('Failed to send test email');
  }

  return response.json();
}