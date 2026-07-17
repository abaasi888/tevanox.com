// TEVANOXMOVIE - Profit Types

export interface Profit {
  id?: string;
  period_start: Date;
  period_end: Date;
  period_type: 'monthly' | 'quarterly' | 'annually';
  
  // Financial Metrics
  total_revenue: number;
  total_expenses: number;
  net_profit: number;
  profit_margin: number;
  
  // Distribution Breakdown
  reinvested_percent: number;
  dividends_percent: number;
  management_bonus_percent: number;
  reserves_percent: number;
  taxes_percent: number;
  
  // Distribution Amounts
  reinvested_amount: number;
  dividends_amount: number;
  management_bonus: number;
  reserves_amount: number;
  taxes_amount: number;
  
  // Status
  is_distributed: boolean;
  distribution_date?: Date;
  approved_by?: string;
  notes?: string;
  
  created_at: Date;
  updated_at?: Date;
}

export interface ProfitDistribution {
  total_profit: number;
  shareholder_count: number;
  total_shares: number;
  dividend_per_share: number;
  distributions: {
    shareholder_id: string;
    shares: number;
    amount: number;
    percentage: number;
  }[];
}
