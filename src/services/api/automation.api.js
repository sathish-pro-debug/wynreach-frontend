// frontend/src/services/api/automation.api.js
import { apiClient } from './client';

// ============ RULE APIS ============

export const getRules = async () => {
  const response = await apiClient.get('/automation/rules');
  return response.data;
};

export const getRule = async (ruleId) => {
  const response = await apiClient.get(`/automation/rules/${ruleId}`);
  return response.data;
};

export const createRule = async (ruleData) => {
  const response = await apiClient.post('/automation/rules', ruleData);
  return response.data;
};

export const updateRule = async (ruleId, ruleData) => {
  const response = await apiClient.put(`/automation/rules/${ruleId}`, ruleData);
  return response.data;
};

export const deleteRule = async (ruleId) => {
  const response = await apiClient.delete(`/automation/rules/${ruleId}`);
  return response.data;
};

export const toggleRule = async (ruleId, active) => {
  const response = await apiClient.post(`/automation/rules/${ruleId}/toggle?active=${active}`);
  return response.data;
};

export const testRule = async (ruleId) => {
  const response = await apiClient.post(`/automation/rules/${ruleId}/test`);
  return response.data;
};

// ============ SEQUENCE APIS ============

export const getSequences = async () => {
  const response = await apiClient.get('/automation/sequences');
  return response.data;
};

export const getSequence = async (sequenceId) => {
  const response = await apiClient.get(`/automation/sequences/${sequenceId}`);
  return response.data;
};

export const createSequence = async (sequenceData) => {
  const response = await apiClient.post('/automation/sequences', sequenceData);
  return response.data;
};

export const updateSequence = async (sequenceId, sequenceData) => {
  const response = await apiClient.put(`/automation/sequences/${sequenceId}`, sequenceData);
  return response.data;
};

export const deleteSequence = async (sequenceId) => {
  const response = await apiClient.delete(`/automation/sequences/${sequenceId}`);
  return response.data;
};

export const toggleSequence = async (sequenceId, active) => {
  const response = await apiClient.post(`/automation/sequences/${sequenceId}/toggle?active=${active}`);
  return response.data;
};

export const testSequence = async (sequenceId) => {
  const response = await apiClient.post(`/automation/sequences/${sequenceId}/test`);
  return response.data;
};

export const getSequenceAnalytics = async (sequenceId) => {
  const response = await apiClient.get(`/automation/sequences/${sequenceId}/analytics`);
  return response.data;
};