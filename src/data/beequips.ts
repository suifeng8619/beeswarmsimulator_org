import { Beequip } from '@/types/database'

// Beequip data - equipment that can be attached to bees
// Source: Bee Swarm Simulator Wiki
// Last Updated: 2026-01-03
export const beequips: Beequip[] = [
  // ==================== REGULAR BEEQUIPS (22) ====================
  {
    id: '1',
    name: 'Thimble',
    slug: 'thimble',
    category: 'regular',
    image_url: '/images/beequips/thimble.png',
    base_value: 500,
    max_potential: 3,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Sweatband',
    slug: 'sweatband',
    category: 'regular',
    image_url: '/images/beequips/sweatband.png',
    base_value: 600,
    max_potential: 4,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Bandage',
    slug: 'bandage',
    category: 'regular',
    image_url: '/images/beequips/bandage.png',
    base_value: 400,
    max_potential: 3,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Thumbtack',
    slug: 'thumbtack',
    category: 'regular',
    image_url: '/images/beequips/thumbtack.png',
    base_value: 350,
    max_potential: 3,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Camo Bandana',
    slug: 'camo-bandana',
    category: 'regular',
    image_url: '/images/beequips/camo-bandana.png',
    base_value: 800,
    max_potential: 5,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '6',
    name: 'Bottle Cap',
    slug: 'bottle-cap',
    category: 'regular',
    image_url: '/images/beequips/bottle-cap.png',
    base_value: 450,
    max_potential: 4,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '7',
    name: 'Kazoo',
    slug: 'kazoo',
    category: 'regular',
    image_url: '/images/beequips/kazoo.png',
    base_value: 700,
    max_potential: 5,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '8',
    name: 'Smiley Sticker',
    slug: 'smiley-sticker',
    category: 'regular',
    image_url: '/images/beequips/smiley-sticker.png',
    base_value: 500,
    max_potential: 4,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '9',
    name: 'Whistle',
    slug: 'whistle',
    category: 'regular',
    image_url: '/images/beequips/whistle.png',
    base_value: 650,
    max_potential: 5,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '10',
    name: 'Charm Bracelet',
    slug: 'charm-bracelet',
    category: 'regular',
    image_url: '/images/beequips/charm-bracelet.png',
    base_value: 900,
    max_potential: 6,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '11',
    name: 'Paperclip',
    slug: 'paperclip',
    category: 'regular',
    image_url: '/images/beequips/paperclip.png',
    base_value: 300,
    max_potential: 3,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '12',
    name: 'Beret',
    slug: 'beret',
    category: 'regular',
    image_url: '/images/beequips/beret.png',
    base_value: 750,
    max_potential: 5,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '13',
    name: 'Bang Snap',
    slug: 'bang-snap',
    category: 'regular',
    image_url: '/images/beequips/bang-snap.png',
    base_value: 550,
    max_potential: 4,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '14',
    name: 'Bead Lizard',
    slug: 'bead-lizard',
    category: 'regular',
    image_url: '/images/beequips/bead-lizard.png',
    base_value: 600,
    max_potential: 5,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '15',
    name: 'Pink Shades',
    slug: 'pink-shades',
    category: 'regular',
    image_url: '/images/beequips/pink-shades.png',
    base_value: 850,
    max_potential: 6,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '16',
    name: 'Lei',
    slug: 'lei',
    category: 'regular',
    image_url: '/images/beequips/lei.png',
    base_value: 700,
    max_potential: 5,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '17',
    name: 'Demon Talisman',
    slug: 'demon-talisman',
    category: 'regular',
    image_url: '/images/beequips/demon-talisman.png',
    base_value: 5000,
    max_potential: 13,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '18',
    name: 'Camphor Lip Balm',
    slug: 'camphor-lip-balm',
    category: 'regular',
    image_url: '/images/beequips/camphor-lip-balm.png',
    base_value: 800,
    max_potential: 6,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '19',
    name: 'Autumn Sunhat',
    slug: 'autumn-sunhat',
    category: 'regular',
    image_url: '/images/beequips/autumn-sunhat.png',
    base_value: 950,
    max_potential: 7,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '20',
    name: 'Rose Headband',
    slug: 'rose-headband',
    category: 'regular',
    image_url: '/images/beequips/rose-headband.png',
    base_value: 1000,
    max_potential: 7,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '21',
    name: 'Pink Eraser',
    slug: 'pink-eraser',
    category: 'regular',
    image_url: '/images/beequips/pink-eraser.png',
    base_value: 400,
    max_potential: 3,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '22',
    name: 'Candy Ring',
    slug: 'candy-ring',
    category: 'regular',
    image_url: '/images/beequips/candy-ring.png',
    base_value: 650,
    max_potential: 5,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },

  // ==================== BEESMAS BEEQUIPS (19) ====================
  {
    id: '23',
    name: 'Elf Cap',
    slug: 'elf-cap',
    category: 'beesmas',
    image_url: '/images/beequips/elf-cap.png',
    base_value: 2000,
    max_potential: 7,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '24',
    name: 'Single Mitten',
    slug: 'single-mitten',
    category: 'beesmas',
    image_url: '/images/beequips/single-mitten.png',
    base_value: 1500,
    max_potential: 5,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '25',
    name: 'Warm Scarf',
    slug: 'warm-scarf',
    category: 'beesmas',
    image_url: '/images/beequips/warm-scarf.png',
    base_value: 1800,
    max_potential: 6,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '26',
    name: 'Peppermint Antennas',
    slug: 'peppermint-antennas',
    category: 'beesmas',
    image_url: '/images/beequips/peppermint-antennas.png',
    base_value: 2500,
    max_potential: 8,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '27',
    name: 'Beesmas Top',
    slug: 'beesmas-top',
    category: 'beesmas',
    image_url: '/images/beequips/beesmas-top.png',
    base_value: 2200,
    max_potential: 7,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '28',
    name: 'Pinecone',
    slug: 'pinecone',
    category: 'beesmas',
    image_url: '/images/beequips/pinecone.png',
    base_value: 1200,
    max_potential: 5,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '29',
    name: 'Icicles',
    slug: 'icicles',
    category: 'beesmas',
    image_url: '/images/beequips/icicles.png',
    base_value: 1600,
    max_potential: 6,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '30',
    name: 'Beesmas Tree Hat',
    slug: 'beesmas-tree-hat',
    category: 'beesmas',
    image_url: '/images/beequips/beesmas-tree-hat.png',
    base_value: 2800,
    max_potential: 8,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '31',
    name: 'Bubble Light',
    slug: 'bubble-light',
    category: 'beesmas',
    image_url: '/images/beequips/bubble-light.png',
    base_value: 1400,
    max_potential: 5,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '32',
    name: 'Snow Tiara',
    slug: 'snow-tiara',
    category: 'beesmas',
    image_url: '/images/beequips/snow-tiara.png',
    base_value: 4000,
    max_potential: 10,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '33',
    name: 'Snowglobe',
    slug: 'snowglobe',
    category: 'beesmas',
    image_url: '/images/beequips/snowglobe.png',
    base_value: 3500,
    max_potential: 9,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '34',
    name: 'Reindeer Antlers',
    slug: 'reindeer-antlers',
    category: 'beesmas',
    image_url: '/images/beequips/reindeer-antlers.png',
    base_value: 3000,
    max_potential: 8,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '35',
    name: 'Toy Horn',
    slug: 'toy-horn',
    category: 'beesmas',
    image_url: '/images/beequips/toy-horn.png',
    base_value: 1800,
    max_potential: 6,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '36',
    name: 'Paper Angel',
    slug: 'paper-angel',
    category: 'beesmas',
    image_url: '/images/beequips/paper-angel.png',
    base_value: 2000,
    max_potential: 7,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '37',
    name: 'Toy Drum',
    slug: 'toy-drum',
    category: 'beesmas',
    image_url: '/images/beequips/toy-drum.png',
    base_value: 1600,
    max_potential: 6,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '38',
    name: 'Lump Of Coal',
    slug: 'lump-of-coal',
    category: 'beesmas',
    image_url: '/images/beequips/lump-of-coal.png',
    base_value: 800,
    max_potential: 4,
    trend: 'down',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '39',
    name: 'Poinsettia',
    slug: 'poinsettia',
    category: 'beesmas',
    image_url: '/images/beequips/poinsettia.png',
    base_value: 2200,
    max_potential: 7,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '40',
    name: 'Electric Candle',
    slug: 'electric-candle',
    category: 'beesmas',
    image_url: '/images/beequips/electric-candle.png',
    base_value: 1900,
    max_potential: 6,
    trend: 'stable',
    updated_at: '2026-01-03T00:00:00.000Z'
  },
  {
    id: '41',
    name: 'Festive Wreath',
    slug: 'festive-wreath',
    category: 'beesmas',
    image_url: '/images/beequips/festive-wreath.png',
    base_value: 6000,
    max_potential: 10,
    trend: 'up',
    updated_at: '2026-01-03T00:00:00.000Z'
  }
]

// Beequip statistics
export const beequipStats = {
  total: beequips.length,
  regular: beequips.filter(b => b.category === 'regular').length,
  beesmas: beequips.filter(b => b.category === 'beesmas').length
}

// Category display names
export const beequipCategories = {
  regular: 'Regular',
  beesmas: 'Beesmas'
} as const

// Calculate potential value based on max potential
export function calculateBeequipValue(beequip: Beequip, potential: number): number {
  const multiplier = 1 + (potential - 1) * 0.5
  return Math.round(beequip.base_value * multiplier)
}

// Get beequips by category
export function getBeequipsByCategory(category: string): Beequip[] {
  return beequips.filter(b => b.category === category)
}

// Get trending beequips
export function getTrendingBeequips(): Beequip[] {
  return beequips.filter(b => b.trend !== 'stable').slice(0, 10)
}

// Get top value beequips
export function getTopValueBeequips(limit = 10): Beequip[] {
  return [...beequips].sort((a, b) => b.base_value - a.base_value).slice(0, limit)
}

// Search beequips
export function searchBeequips(query: string): Beequip[] {
  const lower = query.toLowerCase()
  return beequips.filter(b =>
    b.name.toLowerCase().includes(lower) ||
    b.category.toLowerCase().includes(lower)
  )
}

// Get beequip by slug
export function getBeequipBySlug(slug: string): Beequip | undefined {
  return beequips.find(b => b.slug === slug)
}

// Get beequip by id
export function getBeequipById(id: string): Beequip | undefined {
  return beequips.find(b => b.id === id)
}
