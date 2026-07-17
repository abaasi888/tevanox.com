// TEVANOXMOVIE - Shareholder Rights & Constants

export const SHAREHOLDER_CONSTANTS = {
  SHARE_PRICE: 15000, // UGX per share
  MIN_SHARES_PURCHASE: 1,
  MAX_SHARES_PURCHASE: 10000,
  
  // Tier thresholds
  TIERS: {
    BRONZE: { min: 0, max: 1999, label: 'Bronze' },
    SILVER: { min: 2000, max: 3999, label: 'Silver' },
    GOLD: { min: 4000, max: 5999, label: 'Gold' },
    PLATINUM: { min: 6000, max: Infinity, label: 'Platinum' },
  },
  
  // Dividend settings
  DIVIDEND: {
    TAX_RATE: 0.15, // 15% withholding tax
    DEFAULT_REINVESTMENT: false,
    DEFAULT_PAYMENT_METHOD: 'bank_transfer',
  },
  
  // Profit distribution percentages
  PROFIT_DISTRIBUTION: {
    REINVESTED: 0.60, // 60%
    DIVIDENDS: 0.15, // 15%
    MANAGEMENT_BONUS: 0.10, // 10%
    RESERVES: 0.10, // 10%
    TAXES: 0.05, // 5%
  },
  
  // Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    APPROVED: 'approved',
    PAID: 'paid',
    REINVESTED: 'reinvested',
    DECLINED: 'declined',
  },
} as const;

export const SHAREHOLDER_TIERS = {
  BRONZE: {
    label: 'Bronze',
    minShares: 0,
    maxShares: 1999,
    color: '#CD7F32',
    benefits: ['Basic voting rights', 'Annual dividend payments'],
  },
  SILVER: {
    label: 'Silver',
    minShares: 2000,
    maxShares: 3999,
    color: '#C0C0C0',
    benefits: ['Priority dividend payments', 'Quarterly reports', 'Voting rights'],
  },
  GOLD: {
    label: 'Gold',
    minShares: 4000,
    maxShares: 5999,
    color: '#FFD700',
    benefits: ['Premium support', 'Monthly reports', 'Board meeting access', 'Priority voting'],
  },
  PLATINUM: {
    label: 'Platinum',
    minShares: 6000,
    maxShares: Infinity,
    color: '#E5E4E2',
    benefits: ['All Gold benefits', 'Executive briefings', 'Strategic input', 'Special dividends'],
  },
} as const;

export const PAYMENT_METHODS = {
  BANK_TRANSFER: 'bank_transfer',
  MOBILE_MONEY: 'mobile_money',
  CHEQUE: 'cheque',
} as const;

export const SHAREHOLDER_TYPES = {
  INDIVIDUAL: 'individual',
  CORPORATE: 'corporate',
} as const;

export type ShareholderTier = keyof typeof SHAREHOLDER_TIERS;
export type PaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];
export type ShareholderType = typeof SHAREHOLDER_TYPES[keyof typeof SHAREHOLDER_TYPES];
