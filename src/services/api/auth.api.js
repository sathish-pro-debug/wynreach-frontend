// frontend/src/services/authApi.js
import { apiClient } from './api/client';
import { useAuthStore } from '../store/auth.store';

export const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    const data = response.data;
    
    // Update auth store
    useAuthStore.getState().setAuth(
      data.user,
      data.workspace,
      data.access_token,
      data.refresh_token
    );
    
    return data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
    useAuthStore.getState().clearAuth();
  },

  refreshToken: async (refreshToken) => {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    const data = response.data;
    useAuthStore.getState().setAccessToken(data.access_token);
    return data;
  },

  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await apiClient.put('/auth/me', profileData);
    if (response.data.user) {
      useAuthStore.getState().updateUser(response.data.user);
    }
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await apiClient.post('/auth/change-password', passwordData);
    return response.data;
  },
};