import apiClient from './client';

export const getBalance = () => apiClient.get('/payments/balance');
export const getTransactions = () => apiClient.get('/payments/transactions');
export const requestPayout = (data) => apiClient.post('/payments/payout', data);
export const getPayoutHistory = () => apiClient.get('/payments/history');
export const getBankDetails = () => apiClient.get('/payments/bank');
export const updateBankDetails = (data) => apiClient.put('/payments/bank', data);
export const getPaymentMethods = () => apiClient.get('/payments/methods');
export const getWithdrawalSettings = () => apiClient.get('/payments/withdrawal/settings');