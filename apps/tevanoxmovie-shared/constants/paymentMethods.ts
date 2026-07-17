import { PaymentMethod } from '../types/payment';

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'mobile_money',
    name: 'Mobile Money',
    icon: 'phone-android',
    providers: [
      { id: 'mtn', name: 'MTN Mobile Money', color: '#FFD700' },
      { id: 'airtel', name: 'Airtel Money', color: '#FF0000' },
      { id: 'africell', name: 'Africell Money', color: '#00FF00' },
    ],
  },
  {
    id: 'visa',
    name: 'Visa / Credit Card',
    icon: 'credit-card',
    providers: [
      { id: 'visa', name: 'Visa' },
      { id: 'mastercard', name: 'Mastercard' },
      { id: 'amex', name: 'American Express' },
    ],
  },
] as const;

export const MOBILE_MONEY_PROVIDERS = {
  MTN: 'mtn',
  AIRTEL: 'airtel',
  AFRICELL: 'africell',
} as const;