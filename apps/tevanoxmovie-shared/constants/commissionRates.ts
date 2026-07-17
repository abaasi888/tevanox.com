import { CommissionTier } from '../types/commission';

export const COMMISSION_RATES = {
  TEVANOX_SHARE: 0.60,
  NETWORK_TOTAL: 0.40,
  LEVEL_1: 0.25,
  LEVEL_2: 0.10,
  LEVEL_3: 0.05,
} as const;

export const AGENT_TIERS: CommissionTier[] = [
  {
    tier: 1,
    minUsers: 0,
    maxUsers: 100,
    commissionRate: 0.15,
    bonus: 0,
    label: 'Tier 1 (0-100 users)',
  },
  {
    tier: 2,
    minUsers: 101,
    maxUsers: 500,
    commissionRate: 0.12,
    bonus: 50000,
    label: 'Tier 2 (101-500 users)',
  },
  {
    tier: 3,
    minUsers: 501,
    maxUsers: 999,
    commissionRate: 0.10,
    bonus: 100000,
    label: 'Tier 3 (501-999 users)',
  },
  {
    tier: 4,
    minUsers: 1000,
    maxUsers: Infinity,
    commissionRate: 0.08,
    bonus: 200000,
    label: 'Tier 4 (1000+ users)',
  },
] as const;

export const getAgentTier = (activeUsers: number): CommissionTier => {
  return AGENT_TIERS.find(
    (tier) => activeUsers >= tier.minUsers && activeUsers <= tier.maxUsers
  ) || AGENT_TIERS[0];
};