// frontend/src/hooks/useAuth.js
import { useAuthStore, useCurrentUser } from '../store/auth.store';
import { authApi } from '../services/authApi';

export const useAuth = () => {
  const { setAuth, clearAuth, setAccessToken, updateUser } = useAuthStore();
  const user = useCurrentUser();
  
  const fetchUser = async () => {
    try {
      const response = await authApi.getMe();
      if (response.user) {
        updateUser(response.user);
      }
      return response;
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error.response?.status === 401) {
        clearAuth();
      }
      throw error;
    }
  };

  return {
    user,
    setAuth,
    clearAuth,
    setAccessToken,
    updateUser,
    fetchUser,
  };
};