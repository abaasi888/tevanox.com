export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'movie' | 'series' | 'music';
  parent_id?: string;
  icon?: string;
  color?: string;
  description?: string;
  display_order: number;
  is_active: boolean;
  is_deletable: boolean;
  subcategories?: Category[];
  created_at: string;
  updated_at: string | null;
}

export interface CategoryCreate {
  name: string;
  slug: string;
  type: 'movie' | 'series' | 'music';
  parent_id?: string;
  icon?: string;
  color?: string;
  description?: string;
  display_order?: number;
}

export interface CategoryUpdate {
  name?: string;
  slug?: string;
  parent_id?: string;
  icon?: string;
  color?: string;
  description?: string;
  display_order?: number;
  is_active?: boolean;
}

export interface CategoryResponse extends Category {}