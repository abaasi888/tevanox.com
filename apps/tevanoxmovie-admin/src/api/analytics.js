import apiClient from './client';

export const getOverview = () => apiClient.get('/admin/analytics/overview');
export const getRevenueAnalytics = (period) => 
    apiClient.get('/admin/analytics/revenue', { params: { period } });
export const getUserAnalytics = (period) => 
    apiClient.get('/admin/analytics/users', { params: { period } });
export const getContentAnalytics = () => apiClient.get('/admin/analytics/content');
export const getAgentAnalytics = () => apiClient.get('/admin/analytics/agents');
export const getExportData = (type, format) => 
    apiClient.get('/admin/analytics/export', { params: { type, format } });