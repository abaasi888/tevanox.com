export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  providers?: Array<{
    id: string;
    name: string;
    color?: string;
  }>;
}

export interface PaymentInitialize {
  amount: number;
  plan: string;
  payment_method: string;
  phone_number?: string;
  provider?: string;
  email?: string;
}

export interface PaymentResponse {
  success: boolean;
  reference?: string;
  authorization_url?: string;
  access_code?: string;
  error?: string;
}

export interface PaymentVerify {
  success: boolean;
  status?: string;
  amount?: number;
  reference?: string;
  metadata?: Record<string, any>;
  error?: string;
}

export interface PaymentHistory {
  id: string;
  amount: number;
  plan?: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method?: string;
  reference?: string;
  created_at: string;
}