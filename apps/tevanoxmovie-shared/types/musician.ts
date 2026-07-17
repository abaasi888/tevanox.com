export interface Musician {
  id: string;
  name: string;
  real_name?: string;
  country?: string;
  genre_ids: string[];
  description?: string;
  is_active: boolean;
  is_deletable: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface MusicianCreate {
  name: string;
  real_name?: string;
  country?: string;
  genre_ids?: string[];
  description?: string;
}

export interface MusicianUpdate {
  name?: string;
  real_name?: string;
  country?: string;
  genre_ids?: string[];
  description?: string;
  is_active?: boolean;
}

export interface MusicianResponse extends Musician {}