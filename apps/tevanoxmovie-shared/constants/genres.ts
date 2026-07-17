import { GenreType } from '../types/common';

export const MOVIE_GENRES = [
  // Action & Adventure
  { id: 'action', label: 'Action', icon: '⚔️', type: 'movie' as GenreType },
  { id: 'adventure', label: 'Adventure', icon: '🗺️', type: 'movie' as GenreType },
  { id: 'martial_arts', label: 'Martial Arts', icon: '🥋', type: 'movie' as GenreType },
  
  // Sci-Fi & Fantasy
  { id: 'sci_fi', label: 'Sci-Fi', icon: '🚀', type: 'movie' as GenreType },
  { id: 'fantasy', label: 'Fantasy', icon: '🧙', type: 'movie' as GenreType },
  { id: 'superhero', label: 'Superhero', icon: '🦸', type: 'movie' as GenreType },
  
  // Horror & Thriller
  { id: 'horror', label: 'Horror', icon: '👻', type: 'movie' as GenreType },
  { id: 'thriller', label: 'Thriller', icon: '🔪', type: 'movie' as GenreType },
  { id: 'psychological', label: 'Psychological', icon: '🧠', type: 'movie' as GenreType },
  { id: 'crime', label: 'Crime', icon: '🚔', type: 'movie' as GenreType },
  
  // Drama & Romance
  { id: 'drama', label: 'Drama', icon: '🎭', type: 'movie' as GenreType },
  { id: 'romance', label: 'Romance', icon: '❤️', type: 'movie' as GenreType },
  { id: 'tragedy', label: 'Tragedy', icon: '💔', type: 'movie' as GenreType },
  
  // Comedy & Family
  { id: 'comedy', label: 'Comedy', icon: '😂', type: 'movie' as GenreType },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', type: 'movie' as GenreType },
  { id: 'cartoon', label: 'Cartoon', icon: '🎨', type: 'movie' as GenreType },
  { id: 'animation', label: 'Animation', icon: '🎬', type: 'movie' as GenreType },
  
  // International & Regional
  { id: 'korean', label: 'Korean', icon: '🇰🇷', type: 'movie' as GenreType },
  { id: 'chinese', label: 'Chinese', icon: '🇨🇳', type: 'movie' as GenreType },
  { id: 'japanese', label: 'Japanese', icon: '🇯🇵', type: 'movie' as GenreType },
  { id: 'indian', label: 'Indian', icon: '🇮🇳', type: 'movie' as GenreType },
  { id: 'nigerian', label: 'Nigerian', icon: '🇳🇬', type: 'movie' as GenreType },
  { id: 'african', label: 'African', icon: '🌍', type: 'movie' as GenreType },
  
  // Documentary & Reality
  { id: 'documentary', label: 'Documentary', icon: '📹', type: 'movie' as GenreType },
  { id: 'nature', label: 'Nature', icon: '🌿', type: 'movie' as GenreType },
  { id: 'history', label: 'History', icon: '📜', type: 'movie' as GenreType },
  
  // Western & Classic
  { id: 'western', label: 'Western', icon: '🤠', type: 'movie' as GenreType },
  { id: 'classic', label: 'Classic', icon: '🎞️', type: 'movie' as GenreType },
  { id: 'musical', label: 'Musical', icon: '🎵', type: 'movie' as GenreType },
] as const;

export const SERIES_GENRES = [
  { id: 'drama_series', label: 'Drama Series', icon: '🎭', type: 'series' as GenreType },
  { id: 'crime_drama', label: 'Crime Drama', icon: '🚔', type: 'series' as GenreType },
  { id: 'legal_drama', label: 'Legal Drama', icon: '⚖️', type: 'series' as GenreType },
  { id: 'medical_drama', label: 'Medical Drama', icon: '🏥', type: 'series' as GenreType },
  { id: 'sitcom', label: 'Sitcom', icon: '😂', type: 'series' as GenreType },
  { id: 'standup', label: 'Stand-up Comedy', icon: '🎤', type: 'series' as GenreType },
  { id: 'sketch', label: 'Sketch Comedy', icon: '🎭', type: 'series' as GenreType },
  { id: 'sci_fi_series', label: 'Sci-Fi Series', icon: '🚀', type: 'series' as GenreType },
  { id: 'fantasy_series', label: 'Fantasy Series', icon: '🧙', type: 'series' as GenreType },
  { id: 'supernatural', label: 'Supernatural', icon: '👻', type: 'series' as GenreType },
  { id: 'mystery', label: 'Mystery', icon: '🔍', type: 'series' as GenreType },
  { id: 'true_crime', label: 'True Crime', icon: '📋', type: 'series' as GenreType },
  { id: 'reality', label: 'Reality TV', icon: '📺', type: 'series' as GenreType },
  { id: 'competition', label: 'Competition', icon: '🏆', type: 'series' as GenreType },
  { id: 'animated_series', label: 'Animated Series', icon: '🎨', type: 'series' as GenreType },
  { id: 'anime', label: 'Anime', icon: '🇯🇵', type: 'series' as GenreType },
] as const;

export const MUSIC_GENRES = [
  // Gospel
  { id: 'gospel', label: 'Gospel', icon: '✝️', type: 'music' as GenreType },
  { id: 'worship', label: 'Worship', icon: '🙏', type: 'music' as GenreType },
  { id: 'praise', label: 'Praise', icon: '🎵', type: 'music' as GenreType },
  
  // Country
  { id: 'country', label: 'Country', icon: '🤠', type: 'music' as GenreType },
  { id: 'folk', label: 'Folk', icon: '🪕', type: 'music' as GenreType },
  { id: 'bluegrass', label: 'Bluegrass', icon: '🎻', type: 'music' as GenreType },
  
  // Afrobeat & African
  { id: 'afrobeat', label: 'Afrobeat', icon: '🥁', type: 'music' as GenreType },
  { id: 'afropop', label: 'Afropop', icon: '🎵', type: 'music' as GenreType },
  { id: 'bongo', label: 'Bongo Flava', icon: '🎶', type: 'music' as GenreType },
  { id: 'kadongo_kamu', label: 'Kadongo Kamu', icon: '🎸', type: 'music' as GenreType },
  { id: 'kidandali', label: 'Kidandali', icon: '🎹', type: 'music' as GenreType },
  
  // Reggae & Dancehall
  { id: 'reggae', label: 'Reggae', icon: '🇯🇲', type: 'music' as GenreType },
  { id: 'dancehall', label: 'Dancehall', icon: '💃', type: 'music' as GenreType },
  
  // Hip Hop & Rap
  { id: 'hip_hop', label: 'Hip Hop', icon: '🎤', type: 'music' as GenreType },
  { id: 'rap', label: 'Rap', icon: '🎙️', type: 'music' as GenreType },
  { id: 'trap', label: 'Trap', icon: '🔊', type: 'music' as GenreType },
  
  // R&B & Soul
  { id: 'r_and_b', label: 'R&B', icon: '🎵', type: 'music' as GenreType },
  { id: 'soul', label: 'Soul', icon: '🎶', type: 'music' as GenreType },
  { id: 'funk', label: 'Funk', icon: '🎸', type: 'music' as GenreType },
  
  // Rock & Alternative
  { id: 'rock', label: 'Rock', icon: '🎸', type: 'music' as GenreType },
  { id: 'alternative', label: 'Alternative', icon: '🎧', type: 'music' as GenreType },
  { id: 'indie', label: 'Indie', icon: '🎵', type: 'music' as GenreType },
  { id: 'metal', label: 'Metal', icon: '🤘', type: 'music' as GenreType },
  
  // Electronic & Dance
  { id: 'electronic', label: 'Electronic', icon: '🎛️', type: 'music' as GenreType },
  { id: 'dance', label: 'Dance', icon: '💃', type: 'music' as GenreType },
  { id: 'house', label: 'House', icon: '🏠', type: 'music' as GenreType },
  { id: 'techno', label: 'Techno', icon: '🎧', type: 'music' as GenreType },
  
  // Jazz & Classical
  { id: 'jazz', label: 'Jazz', icon: '🎷', type: 'music' as GenreType },
  { id: 'blues', label: 'Blues', icon: '🎸', type: 'music' as GenreType },
  { id: 'classical', label: 'Classical', icon: '🎻', type: 'music' as GenreType },
  { id: 'opera', label: 'Opera', icon: '🎭', type: 'music' as GenreType },
] as const;

export const ALL_GENRES = {
  movie: MOVIE_GENRES,
  series: SERIES_GENRES,
  music: MUSIC_GENRES,
} as const;