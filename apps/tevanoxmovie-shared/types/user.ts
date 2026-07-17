export interface User {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  is_agent: boolean;
  subscription_expiry: string | null;
  subscription_plan: 'weekly' | 'biweekly' | 'monthly' | null;
  wallet_balance: number;
  total_earnings: number;
  referral_earnings: number;
  device_type: 'web' | 'mobile' | 'agent' | null;
  device_name: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
  device_type?: 'web' | 'mobile' | 'agent';
  device_name?: string;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  profile_pic?: string;
  current_password?: string;
  new_password?: string;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  referral_code?: string;
  is_active: boolean;
  is_admin: boolean;
  is_agent: boolean;
  wallet_balance: number;
  total_earnings: number;
  device_type?: string;
  device_name?: string;
  subscription_expiry?: string;
  created_at: string;
}