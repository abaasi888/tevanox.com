import { SubscriptionPlan } from '../types/subscription';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'weekly',
    name: 'Weekly',
    price: 7000,
    duration: 7,
    features: ['Unlimited Movies', 'Unlimited Music', 'Download for Offline'],
  },
  {
    id: 'biweekly',
    name: 'Bi-Weekly',
    price: 12000,
    duration: 14,
    features: ['Unlimited Movies', 'Unlimited Music', 'Download for Offline', 'Ad-free'],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: 20000,
    duration: 30,
    features: [
      'Unlimited Movies',
      'Unlimited Music',
      'Download for Offline',
      'Ad-free',
      'Exclusive Content',
    ],
    popular: true,
  },
] as const;