import apiClient from './client';

export const agentRegister = (data) => apiClient.post('/agents/register', data);
export const agentLogin = (data) => apiClient.post('/agents/login', data);
export const agentRefresh = (data) => apiClient.post('/agents/refresh', data);
export const agentLogout = () => apiClient.post('/agents/logout');
export const agentForgotPassword = (email) => apiClient.post('/agents/forgot-password', { email });
export const agentResetPassword = (data) => apiClient.post('/agents/reset-password', data);
export const getAgentProfile = () => apiClient.get('/agents/profile');
export const updateAgentProfile = (data) => apiClient.put('/agents/profile', data);