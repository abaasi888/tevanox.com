import apiClient from './client';

export const getStats = () => apiClient.get('/agent/dashboard/stats');
export const getRecentActivity = () => apiClient.get('/agent/dashboard/activity');
export const getNotifications = () => apiClient.get('/agent/dashboard/notifications');
export const markNotificationRead = (id) => apiClient.put(`/agent/dashboard/notifications/${id}/read`);
export const markAllNotificationsRead = () => apiClient.put('/agent/dashboard/notifications/read-all');