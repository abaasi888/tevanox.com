export interface AgentRank {
  id: string;
  name: string;
  level: number;
  min_referrals: number;
  max_referrals: number;
  commission_rate: number;
  level_2_rate: number;
  level_3_rate: number;
  override_rate: number;
  one_time_bonus: number;
  monthly_bonus: number;
  rank_color: string;
  rank_icon: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface RankProgress {
  current_rank: number;
  next_rank?: {
    level: number;
    name: string;
    referrals_needed: number;
    total_needed: number;
  };
  progress_percentage: number;
  is_max_rank: boolean;
}

export interface AgentIncentive {
  id: string;
  name: string;
  rank_level: number;
  description: string;
  value: number;
  category: 'vehicle' | 'house' | 'travel' | 'recognition';
  requirements: {
    referrals?: number;
    team_size?: number;
    rank_level?: number;
  };
  is_active: boolean;
  delivered: boolean;
  delivered_date?: string;
}

export interface AgentAchievement {
  id: string;
  agent_id: string;
  achievement_type: 'rank_reached' | 'incentive_earned' | 'milestone';
  rank_level?: number;
  incentive_id?: string;
  description: string;
  achieved_date: string;
  is_celebrated: boolean;
}