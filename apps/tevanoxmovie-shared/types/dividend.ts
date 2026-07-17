// TEVANOXMOVIE - Dividend Types

export interface Dividend {
  id?: string;
  shareholder_id: string;
  amount: number;
  shares_held: number;
  dividend_per_share: number;
  
  // Period
  period_start: Date;
  period_end: Date;
  declaration_date: Date;
  payment_date?: Date;
  
  // Status
  status: 'pending' | 'approved' | 'paid' | 'reinvested';
  payment_method: string;
  transaction_id?: string;
  
  // Tax
  tax_deducted: number;
  net_amount: number;
  
  // Reinvestment
  reinvested: boolean;
  reinvested_shares: number;
  reinvested_date?: Date;
  
  created_at: Date;
  updated_at?: Date;
}

export interface DividendDeclaration {
  id?: string;
  total_dividend_pool: number;
  dividend_per_share: number;
  total_shares: number;
  declaration_date: Date;
  payment_date: Date;
  status: 'pending' | 'approved' | 'distributed';
  approved_by?: string;
  notes?: string;
  created_at: Date;
}

export interface DividendCalculation {
  shareholder_id: string;
  shares: number;
  dividend_per_share: number;
  gross_dividend: number;
  tax: number;
  net_dividend: number;
}
