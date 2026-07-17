// TEVANOXMOVIE - Shareholder Types

export interface Shareholder {
  id?: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  address?: string;
  
  // Share Details
  total_shares: number;
  share_price: number;
  total_investment: number;
  shares_purchased: SharePurchase[];
  
  // Earnings Tracking
  total_dividends_earned: number;
  total_profit_share: number;
  unrealized_gain: number;
  realized_gain: number;
  
  // Current Value
  current_share_value: number;
  portfolio_value: number;
  roi: number;
  
  // Dividend Settings
  dividend_reinvestment: boolean;
  payment_method: 'bank_transfer' | 'mobile_money' | 'cheque';
  bank_details?: BankDetails;
  mobile_money?: MobileMoneyDetails;
  
  // Status
  is_active: boolean;
  is_verified: boolean;
  shareholder_type: 'individual' | 'corporate';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  
  // Timestamps
  joined_date: Date;
  last_dividend_paid?: Date;
  created_at: Date;
  updated_at?: Date;
  
  // Tax Information
  tin?: string;
  tax_residency: string;
}

export interface SharePurchase {
  date: Date;
  shares: number;
  price: number;
  total: number;
  source?: 'purchase' | 'dividend_reinvestment';
  transaction_id?: string;
}

export interface BankDetails {
  bank_name: string;
  account_name: string;
  account_number: string;
  branch: string;
  swift_code?: string;
}

export interface MobileMoneyDetails {
  provider: 'mtn' | 'airtel' | 'other';
  phone_number: string;
  account_name: string;
}

export interface ShareholderDashboard {
  shareholder: {
    id: string;
    full_name: string;
    email: string;
    total_shares: number;
    share_price: number;
    total_investment: number;
    portfolio_value: number;
    tier: string;
    roi: number;
  };
  dividends: {
    total_earned: number;
    pending: number;
    history: DividendHistory[];
    upcoming: UpcomingDividend[];
  };
  summary: {
    total_profit_share: number;
    unrealized_gain: number;
    realized_gain: number;
    next_dividend_date?: Date;
  };
}

export interface DividendHistory {
  id: string;
  amount: number;
  dividend_per_share: number;
  payment_date: Date;
  status: string;
}

export interface UpcomingDividend {
  id: string;
  amount: number;
  declaration_date: Date;
  payment_date: Date;
}
