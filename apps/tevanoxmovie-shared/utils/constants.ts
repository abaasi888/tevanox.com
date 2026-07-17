import { COLORS, SPACING, FONTS } from './index';

export const APP_CONFIG = {
  name: 'TevanoxMovie',
  version: '1.0.0',
  domain: 'tevanox.com',
  apiVersion: 'v1',
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  SESSION_ID: 'session_id',
  USER: 'user',
  THEME: 'theme',
  DOWNLOADS: 'downloads',
  SEARCH_HISTORY: 'search_history',
  WATCH_HISTORY: 'watch_history',
  FAVORITES: 'favorites',
  SETTINGS: 'settings',
} as const;

export const ROUTES = {
  HOME: '/',
  BROWSE: '/browse',
  MOVIE: (id: string) => `/movie/${id}`,
  SERIES: (id: string) => `/series/${id}`,
  MUSIC: (id: string) => `/music/${id}`,
  SEARCH: '/search',
  LOGIN: '/login',
  REGISTER: '/register',
  SUBSCRIPTION: '/subscription',
  PROFILE: '/profile',
  DOWNLOADS: '/downloads',
  AGENT_DASHBOARD: '/agent/dashboard',
  AGENT_TEAM: '/agent/team',
  AGENT_EARNINGS: '/agent/earnings',
  AGENT_WITHDRAW: '/agent/withdraw',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_MOVIES: '/admin/movies',
  ADMIN_AGENTS: '/admin/agents',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const UPLOAD = {
  MAX_VIDEO_SIZE: 5 * 1024 * 1024 * 1024, // 5GB
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_AUDIO_SIZE: 50 * 1024 * 1024, // 50MB
  ACCEPTED_VIDEO_TYPES: ['video/mp4', 'video/x-matroska', 'video/quicktime'],
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ACCEPTED_AUDIO_TYPES: ['audio/mpeg', 'audio/wav', 'audio/flac'],
} as const;