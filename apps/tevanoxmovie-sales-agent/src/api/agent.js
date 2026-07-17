import apiClient from './client';

export const getDashboard = () => apiClient.get('/agents/dashboard');
export const getReferrals = () => apiClient.get('/agents/referrals');
export const getReferralStats = () => apiClient.get('/agents/referrals/stats');
export const getEarnings = () => apiClient.get('/agents/earnings');
export const getEarningsHistory = () => apiClient.get('/agents/earnings/history');
export const getWithdrawals = () => apiClient.get('/agents/withdrawals');
export const requestWithdrawal = (data) => apiClient.post('/agents/withdrawals', data);
export const getCommissionBreakdown = () => apiClient.get('/agents/commissions/breakdown');
export const getNetworkTree = () => apiClient.get('/agents/network/tree');
export const getTeamStats = () => apiClient.get('/agents/team/stats');
export const getTierInfo = () => apiClient.get('/agents/tier');
export const getMarketingMaterials = () => apiClient.get('/agents/marketing');
export const getQRCode = () => apiClient.get('/agents/qrcode');
export const generateReferralLink = () => apiClient.post('/agents/referral/link');