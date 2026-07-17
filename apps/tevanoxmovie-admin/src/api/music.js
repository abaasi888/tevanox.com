import apiClient from './client';

export const getMusic = (params) => apiClient.get('/admin/music', { params });
export const getMusicItem = (id) => apiClient.get(`/admin/music/${id}`);
export const createMusic = (data) => apiClient.post('/admin/music', data);
export const updateMusic = (id, data) => apiClient.put(`/admin/music/${id}`, data);
export const deleteMusic = (id) => apiClient.delete(`/admin/music/${id}`);
export const toggleMusicStatus = (id) => apiClient.patch(`/admin/music/${id}/toggle`);
export const getMusicStats = () => apiClient.get('/admin/music/stats');
export const getMusicCategories = () => apiClient.get('/admin/music/categories');
export const getMusicGenres = () => apiClient.get('/admin/music/genres');