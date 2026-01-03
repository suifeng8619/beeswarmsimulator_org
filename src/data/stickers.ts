import { Sticker } from '@/types/database'

// Sample sticker data - in production this comes from Supabase
export const stickers: Sticker[] = [
  // Cub Skins (highest value tier)
  {
    id: '1',
    name: 'Gummy Cub Skin',
    slug: 'gummy-cub-skin',
    category: 'cub_skin',
    image_url: '/images/stickers/gummy-cub-skin.png',
    value: 38000,
    trend: 'stable',
    is_obtainable: false,
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Stick Bug Cub Skin',
    slug: 'stick-bug-cub-skin',
    category: 'cub_skin',
    image_url: '/images/stickers/stick-bug-cub-skin.png',
    value: 35000,
    trend: 'up',
    is_obtainable: false,
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Mondo Cub Skin',
    slug: 'mondo-cub-skin',
    category: 'cub_skin',
    image_url: '/images/stickers/mondo-cub-skin.png',
    value: 32000,
    trend: 'stable',
    is_obtainable: false,
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Festive Cub Skin',
    slug: 'festive-cub-skin',
    category: 'cub_skin',
    image_url: '/images/stickers/festive-cub-skin.png',
    value: 28000,
    trend: 'down',
    is_obtainable: false,
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Puppy Cub Skin',
    slug: 'puppy-cub-skin',
    category: 'cub_skin',
    image_url: '/images/stickers/puppy-cub-skin.png',
    value: 25000,
    trend: 'stable',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },

  // Hive Skins
  {
    id: '6',
    name: 'Gummy Hive Skin',
    slug: 'gummy-hive-skin',
    category: 'hive_skin',
    image_url: '/images/stickers/gummy-hive-skin.png',
    value: 15000,
    trend: 'stable',
    is_obtainable: false,
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Diamond Hive Skin',
    slug: 'diamond-hive-skin',
    category: 'hive_skin',
    image_url: '/images/stickers/diamond-hive-skin.png',
    value: 12000,
    trend: 'up',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Gold Hive Skin',
    slug: 'gold-hive-skin',
    category: 'hive_skin',
    image_url: '/images/stickers/gold-hive-skin.png',
    value: 8000,
    trend: 'stable',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Festive Hive Skin',
    slug: 'festive-hive-skin',
    category: 'hive_skin',
    image_url: '/images/stickers/festive-hive-skin.png',
    value: 10000,
    trend: 'down',
    is_obtainable: false,
    updated_at: new Date().toISOString()
  },

  // Star Signs
  {
    id: '10',
    name: 'Scorpion Star Sign',
    slug: 'scorpion-star-sign',
    category: 'star_sign',
    image_url: '/images/stickers/scorpion-star-sign.png',
    value: 5000,
    trend: 'stable',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Crab Star Sign',
    slug: 'crab-star-sign',
    category: 'star_sign',
    image_url: '/images/stickers/crab-star-sign.png',
    value: 4500,
    trend: 'up',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '12',
    name: 'Fish Star Sign',
    slug: 'fish-star-sign',
    category: 'star_sign',
    image_url: '/images/stickers/fish-star-sign.png',
    value: 4000,
    trend: 'stable',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },

  // Field Stamps
  {
    id: '13',
    name: 'Mushroom Field Stamp',
    slug: 'mushroom-field-stamp',
    category: 'field_stamp',
    image_url: '/images/stickers/mushroom-field-stamp.png',
    value: 2000,
    trend: 'stable',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '14',
    name: 'Sunflower Field Stamp',
    slug: 'sunflower-field-stamp',
    category: 'field_stamp',
    image_url: '/images/stickers/sunflower-field-stamp.png',
    value: 1800,
    trend: 'stable',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '15',
    name: 'Clover Field Stamp',
    slug: 'clover-field-stamp',
    category: 'field_stamp',
    image_url: '/images/stickers/clover-field-stamp.png',
    value: 1500,
    trend: 'down',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '16',
    name: 'Strawberry Field Stamp',
    slug: 'strawberry-field-stamp',
    category: 'field_stamp',
    image_url: '/images/stickers/strawberry-field-stamp.png',
    value: 1600,
    trend: 'stable',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '17',
    name: 'Pineapple Field Stamp',
    slug: 'pineapple-field-stamp',
    category: 'field_stamp',
    image_url: '/images/stickers/pineapple-field-stamp.png',
    value: 2200,
    trend: 'up',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },

  // Tools
  {
    id: '18',
    name: 'Gummy Boots Sticker',
    slug: 'gummy-boots-sticker',
    category: 'tool',
    image_url: '/images/stickers/gummy-boots-sticker.png',
    value: 6000,
    trend: 'stable',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '19',
    name: 'Coconut Canister Sticker',
    slug: 'coconut-canister-sticker',
    category: 'tool',
    image_url: '/images/stickers/coconut-canister-sticker.png',
    value: 5500,
    trend: 'stable',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '20',
    name: 'Tide Popper Sticker',
    slug: 'tide-popper-sticker',
    category: 'tool',
    image_url: '/images/stickers/tide-popper-sticker.png',
    value: 4800,
    trend: 'up',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },

  // Beesmas
  {
    id: '21',
    name: 'Snowflake Sticker',
    slug: 'snowflake-sticker',
    category: 'beesmas',
    image_url: '/images/stickers/snowflake-sticker.png',
    value: 3000,
    trend: 'down',
    is_obtainable: false,
    updated_at: new Date().toISOString()
  },
  {
    id: '22',
    name: 'Bee Bear Sticker',
    slug: 'bee-bear-sticker',
    category: 'beesmas',
    image_url: '/images/stickers/bee-bear-sticker.png',
    value: 8500,
    trend: 'stable',
    is_obtainable: false,
    updated_at: new Date().toISOString()
  },
  {
    id: '23',
    name: 'Gingerbread Sticker',
    slug: 'gingerbread-sticker',
    category: 'beesmas',
    image_url: '/images/stickers/gingerbread-sticker.png',
    value: 2500,
    trend: 'stable',
    is_obtainable: false,
    updated_at: new Date().toISOString()
  },

  // Other
  {
    id: '24',
    name: 'Basic Egg Sticker',
    slug: 'basic-egg-sticker',
    category: 'other',
    image_url: '/images/stickers/basic-egg-sticker.png',
    value: 375,
    trend: 'stable',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '25',
    name: 'Honey Sticker',
    slug: 'honey-sticker',
    category: 'other',
    image_url: '/images/stickers/honey-sticker.png',
    value: 500,
    trend: 'stable',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  },
  {
    id: '26',
    name: 'Royal Jelly Sticker',
    slug: 'royal-jelly-sticker',
    category: 'other',
    image_url: '/images/stickers/royal-jelly-sticker.png',
    value: 1200,
    trend: 'up',
    is_obtainable: true,
    updated_at: new Date().toISOString()
  }
]

// Category display names
export const stickerCategories = {
  cub_skin: 'Cub Skins',
  hive_skin: 'Hive Skins',
  star_sign: 'Star Signs',
  field_stamp: 'Field Stamps',
  tool: 'Tools',
  beesmas: 'Beesmas',
  other: 'Other'
} as const

// Get stickers by category
export function getStickersByCategory(category: string): Sticker[] {
  return stickers.filter(s => s.category === category)
}

// Get trending stickers
export function getTrendingStickers(): Sticker[] {
  return stickers.filter(s => s.trend !== 'stable').slice(0, 10)
}

// Get top value stickers
export function getTopValueStickers(limit = 10): Sticker[] {
  return [...stickers].sort((a, b) => b.value - a.value).slice(0, limit)
}

// Search stickers
export function searchStickers(query: string): Sticker[] {
  const lower = query.toLowerCase()
  return stickers.filter(s =>
    s.name.toLowerCase().includes(lower) ||
    s.category.toLowerCase().includes(lower)
  )
}
