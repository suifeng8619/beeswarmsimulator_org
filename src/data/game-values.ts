/**
 * Game Values and Trading Constants
 * Base values for common items used in value comparisons
 */

// Base item values for trading calculations
export const ITEM_VALUES = {
  BASIC_EGG: 375,
  ROYAL_JELLY: 1200,
  SILVER_EGG: 1500,
  GOLD_EGG: 3000,
  DIAMOND_EGG: 6000,
  STAR_JELLY: 5000,
  MYTHIC_EGG: 100000,
  // Voucher prices (honey value)
  BEAR_BEE_VOUCHER: 800,
  CUB_BUDDY_VOUCHER: 600,
} as const

// Helper function to calculate value comparisons
export function calculateValueComparison(value: number) {
  return {
    basicEggs: Math.round(value / ITEM_VALUES.BASIC_EGG),
    royalJellies: Math.round(value / ITEM_VALUES.ROYAL_JELLY),
    silverEggs: Math.round(value / ITEM_VALUES.SILVER_EGG),
    goldEggs: Math.round(value / ITEM_VALUES.GOLD_EGG),
    diamondEggs: Math.round(value / ITEM_VALUES.DIAMOND_EGG),
    starJellies: Math.round(value / ITEM_VALUES.STAR_JELLY),
    mythicEggs: Math.round(value / ITEM_VALUES.MYTHIC_EGG),
  }
}

// Common comparison items for display
export const VALUE_COMPARISON_ITEMS = [
  { key: 'basicEggs', label: 'Basic Eggs', value: ITEM_VALUES.BASIC_EGG },
  { key: 'royalJellies', label: 'Royal Jellies', value: ITEM_VALUES.ROYAL_JELLY },
] as const
