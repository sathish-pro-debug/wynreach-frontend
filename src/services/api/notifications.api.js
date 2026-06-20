// notifications.api.js
import { apiClient } from "./client";

export const notificationsApi = {
  // ✅ Get all notifications with workspace support
  getAll: async (workspaceId = null, limit = 50, offset = 0) => {
    const params = new URLSearchParams();
    
    if (workspaceId) {
      params.append('workspace_id', workspaceId);
    }
    params.append('limit', limit);
    params.append('offset', offset);
    
    const url = `/notification-items/list?${params.toString()}`;
    const response = await apiClient.get(url);
    return response.data;
  },

  // ✅ Get unread count with workspace support
  getUnreadCount: async (workspaceId = null) => {
    const params = workspaceId ? `?workspace_id=${workspaceId}` : '';
    const response = await apiClient.get(
      `/notification-items/unread-count${params}`
    );
    return response.data;
  },

  // ✅ Mark single notification as read
  markRead: async (id) => {
    const response = await apiClient.put(
      `/notification-items/read/${id}`
    );
    return response.data;
  },

  // ✅ Mark all notifications as read with workspace support
  markAllRead: async (workspaceId = null) => {
    const params = workspaceId ? `?workspace_id=${workspaceId}` : '';
    const response = await apiClient.put(
      `/notification-items/read-all${params}`
    );
    return response.data;
  },

  // ✅ Create test notification (for debugging)
  createTest: async (workspaceId = null) => {
    const params = workspaceId ? `?workspace_id=${workspaceId}` : '';
    const response = await apiClient.post(
      `/notification-items/test${params}`
    );
    return response.data;
  },

  // ✅ Clear all notifications (for cleanup)
  clearAll: async (workspaceId = null) => {
    const params = workspaceId ? `?workspace_id=${workspaceId}` : '';
    const response = await apiClient.delete(
      `/notification-items/clear-all${params}`
    );
    return response.data;
  }
};