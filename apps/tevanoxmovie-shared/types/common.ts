export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface DeviceInfo {
  type: 'web' | 'mobile' | 'agent';
  name: string;
  userAgent?: string;
  ipAddress?: string;
}

export type ContentType = 'movie' | 'series' | 'music' | 'episode';

export type UserRole = 'user' | 'admin' | 'agent';

export type Language = 'luganda' | 'swahili' | 'english';

export type CategoryType = 'movie' | 'series' | 'music';

export type GenreType = 'movie' | 'series' | 'music';

export type DeviceType = 'web' | 'mobile' | 'agent';