export interface VJ {
  id: string;
  name: string;
  code: string;
  language: 'luganda' | 'swahili';
  description?: string;
  is_active: boolean;
  is_deletable: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface VJCreate {
  name: string;
  code: string;
  language: 'luganda' | 'swahili';
  description?: string;
}

export interface VJUpdate {
  name?: string;
  code?: string;
  language?: 'luganda' | 'swahili';
  description?: string;
  is_active?: boolean;
}

export interface VJResponse extends VJ {}