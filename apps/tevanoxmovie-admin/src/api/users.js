import apiClient from './client';

export const getUsers = (params) => apiClient.get('/admin/users', { params });
export const getUser = (id) => apiClient.get(`/admin/users/${id}`);
export const createUser = (data) => apiClient.post('/admin/users', data);
export const updateUser = (id, data) => apiClient.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => apiClient.delete(`/admin/users/${id}`);
export const toggleUserStatus = (id) => apiClient.patch(`/admin/users/${id}/toggle`);
export const getUserStats = () => apiClient.get('/admin/users/stats');
export const getUsersByDateRange = (start, end) => 
    apiClient.get('/admin/users/range', { params: { start, end } });