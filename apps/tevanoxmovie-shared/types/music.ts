export interface Music {
  id: string;
  title: string;
  artist: string;
  musician_id?: string;
  musician_name?: string;
  category_id: string;
  category_name: string;
  genre_ids: string[];
  genre_names: string[];
  album?: string;
  release_year?: number;
  duration?: number;
  language?: string;
  country?: string;
  cover_art?: string;
  audio_url: string;
  video_url?: string;
  lyrics?: string;
  producer?: string;
  record_label?: string;
  total_plays: number;
  total_downloads: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface MusicCreate {
  title: string;
  artist: string;
  musician_id?: string;
  category_id: string;
  genre_ids: string[];
  album?: string;
  release_year?: number;
  duration?: number;
  language?: string;
  country?: string;
  producer?: string;
  record_label?: string;
}

export interface MusicUpdate {
  title?: string;
  artist?: string;
  musician_id?: string;
  category_id?: string;
  genre_ids?: string[];
  album?: string;
  release_year?: number;
  duration?: number;
  language?: string;
  country?: string;
  producer?: string;
  record_label?: string;
  is_active?: boolean;
  is_featured?: boolean;
}

export interface MusicResponse extends Music {}