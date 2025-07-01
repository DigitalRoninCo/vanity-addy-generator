export type Tier = 'basic' | 'standard' | 'premium';

const multipliers: Record<Tier, number> = {
  basic: 1,
  standard: 2,
  premium: 3,
};

export function calculatePrice(pattern: string, tier: Tier): number {
  const base = pattern.length * 10;
  return base * multipliers[tier];
}
