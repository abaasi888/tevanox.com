export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    LOGOUT_ALL: '/auth/logout/all',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    SESSIONS: '/auth/sessions',
    TERMINATE_SESSION: (sessionId: string) => `/auth/sessions/terminate/${sessionId}`,
  },
  
  // Users
  USERS: {
    PROFILE: '/users/profile',
    HISTORY: '/users/history',
    FAVORITES: '/users/favorites',
    FAVORITE: (contentId: string) => `/users/favorites/${contentId}`,
  },
  
  // Movies
  MOVIES: {
    LIST: '/movies',
    DETAIL: (id: string) => `/movies/${id}`,
    TRENDING: '/movies/trending',
    LATEST: '/movies/latest',
    SEARCH: '/movies/search',
    CATEGORY: (category: string) => `/movies/category/${category}`,
    RATE: (id: string) => `/movies/${id}/rate`,
    VIEW: (id: string) => `/movies/${id}/view`,
    DOWNLOADS: '/movies/downloads',
    DOWNLOAD: (id: string) => `/movies/${id}/download`,
  },
  
  // Series
  SERIES: {
    LIST: '/series',
    DETAIL: (id: string) => `/series/${id}`,
    TRENDING: '/series/trending',
    LATEST: '/series/latest',
    SEARCH: '/series/search',
    CATEGORY: (category: string) => `/series/category/${category}`,
    EPISODES: (id: string) => `/series/${id}/episodes`,
    EPISODE: (seriesId: string, episodeId: string) => `/series/${seriesId}/episodes/${episodeId}`,
  },
  
  // Music
  MUSIC: {
    LIST: '/music',
    DETAIL: (id: string) => `/music/${id}`,
    TRENDING: '/music/trending',
    LATEST: '/music/latest',
    SEARCH: '/music/search',
    CATEGORY: (category: string) => `/music/category/${category}`,
    PLAYLIST: '/music/playlist',
  },
  
  // Subscriptions
  SUBSCRIPTIONS: {
    PLANS: '/subscriptions/plans',
    ACTIVATE: '/subscriptions/activate',
    STATUS: '/subscriptions/status',
    CANCEL: '/subscriptions/cancel',
    HISTORY: '/subscriptions/history',
  },
  
  // Payments
  PAYMENTS: {
    METHODS: '/payments/methods',
    INITIALIZE: '/payments/initialize',
    VERIFY: (reference: string) => `/payments/verify/${reference}`,
    HISTORY: '/payments/history',
  },
  
  // Agents
  AGENTS: {
    REGISTER: '/agents/register',
    LOGIN: '/agents/login',
    DASHBOARD: '/agents/dashboard',
    REFERRALS: '/agents/referrals',
    EARNINGS: '/agents/earnings',
    WITHDRAW: '/agents/withdrawals',
    REFERRAL_LINK: '/agents/referral/link',
    REFERRAL_TRACK: '/agents/referral/track',
    CONVERSIONS: '/agents/referral/conversions',
    ELIGIBILITY: '/agents/commission-eligibility',
  },
  
  // Admin
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    AGENTS: '/admin/agents',
    MOVIES: '/admin/movies',
    MUSIC: '/admin/music',
    SERIES: '/admin/series',
    CATEGORIES: '/admin/categories',
    GENRES: '/admin/genres',
    VJS: '/admin/vjs',
    MUSICIANS: '/admin/musicians',
    SUBSCRIPTIONS: '/admin/subscriptions',
    PAYMENTS: '/admin/payments',
    SETTINGS: '/admin/settings',
  },
  
  // Categories
  CATEGORIES: {
    LIST: '/categories',
    CREATE: '/categories',
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
  },
  
  // Genres
  GENRES: {
    LIST: '/genres',
    CREATE: '/genres',
    UPDATE: (id: string) => `/genres/${id}`,
    DELETE: (id: string) => `/genres/${id}`,
  },
  
  // VJs
  VJS: {
    LIST: '/vjs',
    CREATE: '/vjs',
    UPDATE: (id: string) => `/vjs/${id}`,
    DELETE: (id: string) => `/vjs/${id}`,
  },
  
  // Musicians
  MUSICIANS: {
    LIST: '/musicians',
    CREATE: '/musicians',
    UPDATE: (id: string) => `/musicians/${id}`,
    DELETE: (id: string) => `/musicians/${id}`,
  },
  
  // Streaming
  STREAMING: {
    MOVIE: (id: string) => `/streaming/movie/${id}`,
    SERIES: (seriesId: string, episodeId: string) => `/streaming/series/${seriesId}/${episodeId}`,
    MUSIC: (id: string) => `/streaming/music/${id}`,
    DOWNLOAD: (id: string, type: string) => `/streaming/download/${id}?content_type=${type}`,
  },
} as const;