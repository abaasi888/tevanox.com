export interface Episode {
  id: string;
  series_id: string;
  title: string;
  episode_number: number;
  season: number;
  duration?: number;
  thumbnail_url?: string;
  video_url: string;
  description?: string;
  release_date?: string;
  total_views: number;
  is_active: boolean;
  created_at: string;
}

export interface Series {
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
  seasons: number;
  episodes_count: number;
  language?: string;
  country?: string;
  poster_url?: string;
  cover_url?: string;
  director?: string;
  cast: string[];
  total_views: number;
  average_rating: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string | null;
  episodes_list?: Episode[];
}

export interface SeriesCreate {
  title: string;
  original_title?: string;
  description: string;
  category_id: string;
  vj_id?: string;
  genre_ids: string[];
  release_year: number;
  seasons?: number;
  language?: string;
  country?: string;
  director?: string;
  cast: string[];
}

export interface SeriesUpdate {
  title?: string;
  original_title?: string;
  description?: string;
  category_id?: string;
  vj_id?: string;
  genre_ids?: string[];
  release_year?: number;
  seasons?: number;
  language?: string;
  country?: string;
  director?: string;
  cast?: string[];
  is_active?: boolean;
  is_featured?: boolean;
}

export interface SeriesResponse extends Series {}