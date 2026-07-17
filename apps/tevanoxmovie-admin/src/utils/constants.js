export const API_URL = import.meta.env.VITE_API_URL || 'https://api.tevanox.com/api/v1';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'TevanoxMovie Admin';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
export const DOMAIN = import.meta.env.VITE_DOMAIN || 'tevanox.com';

export const MOVIE_CATEGORIES = [
  { id: 'ugandan', label: '🇺🇬 Ugandan Movies', type: 'local' },
  { id: 'english', label: '🌍 English Movies', type: 'international' },
  { id: 'luganda_translated', label: '🗣️ Luganda Translated', type: 'translated' },
  { id: 'swahili_translated', label: '🗣️ Swahili Translated', type: 'translated' },
];

export const MUSIC_CATEGORIES = [
  { id: 'ugandan', label: '🇺🇬 Ugandan Artists', type: 'local' },
  { id: 'international', label: '🌍 International Artists', type: 'international' },
];

export const SUBSCRIPTION_PLANS = [
  { id: 'weekly', name: 'Weekly', price: 7000, duration: 7 },
  { id: 'biweekly', name: 'Bi-Weekly', price: 12000, duration: 14 },
  { id: 'monthly', name: 'Monthly', price: 20000, duration: 30 },
];

export const COMMISSION_RATES = {
  TEVANOX_SHARE: 0.60,
  NETWORK_TOTAL: 0.40,
  LEVEL_1: 0.25,
  LEVEL_2: 0.10,
  LEVEL_3: 0.05,
};

export const AGENT_TIERS = [
  { tier: 1, minUsers: 0, maxUsers: 100, commissionRate: 0.15, bonus: 0 },
  { tier: 2, minUsers: 101, maxUsers: 500, commissionRate: 0.12, bonus: 50000 },
  { tier: 3, minUsers: 501, maxUsers: 999, commissionRate: 0.10, bonus: 100000 },
  { tier: 4, minUsers: 1000, maxUsers: Infinity, commissionRate: 0.08, bonus: 200000 },
];

export const PAYMENT_METHODS = {
  MOBILE_MONEY: 'mobile_money',
  VISA: 'visa',
  BANK_TRANSFER: 'bank_transfer',
};

export const MOBILE_MONEY_PROVIDERS = {
  MTN: 'mtn',
  AIRTEL: 'airtel',
  AFRICELL: 'africell',
};