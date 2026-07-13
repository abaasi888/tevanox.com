# 🗄️ Database Schema

## Collections

### Users

{
  _id: ObjectId,
  username: string,
  email: string,
  password: string,
  is_active: boolean,
  is_admin: boolean,
  is_agent: boolean,
  subscription_expiry: Date,
  subscription_plan: string,
  wallet_balance: number,
  current_session_id: ObjectId,
  device_type: string,
  device_name: string,
  created_at: Date,
  updated_at: Date
}

Movies

{
  _id: ObjectId,
  title: string,
  original_title: string,
  description: string,
  category_id: ObjectId,
  category_name: string,
  vj_id: ObjectId,
  vj_name: string,
  genre_ids: [ObjectId],
  genre_names: [string],
  release_year: number,
  duration: number,
  language: string,
  country: string,
  poster_url: string,
  cover_url: string,
  file_path: string,
  trailer_url: string,
  director: string,
  cast: [string],
  total_views: number,
  total_downloads: number,
  average_rating: number,
  is_active: boolean,
  is_featured: boolean,
  created_at: Date,
  updated_at: Date
}

Series

{
  _id: ObjectId,
  title: string,
  original_title: string,
  description: string,
  category_id: ObjectId,
  category_name: string,
  vj_id: ObjectId,
  vj_name: string,
  genre_ids: [ObjectId],
  genre_names: [string],
  release_year: number,
  seasons: number,
  episodes_count: number,
  language: string,
  country: string,
  poster_url: string,
  cover_url: string,
  director: string,
  cast: [string],
  total_views: number,
  average_rating: number,
  is_active: boolean,
  is_featured: boolean,
  created_at: Date,
  updated_at: Date
}
Episodes

{
  _id: ObjectId,
  series_id: ObjectId,
  title: string,
  episode_number: number,
  season: number,
  duration: number,
  thumbnail_url: string,
  video_url: string,
  description: string,
  release_date: Date,
  total_views: number,
  is_active: boolean,
  created_at: Date
}
Music

{
  _id: ObjectId,
  title: string,
  artist: string,
  musician_id: ObjectId,
  musician_name: string,
  category_id: ObjectId,
  category_name: string,
  genre_ids: [ObjectId],
  genre_names: [string],
  album: string,
  release_year: number,
  duration: number,
  language: string,
  country: string,
  cover_art: string,
  audio_url: string,
  video_url: string,
  lyrics: string,
  producer: string,
  record_label: string,
  total_plays: number,
  total_downloads: number,
  is_active: boolean,
  is_featured: boolean,
  created_at: Date,
  updated_at: Date
}
Agents

{
  _id: ObjectId,
  user_id: ObjectId,
  username: string,
  email: string,
  password: string,
  full_name: string,
  phone: string,
  agent_code: string,
  upline_id: ObjectId,
  total_referrals: number,
  active_referrals: number,
  tier: number,
  commission_rate: number,
  wallet_balance: number,
  total_earnings: number,
  is_active: boolean,
  joined_date: Date,
  subscription_required: boolean
}
Sessions

{
  _id: ObjectId,
  user_id: ObjectId,
  token: string,
  device_type: string,
  device_name: string,
  device_id: string,
  ip_address: string,
  user_agent: string,
  is_active: boolean,
  created_at: Date,
  expires_at: Date,
  last_activity: Date,
  ended_at: Date,
  end_reason: string
}
Subscriptions

{
  _id: ObjectId,
  user_id: ObjectId,
  plan: string,
  amount: number,
  start_date: Date,
  end_date: Date,
  is_active: boolean,
  payment_method: string,
  transaction_id: string,
  created_at: Date
}

Categories

{
  _id: ObjectId,
  name: string,
  slug: string,
  type: string,
  parent_id: ObjectId,
  icon: string,
  color: string,
  description: string,
  display_order: number,
  is_active: boolean,
  is_deletable: boolean,
  created_by: ObjectId,
  created_at: Date,
  updated_at: Date
}

Genres
{
  _id: ObjectId,
  name: string,
  slug: string,
  type: string,
  icon: string,
  color: string,
  description: string,
  display_order: number,
  is_active: boolean,
  is_deletable: boolean,
  created_by: ObjectId,
  created_at: Date,
  updated_at: Date
}
VJs

{
  _id: ObjectId,
  name: string,
  code: string,
  language: string,
  description: string,
  is_active: boolean,
  is_deletable: boolean,
  created_by: ObjectId,
  created_at: Date,
  updated_at: Date
}
Musicians

{
  _id: ObjectId,
  name: string,
  real_name: string,
  country: string,
  genre_ids: [ObjectId],
  description: string,
  is_active: boolean,
  is_deletable: boolean,
  created_by: ObjectId,
  created_at: Date,
  updated_at: Date
}