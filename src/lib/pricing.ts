export type Tier = 'standard' | 'priority' | 'turbo';

const extras: Record<Tier, number> = {
  standard: 0,
  priority: 0.05,
  turbo: 0.15,
};

export function calculatePrice(pattern: string, tier: Tier): number {
  const base = pattern.length * 10;
  return base + extras[tier];
}
