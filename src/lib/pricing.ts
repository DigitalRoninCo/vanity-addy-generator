export type Tier = 'basic' | 'pro' | 'enterprise';

const tierMultiplier: Record<Tier, number> = {
  basic: 1,
  pro: 2,
  enterprise: 3
};

export function calculatePrice(pattern: string, tier: Tier): number {
  const len = pattern.length;
  const multiplier = tierMultiplier[tier] ?? 1;
  return len * multiplier;
}
