import apiClient from './client';

export const getRanks = (params) => apiClient.get('/agent-ranks', { params });
export const getRank = (id) => apiClient.get(`/agent-ranks/${id}`);
export const createRank = (data) => apiClient.post('/agent-ranks', data);
export const updateRank = (id, data) => apiClient.put(`/agent-ranks/${id}`, data);
export const deleteRank = (id) => apiClient.delete(`/agent-ranks/${id}`);
export const getRankProgress = () => apiClient.get('/agent-ranks/progress');
export const getMyRank = () => apiClient.get('/agent-ranks/my-rank');