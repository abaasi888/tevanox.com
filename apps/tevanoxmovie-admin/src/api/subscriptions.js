import apiClient from './client';

export const getSubscriptions = (params) => apiClient.get('/admin/subscriptions', { params });
export const getSubscription = (id) => apiClient.get(`/admin/subscriptions/${id}`);
export const getSubscriptionPlans = () => apiClient.get('/admin/subscriptions/plans');
export const createSubscriptionPlan = (data) => apiClient.post('/admin/subscriptions/plans', data);
export const updateSubscriptionPlan = (id, data) => 
    apiClient.put(`/admin/subscriptions/plans/${id}`, data);
export const deleteSubscriptionPlan = (id) => 
    apiClient.delete(`/admin/subscriptions/plans/${id}`);
export const getSubscriptionStats = () => apiClient.get('/admin/subscriptions/stats');
export const cancelSubscription = (id) => 
    apiClient.post(`/admin/subscriptions/${id}/cancel`);