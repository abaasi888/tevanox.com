export interface Movie {
  id: string;
  title: string;
  original_title?: string;
  description: string;
  category_id: string;
  category_name: string;
  vj_id?: string;
  vj_name?: string;
  genre_ids: string[];
  genre_names: string[];
  release_year: number;
  duration: number;
  language?: string;
  country?: string;
  poster_url?: string;
  cover_url?: string;
  file_path: string;
  trailer_url?: string;
  director?: string;
  cast: string[];
  producer?: string;
  total_views: number;
  total_downloads: number;
  average_rating: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface MovieCreate {
  title: string;
  original_title?: string;
  description: string;
  category_id: string;
  vj_id?: string;
  genre_ids: string[];
  release_year: number;
  duration: number;
  language?: string;
  country?: string;
  director?: string;
  cast: string[];
}

export interface MovieUpdate {
  title?: string;
  original_title?: string;
  description?: string;
  category_id?: string;
  vj_id?: string;
  genre_ids?: string[];
  release_year?: number;
  duration?: number;
  language?: string;
  country?: string;
  director?: string;
  cast?: string[];
  is_active?: boolean;
  is_featured?: boolean;
}

export interface MovieResponse extends Movie {}

export interface MovieFilters {
  category?: string;
  genre?: string;
  search?: string;
  sort?: 'latest' | 'popular' | 'rating';
  page?: number;
  limit?: number;
}