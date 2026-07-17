export const COLORS = {
  primary: '#FF4757',
  primaryDark: '#CC1A2C',
  secondary: '#1a1a2e',
  secondaryLight: '#2a2a4e',
  background: '#0a0a1a',
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
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  DOWNLOADS: 'downloads',
};

export const CATEGORIES = {
  MOVIES: {
    UGANDAN: 'ugandan',
    ENGLISH: 'english',
    LUGANDA_TRANSLATED: 'luganda_translated',
    SWAHILI_TRANSLATED: 'swahili_translated',
  },
  MUSIC: {
    UGANDAN: 'ugandan',
    INTERNATIONAL: 'international',
  },
};

export const SUBSCRIPTION_PLANS = {
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
};

export const PAYMENT_METHODS = {
  MOBILE_MONEY: 'mobile_money',
  VISA: 'visa',
};

export const MOBILE_MONEY_PROVIDERS = {
  MTN: 'mtn',
  AIRTEL: 'airtel',
  AFRICELL: 'africell',
};

export const CONTENT_TYPES = {
  MOVIE: 'movie',
  SERIES: 'series',
  MUSIC: 'music',
};