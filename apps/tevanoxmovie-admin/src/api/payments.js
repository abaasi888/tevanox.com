import apiClient from './client';

export const getPayments = (params) => apiClient.get('/admin/payments', { params });
export const getPayment = (id) => apiClient.get(`/admin/payments/${id}`);
export const getPaymentStats = () => apiClient.get('/admin/payments/stats');
export const getWithdrawalRequests = () => apiClient.get('/admin/payments/withdrawals');
export const processWithdrawal = (id, data) => 
    apiClient.post(`/admin/payments/withdrawals/${id}/process`, data);
export const rejectWithdrawal = (id, data) => 
    apiClient.post(`/admin/payments/withdrawals/${id}/reject`, data);
export const getPaymentMethods = () => apiClient.get('/admin/payments/methods');