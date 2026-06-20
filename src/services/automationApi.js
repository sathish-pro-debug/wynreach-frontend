// frontend/src/services/automationApi.js
import axios from 'axios';

const API_BASE_URL = 'https://wynreach-backend.onrender.com/api/automation';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// =====================================================
// SEQUENCE APIs
// =====================================================

export const createSequence = async (sequenceData) => {
  try {
    console.log('Creating sequence with data:', sequenceData);
    
    const payload = {
      name: sequenceData.name,
      description: sequenceData.description || '',
      campaign_id: sequenceData.campaign_id,
      campaign_name: sequenceData.campaign_name || '',
      campaign_channel: sequenceData.campaign_channel || '',
      steps: sequenceData.steps.map(step => ({
        id: step.id,
        delay_hours: step.delay_hours || '0',
        delay_minutes: step.delay_minutes || '0',
        type: step.type,
        template_id: step.template_id,
        template_name: step.template_name,
        template_type: step.template_type,
      })),
    };
    
    const response = await api.post('/sequences', payload);
    console.log('Sequence created successfully:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error creating sequence:', error);
    throw error;
  }
};

export const getSequences = async () => {
  try {
    const response = await api.get('/sequences');
    return response.data;
  } catch (error) {
    console.error('Error fetching sequences:', error);
    throw error;
  }
};

export const getSequence = async (sequenceId) => {
  try {
    const response = await api.get(`/sequences/${sequenceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sequence:', error);
    throw error;
  }
};

export const deleteSequence = async (sequenceId) => {
  try {
    const response = await api.delete(`/sequences/${sequenceId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting sequence:', error);
    throw error;
  }
};

export const toggleSequence = async (sequenceId, active) => {
  try {
    const response = await api.post(`/sequences/${sequenceId}/toggle?active=${active}`);
    return response.data;
  } catch (error) {
    console.error('Error toggling sequence:', error);
    throw error;
  }
};

export const testSequence = async (sequenceId) => {
  try {
    const response = await api.post(`/sequences/${sequenceId}/test`);
    return response.data;
  } catch (error) {
    console.error('Error testing sequence:', error);
    throw error;
  }
};

export default {
  createSequence,
  getSequences,
  getSequence,
  deleteSequence,
  toggleSequence,
  testSequence,
};