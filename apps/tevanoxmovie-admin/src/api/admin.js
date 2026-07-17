import apiClient from './client';

export const getDashboardStats = () => apiClient.get('/admin/dashboard');
export const getRevenueData = () => apiClient.get('/admin/revenue');
export const getActivityLog = () => apiClient.get('/admin/activity');
export const getSystemSettings = () => apiClient.get('/admin/settings');
export const updateSystemSettings = (data) => apiClient.put('/admin/settings', data);
export const getAdminProfile = () => apiClient.get('/admin/profile');
export const updateAdminProfile = (data) => apiClient.put('/admin/profile', data);
export const changeAdminPassword = (data) => apiClient.post('/admin/change-password', data);