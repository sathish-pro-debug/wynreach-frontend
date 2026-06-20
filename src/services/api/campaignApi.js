// const API_BASE_URL = 'https://wynreach-backend.onrender.com/api/campaigns';

// export async function getAllCampaigns() {

//   const response = await fetch(API_BASE_URL);

//   if (!response.ok) {
//     throw new Error('Failed to fetch campaigns');
//   }

//   return response.json();
// }

// export async function getCampaignById(id) {

//   const response = await fetch(`${API_BASE_URL}/${id}`);

//   if (!response.ok) {
//     throw new Error('Failed to fetch campaign');
//   }

//   return response.json();
// }

// export async function duplicateCampaign(id) {

//   const response = await fetch(
//     `${API_BASE_URL}/${id}/duplicate`,
//     {
//       method: 'POST',
//     }
//   );

//   if (!response.ok) {
//     throw new Error('Failed to duplicate campaign');
//   }

//   return response.json();
// }


import { apiClient } from './client';

const API_BASE_URL = 'https://wynreach-backend.onrender.com/api/campaigns/';

export async function getAllCampaigns() {

  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch campaigns');
  }

  return response.json();
}

export async function getCampaignById(id) {

  console.log('Fetching campaign:', id);

  const response = await fetch(
    `${API_BASE_URL}${id}`
  );

  console.log('Status:', response.status);

  if (!response.ok) {
    throw new Error('Failed to fetch campaign');
  }

  const data = await response.json();

  console.log('Campaign data:', data);

  return data;
}
export const getCampaignLogs = async (campaignId) => {
  const response = await apiClient.get(
    `/campaigns/${campaignId}/logs`
  );

  return response.data;
};

export const getCampaignAnalytics = async (campaignId) => {
  const response = await apiClient.get(
    `/campaigns/${campaignId}/analytics`
  );

  return response.data;
};
export async function duplicateCampaign(id) {

  const response = await fetch(
    `${API_BASE_URL}/${id}/duplicate`,
    {
      method: 'POST',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to duplicate campaign');
  }

  return response.json();
}



