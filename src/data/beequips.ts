import { Beequip } from '@/types/database'

// Beequip data - equipment that can be attached to bees
export const beequips: Beequip[] = [
  // Regular Beequips
  {
    id: '1',
    name: 'Beekeeper\'s Boots',
    slug: 'beekeepers-boots',
    category: 'regular',
    image_url: '/images/beequips/beekeepers-boots.png',
    base_value: 500,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Bubble Wand',
    slug: 'bubble-wand',
    category: 'regular',
    image_url: '/images/beequips/bubble-wand.png',
    base_value: 800,
    max_potential: 5,
    trend: 'up',
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Charm Bracelet',
    slug: 'charm-bracelet',
    category: 'regular',
    image_url: '/images/beequips/charm-bracelet.png',
    base_value: 1200,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Electro Magnet',
    slug: 'electro-magnet',
    category: 'regular',
    image_url: '/images/beequips/electro-magnet.png',
    base_value: 1500,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Golden Scarf',
    slug: 'golden-scarf',
    category: 'regular',
    image_url: '/images/beequips/golden-scarf.png',
    base_value: 2000,
    max_potential: 5,
    trend: 'up',
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Honey Mask',
    slug: 'honey-mask',
    category: 'regular',
    image_url: '/images/beequips/honey-mask.png',
    base_value: 1800,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Pink Shades',
    slug: 'pink-shades',
    category: 'regular',
    image_url: '/images/beequips/pink-shades.png',
    base_value: 900,
    max_potential: 5,
    trend: 'down',
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Propeller Hat',
    slug: 'propeller-hat',
    category: 'regular',
    image_url: '/images/beequips/propeller-hat.png',
    base_value: 600,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Red Bandana',
    slug: 'red-bandana',
    category: 'regular',
    image_url: '/images/beequips/red-bandana.png',
    base_value: 700,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Silver Stinger',
    slug: 'silver-stinger',
    category: 'regular',
    image_url: '/images/beequips/silver-stinger.png',
    base_value: 2500,
    max_potential: 5,
    trend: 'up',
    updated_at: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Single Mitten',
    slug: 'single-mitten',
    category: 'regular',
    image_url: '/images/beequips/single-mitten.png',
    base_value: 550,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '12',
    name: 'Blue Scarf',
    slug: 'blue-scarf',
    category: 'regular',
    image_url: '/images/beequips/blue-scarf.png',
    base_value: 1100,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '13',
    name: 'Whistle',
    slug: 'whistle',
    category: 'regular',
    image_url: '/images/beequips/whistle.png',
    base_value: 1000,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '14',
    name: 'Lei',
    slug: 'lei',
    category: 'regular',
    image_url: '/images/beequips/lei.png',
    base_value: 850,
    max_potential: 5,
    trend: 'down',
    updated_at: new Date().toISOString()
  },
  {
    id: '15',
    name: 'Sweatband',
    slug: 'sweatband',
    category: 'regular',
    image_url: '/images/beequips/sweatband.png',
    base_value: 650,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '16',
    name: 'Kazoo',
    slug: 'kazoo',
    category: 'regular',
    image_url: '/images/beequips/kazoo.png',
    base_value: 750,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '17',
    name: 'Camo Bandana',
    slug: 'camo-bandana',
    category: 'regular',
    image_url: '/images/beequips/camo-bandana.png',
    base_value: 950,
    max_potential: 5,
    trend: 'up',
    updated_at: new Date().toISOString()
  },
  {
    id: '18',
    name: 'Super Stinger',
    slug: 'super-stinger',
    category: 'regular',
    image_url: '/images/beequips/super-stinger.png',
    base_value: 3000,
    max_potential: 5,
    trend: 'up',
    updated_at: new Date().toISOString()
  },
  {
    id: '19',
    name: 'Antenna',
    slug: 'antenna',
    category: 'regular',
    image_url: '/images/beequips/antenna.png',
    base_value: 1400,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '20',
    name: 'Bandage',
    slug: 'bandage',
    category: 'regular',
    image_url: '/images/beequips/bandage.png',
    base_value: 400,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '21',
    name: 'Thumbtack',
    slug: 'thumbtack',
    category: 'regular',
    image_url: '/images/beequips/thumbtack.png',
    base_value: 350,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },

  // Beesmas Beequips
  {
    id: '22',
    name: 'Beesmas Top',
    slug: 'beesmas-top',
    category: 'beesmas',
    image_url: '/images/beequips/beesmas-top.png',
    base_value: 4000,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '23',
    name: 'Festive Wreath',
    slug: 'festive-wreath',
    category: 'beesmas',
    image_url: '/images/beequips/festive-wreath.png',
    base_value: 5000,
    max_potential: 5,
    trend: 'up',
    updated_at: new Date().toISOString()
  },
  {
    id: '24',
    name: 'Paper Angel',
    slug: 'paper-angel',
    category: 'beesmas',
    image_url: '/images/beequips/paper-angel.png',
    base_value: 3500,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '25',
    name: 'Reindeer Antlers',
    slug: 'reindeer-antlers',
    category: 'beesmas',
    image_url: '/images/beequips/reindeer-antlers.png',
    base_value: 4500,
    max_potential: 5,
    trend: 'up',
    updated_at: new Date().toISOString()
  },
  {
    id: '26',
    name: 'Snow Tiara',
    slug: 'snow-tiara',
    category: 'beesmas',
    image_url: '/images/beequips/snow-tiara.png',
    base_value: 6000,
    max_potential: 5,
    trend: 'up',
    updated_at: new Date().toISOString()
  },
  {
    id: '27',
    name: 'Warm Scarf',
    slug: 'warm-scarf',
    category: 'beesmas',
    image_url: '/images/beequips/warm-scarf.png',
    base_value: 2800,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '28',
    name: 'Snowglobe',
    slug: 'snowglobe',
    category: 'beesmas',
    image_url: '/images/beequips/snowglobe.png',
    base_value: 5500,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '29',
    name: 'Elf Cap',
    slug: 'elf-cap',
    category: 'beesmas',
    image_url: '/images/beequips/elf-cap.png',
    base_value: 3200,
    max_potential: 5,
    trend: 'down',
    updated_at: new Date().toISOString()
  },
  {
    id: '30',
    name: 'Toy Drum',
    slug: 'toy-drum',
    category: 'beesmas',
    image_url: '/images/beequips/toy-drum.png',
    base_value: 2500,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '31',
    name: 'Toy Horn',
    slug: 'toy-horn',
    category: 'beesmas',
    image_url: '/images/beequips/toy-horn.png',
    base_value: 2200,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '32',
    name: 'Gingerbread Tie',
    slug: 'gingerbread-tie',
    category: 'beesmas',
    image_url: '/images/beequips/gingerbread-tie.png',
    base_value: 3800,
    max_potential: 5,
    trend: 'up',
    updated_at: new Date().toISOString()
  },
  {
    id: '33',
    name: 'Candy Cane',
    slug: 'candy-cane',
    category: 'beesmas',
    image_url: '/images/beequips/candy-cane.png',
    base_value: 1800,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '34',
    name: 'Ornament',
    slug: 'ornament',
    category: 'beesmas',
    image_url: '/images/beequips/ornament.png',
    base_value: 2000,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '35',
    name: 'Mittens',
    slug: 'mittens',
    category: 'beesmas',
    image_url: '/images/beequips/mittens.png',
    base_value: 1500,
    max_potential: 5,
    trend: 'down',
    updated_at: new Date().toISOString()
  },
  {
    id: '36',
    name: 'Peppermint Antennas',
    slug: 'peppermint-antennas',
    category: 'beesmas',
    image_url: '/images/beequips/peppermint-antennas.png',
    base_value: 4200,
    max_potential: 5,
    trend: 'up',
    updated_at: new Date().toISOString()
  },
  {
    id: '37',
    name: 'Snowflake Sticker',
    slug: 'snowflake-sticker-beequip',
    category: 'beesmas',
    image_url: '/images/beequips/snowflake-sticker.png',
    base_value: 1200,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '38',
    name: 'Holly',
    slug: 'holly',
    category: 'beesmas',
    image_url: '/images/beequips/holly.png',
    base_value: 1600,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '39',
    name: 'Bell',
    slug: 'bell',
    category: 'beesmas',
    image_url: '/images/beequips/bell.png',
    base_value: 1400,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  },
  {
    id: '40',
    name: 'Snowman Head',
    slug: 'snowman-head',
    category: 'beesmas',
    image_url: '/images/beequips/snowman-head.png',
    base_value: 2600,
    max_potential: 5,
    trend: 'stable',
    updated_at: new Date().toISOString()
  }
]

// Category display names
export const beequipCategories = {
  regular: 'Regular',
  beesmas: 'Beesmas'
} as const

// Calculate potential value based on max potential
export function calculateBeequipValue(beequip: Beequip, potential: number): number {
  const multiplier = 1 + (potential - 1) * 0.5 // Each potential level adds 50%
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
