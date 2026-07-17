export interface SubscriptionPlan {
  id: 'weekly' | 'biweekly' | 'monthly';
  name: string;
  price: number;
  duration: number;
  features: string[];
  popular?: boolean;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'weekly' | 'biweekly' | 'monthly';
  amount: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  payment_method?: string;
  transaction_id?: string;
  created_at: string;
}

export interface SubscriptionCreate {
  plan: 'weekly' | 'biweekly' | 'monthly';
  payment_method: string;
  transaction_id?: string;
}

export interface SubscriptionStatus {
  is_active: boolean;
  plan?: string;
  start_date?: string;
  end_date?: string;
  days_remaining?: number;
  amount?: number;
}

export interface SubscriptionHistory extends Subscription {}