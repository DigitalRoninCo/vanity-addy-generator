import { calculatePrice } from '../src/lib/pricing';

describe('calculatePrice', () => {
  it('calculates price based on pattern length and tier', () => {
    expect(calculatePrice('abc', 'basic')).toBe(3);
    expect(calculatePrice('abc', 'pro')).toBe(6);
    expect(calculatePrice('abc', 'enterprise')).toBe(9);
  });
});
