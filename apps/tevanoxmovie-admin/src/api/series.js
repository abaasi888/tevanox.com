import apiClient from './client';

export const getSeries = (params) => apiClient.get('/admin/series', { params });
export const getSeriesItem = (id) => apiClient.get(`/admin/series/${id}`);
export const createSeries = (data) => apiClient.post('/admin/series', data);
export const updateSeries = (id, data) => apiClient.put(`/admin/series/${id}`, data);
export const deleteSeries = (id) => apiClient.delete(`/admin/series/${id}`);
export const toggleSeriesStatus = (id) => apiClient.patch(`/admin/series/${id}/toggle`);
export const getSeriesStats = () => apiClient.get('/admin/series/stats');
export const getEpisodes = (seriesId) => apiClient.get(`/admin/series/${seriesId}/episodes`);
export const createEpisode = (seriesId, data) => 
    apiClient.post(`/admin/series/${seriesId}/episodes`, data);
export const updateEpisode = (seriesId, episodeId, data) => 
    apiClient.put(`/admin/series/${seriesId}/episodes/${episodeId}`, data);
export const deleteEpisode = (seriesId, episodeId) => 
    apiClient.delete(`/admin/series/${seriesId}/episodes/${episodeId}`);