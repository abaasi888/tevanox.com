export const COLORS = {
  primary: '#9C27B0',
  primaryDark: '#6A1B9A',
  secondary: '#1a1a2e',
  secondaryLight: '#2a2a4e',
  background: '#1a0033',
  text: '#ffffff',
  textSecondary: '#aaaaaa',
  textMuted: '#666666',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#FF4757',
  gold: '#FFD700',
};

export const API_URL = process.env.API_URL || 'https://api.tevanox.com/api/v1';

export const STORAGE_KEYS = {
  AGENT_TOKEN: 'agent_token',
  AGENT_REFRESH_TOKEN: 'agent_refresh_token',
  AGENT: 'agent',
};

export const AGENT_TIERS = [
  { tier: 1, minUsers: 0, maxUsers: 100, commissionRate: 0.15, bonus: 0 },
  { tier: 2, minUsers: 101, maxUsers: 500, commissionRate: 0.12, bonus: 50000 },
  { tier: 3, minUsers: 501, maxUsers: 999, commissionRate: 0.10, bonus: 100000 },
  { tier: 4, minUsers: 1000, maxUsers: Infinity, commissionRate: 0.08, bonus: 200000 },
];

export const WITHDRAWAL_SETTINGS = {
  MIN: 5000,
  MAX: 10000000,
  PROCESSING_DAYS: 3,
};