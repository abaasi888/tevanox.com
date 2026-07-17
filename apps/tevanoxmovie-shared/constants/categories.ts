import { CategoryType } from '../types/common';

export const MOVIE_CATEGORIES = [
  { id: 'ugandan', label: '🇺🇬 Ugandan Movies', type: 'movie' as CategoryType },
  { id: 'english', label: '🌍 English Movies', type: 'movie' as CategoryType },
  { id: 'luganda_translated', label: '🗣️ Luganda Translated', type: 'movie' as CategoryType },
  { id: 'swahili_translated', label: '🗣️ Swahili Translated', type: 'movie' as CategoryType },
] as const;

export const SERIES_CATEGORIES = [
  { id: 'ugandan', label: '🇺🇬 Ugandan Series', type: 'series' as CategoryType },
  { id: 'english', label: '🌍 English Series', type: 'series' as CategoryType },
  { id: 'luganda_translated', label: '🗣️ Luganda Translated', type: 'series' as CategoryType },
  { id: 'swahili_translated', label: '🗣️ Swahili Translated', type: 'series' as CategoryType },
] as const;

export const MUSIC_CATEGORIES = [
  { id: 'ugandan', label: '🇺🇬 Ugandan Artists', type: 'music' as CategoryType },
  { id: 'international', label: '🌍 International Artists', type: 'music' as CategoryType },
] as const;

export const ALL_CATEGORIES = {
  movie: MOVIE_CATEGORIES,
  series: SERIES_CATEGORIES,
  music: MUSIC_CATEGORIES,
} as const;