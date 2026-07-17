export interface Genre {
  id: string;
  name: string;
  slug: string;
  type: 'movie' | 'series' | 'music';
  icon?: string;
  color?: string;
  description?: string;
  display_order: number;
  is_active: boolean;
  is_deletable: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface GenreCreate {
  name: string;
  slug: string;
  type: 'movie' | 'series' | 'music';
  icon?: string;
  color?: string;
  description?: string;
  display_order?: number;
}

export interface GenreUpdate {
  name?: string;
  slug?: string;
  icon?: string;
  color?: string;
  description?: string;
  display_order?: number;
  is_active?: boolean;
}

export interface GenreResponse extends Genre {}