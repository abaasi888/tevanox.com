import apiClient from './client';

export const getShareableLinks = () => apiClient.get('/marketing/links');
export const getSocialMediaPosts = () => apiClient.get('/marketing/posts');
export const getFlyerTemplates = () => apiClient.get('/marketing/flyers');
export const getVideoAds = () => apiClient.get('/marketing/videos');
export const getPromotionalMaterials = () => apiClient.get('/marketing/materials');
export const trackShare = (data) => apiClient.post('/marketing/track', data);
export const getReferralLink = (agentCode) => apiClient.get(`/marketing/referral/${agentCode}`);