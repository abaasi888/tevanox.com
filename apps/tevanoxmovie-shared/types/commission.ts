export interface CommissionRate {
  level: 1 | 2 | 3;
  rate: number;
  description: string;
}

export interface CommissionTier {
  tier: 1 | 2 | 3 | 4;
  minUsers: number;
  maxUsers: number;
  commissionRate: number;
  bonus: number;
  label: string;
}

export interface CommissionCalculation {
  agent_id: string;
  tier: number;
  active_referrals: number;
  commission_rate: number;
  commission_amount: number;
  bonus: number;
  base_salary: number;
  total_payout: number;
  month: string;
}

export interface CommissionHistory {
  id: string;
  agent_id: string;
  month: string;
  total_active_users: number;
  commission_amount: number;
  bonus_amount: number;
  total_paid: number;
  status: 'pending' | 'paid';
  created_at: string;
  paid_at?: string;
}