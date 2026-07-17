export interface Agent {
  id: string;
  user_id: string;
  username: string;
  email: string;
  full_name: string;
  phone: string;
  agent_code: string;
  upline_id?: string;
  total_referrals: number;
  active_referrals: number;
  tier: 1 | 2 | 3 | 4;
  commission_rate: number;
  wallet_balance: number;
  total_earnings: number;
  is_active: boolean;
  joined_date: string;
  subscription_required: boolean;
}

export interface AgentCreate {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone: string;
  referral_code?: string;
}

export interface AgentLogin {
  email: string;
  password: string;
  device_type?: 'web' | 'mobile' | 'agent';
  device_name?: string;
}

export interface AgentUpdate {
  full_name?: string;
  phone?: string;
  tier?: number;
  commission_rate?: number;
  is_active?: boolean;
}

export interface AgentResponse extends Agent {}

export interface AgentDashboard {
  agent: {
    id: string;
    full_name: string;
    agent_code: string;
    tier: number;
    wallet_balance: number;
    total_earnings: number;
  };
  stats: {
    total_referrals: number;
    active_referrals: number;
    commission_rate: number;
    tier_progress: number;
    users_needed: number;
  };
  recent_activity: Array<{
    id: string;
    description: string;
    type: string;
    date: string;
  }>;
  earnings: Array<{
    month: string;
    amount: number;
  }>;
}

export interface AgentEligibility {
  eligible: boolean;
  reason?: string;
  required?: string;
  has_subscription?: boolean;
  subscription?: {
    id: string;
    plan: string;
    end_date: string;
    days_remaining: number;
  };
}