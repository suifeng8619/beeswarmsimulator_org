import { Bee } from '@/types/database'

// All 46 bees in Bee Swarm Simulator
export const bees: Bee[] = [
  // Common (1)
  {
    id: '1',
    name: 'Basic Bee',
    slug: 'basic-bee',
    rarity: 'common',
    color: 'colorless',
    image_url: '/images/bees/basic-bee.png',
    description: 'The most basic bee. A good all-rounder that can help with any task.',
    abilities: ['Gather Pollen', 'Make Honey']
  },

  // Rare (9)
  {
    id: '2',
    name: 'Bomber Bee',
    slug: 'bomber-bee',
    rarity: 'rare',
    color: 'red',
    image_url: '/images/bees/bomber-bee.png',
    description: 'A bee that specializes in bombs that can collect pollen from a large area.',
    abilities: ['Bomb', 'Red Bomb']
  },
  {
    id: '3',
    name: 'Brave Bee',
    slug: 'brave-bee',
    rarity: 'rare',
    color: 'red',
    image_url: '/images/bees/brave-bee.png',
    description: 'A courageous bee that fights monsters with extra power.',
    abilities: ['Boost', 'Token Link']
  },
  {
    id: '4',
    name: 'Bumble Bee',
    slug: 'bumble-bee',
    rarity: 'rare',
    color: 'blue',
    image_url: '/images/bees/bumble-bee.png',
    description: 'A fluffy bee that produces blue boost tokens.',
    abilities: ['Boost', 'Blue Boost']
  },
  {
    id: '5',
    name: 'Cool Bee',
    slug: 'cool-bee',
    rarity: 'rare',
    color: 'blue',
    image_url: '/images/bees/cool-bee.png',
    description: 'A chill bee with shades that creates blue bombs.',
    abilities: ['Bomb', 'Blue Bomb']
  },
  {
    id: '6',
    name: 'Hasty Bee',
    slug: 'hasty-bee',
    rarity: 'rare',
    color: 'colorless',
    image_url: '/images/bees/hasty-bee.png',
    description: 'One of the fastest bees. Creates haste tokens.',
    abilities: ['Haste', 'Haste+']
  },
  {
    id: '7',
    name: 'Looker Bee',
    slug: 'looker-bee',
    rarity: 'rare',
    color: 'colorless',
    image_url: '/images/bees/looker-bee.png',
    description: 'A bee with excellent vision that helps find tokens.',
    abilities: ['Token Link', 'Focus']
  },
  {
    id: '8',
    name: 'Rad Bee',
    slug: 'rad-bee',
    rarity: 'rare',
    color: 'red',
    image_url: '/images/bees/rad-bee.png',
    description: 'A totally rad bee that boosts red pollen collection.',
    abilities: ['Boost', 'Red Boost']
  },
  {
    id: '9',
    name: 'Rascal Bee',
    slug: 'rascal-bee',
    rarity: 'rare',
    color: 'colorless',
    image_url: '/images/bees/rascal-bee.png',
    description: 'A mischievous bee that creates honey tokens.',
    abilities: ['Honey Gift', 'Token Link']
  },
  {
    id: '10',
    name: 'Stubborn Bee',
    slug: 'stubborn-bee',
    rarity: 'rare',
    color: 'colorless',
    image_url: '/images/bees/stubborn-bee.png',
    description: 'A persistent bee that gathers extra pollen.',
    abilities: ['Gather Pollen', 'Token Link']
  },

  // Epic (11)
  {
    id: '11',
    name: 'Bubble Bee',
    slug: 'bubble-bee',
    rarity: 'epic',
    color: 'blue',
    image_url: '/images/bees/bubble-bee.png',
    description: 'A bubbly bee that creates bubbles to collect pollen.',
    abilities: ['Bubble Bombs', 'Blue Bomb']
  },
  {
    id: '12',
    name: 'Bucko Bee',
    slug: 'bucko-bee',
    rarity: 'epic',
    color: 'blue',
    image_url: '/images/bees/bucko-bee.png',
    description: 'The leader of blue bees. Gives powerful blue buffs.',
    abilities: ['Blue Boost', 'Blue Bomb+']
  },
  {
    id: '13',
    name: 'Commander Bee',
    slug: 'commander-bee',
    rarity: 'epic',
    color: 'colorless',
    image_url: '/images/bees/commander-bee.png',
    description: 'Commands other bees to work harder.',
    abilities: ['Focus', 'Melody']
  },
  {
    id: '14',
    name: 'Demo Bee',
    slug: 'demo-bee',
    rarity: 'epic',
    color: 'red',
    image_url: '/images/bees/demo-bee.png',
    description: 'An explosive bee that loves demolition.',
    abilities: ['Bomb+', 'Red Bomb+']
  },
  {
    id: '15',
    name: 'Exhausted Bee',
    slug: 'exhausted-bee',
    rarity: 'epic',
    color: 'colorless',
    image_url: '/images/bees/exhausted-bee.png',
    description: 'A tired bee that somehow still works hard.',
    abilities: ['Token Link', 'Gather Pollen']
  },
  {
    id: '16',
    name: 'Fire Bee',
    slug: 'fire-bee',
    rarity: 'epic',
    color: 'red',
    image_url: '/images/bees/fire-bee.png',
    description: 'A hot-tempered bee that creates flames.',
    abilities: ['Flame', 'Red Boost+']
  },
  {
    id: '17',
    name: 'Frosty Bee',
    slug: 'frosty-bee',
    rarity: 'epic',
    color: 'blue',
    image_url: '/images/bees/frosty-bee.png',
    description: 'An icy bee that freezes pollen in place.',
    abilities: ['Freeze', 'Blue Boost+']
  },
  {
    id: '18',
    name: 'Honey Bee',
    slug: 'honey-bee',
    rarity: 'epic',
    color: 'colorless',
    image_url: '/images/bees/honey-bee.png',
    description: 'Produces bonus honey from all sources.',
    abilities: ['Honey Gift', 'Honey Mark']
  },
  {
    id: '19',
    name: 'Rage Bee',
    slug: 'rage-bee',
    rarity: 'epic',
    color: 'red',
    image_url: '/images/bees/rage-bee.png',
    description: 'An angry bee that builds up rage for power.',
    abilities: ['Rage', 'Token Link']
  },
  {
    id: '20',
    name: 'Riley Bee',
    slug: 'riley-bee',
    rarity: 'epic',
    color: 'red',
    image_url: '/images/bees/riley-bee.png',
    description: 'The leader of red bees. Gives powerful red buffs.',
    abilities: ['Red Boost', 'Red Bomb+']
  },
  {
    id: '21',
    name: 'Shocked Bee',
    slug: 'shocked-bee',
    rarity: 'epic',
    color: 'colorless',
    image_url: '/images/bees/shocked-bee.png',
    description: 'An electric bee that creates shocking bursts.',
    abilities: ['Shock', 'Token Link']
  },

  // Legendary (8)
  {
    id: '22',
    name: 'Baby Bee',
    slug: 'baby-bee',
    rarity: 'legendary',
    color: 'colorless',
    image_url: '/images/bees/baby-bee.png',
    description: 'An adorable baby bee that loves everyone.',
    abilities: ['Baby Love', 'Token Link']
  },
  {
    id: '23',
    name: 'Carpenter Bee',
    slug: 'carpenter-bee',
    rarity: 'legendary',
    color: 'colorless',
    image_url: '/images/bees/carpenter-bee.png',
    description: 'A skilled bee that builds and constructs.',
    abilities: ['Mark', 'Token Link']
  },
  {
    id: '24',
    name: 'Demon Bee',
    slug: 'demon-bee',
    rarity: 'legendary',
    color: 'red',
    image_url: '/images/bees/demon-bee.png',
    description: 'A dark bee with powerful abilities.',
    abilities: ['Flame', 'Dark Flame']
  },
  {
    id: '25',
    name: 'Diamond Bee',
    slug: 'diamond-bee',
    rarity: 'legendary',
    color: 'blue',
    image_url: '/images/bees/diamond-bee.png',
    description: 'A precious bee made of pure diamond.',
    abilities: ['Freeze', 'Diamond Drain']
  },
  {
    id: '26',
    name: 'Lion Bee',
    slug: 'lion-bee',
    rarity: 'legendary',
    color: 'red',
    image_url: '/images/bees/lion-bee.png',
    description: 'A fierce bee with a mighty roar.',
    abilities: ['Rage', 'Token Link']
  },
  {
    id: '27',
    name: 'Music Bee',
    slug: 'music-bee',
    rarity: 'legendary',
    color: 'colorless',
    image_url: '/images/bees/music-bee.png',
    description: 'A melodic bee that plays sweet tunes.',
    abilities: ['Melody', 'Focus']
  },
  {
    id: '28',
    name: 'Ninja Bee',
    slug: 'ninja-bee',
    rarity: 'legendary',
    color: 'blue',
    image_url: '/images/bees/ninja-bee.png',
    description: 'A stealthy bee that moves like a shadow.',
    abilities: ['Haste+', 'Token Link']
  },
  {
    id: '29',
    name: 'Shy Bee',
    slug: 'shy-bee',
    rarity: 'legendary',
    color: 'colorless',
    image_url: '/images/bees/shy-bee.png',
    description: 'A timid but powerful bee.',
    abilities: ['Boost', 'Token Link']
  },

  // Mythic (6)
  {
    id: '30',
    name: 'Buoyant Bee',
    slug: 'buoyant-bee',
    rarity: 'mythic',
    color: 'colorless',
    image_url: '/images/bees/buoyant-bee.png',
    description: 'A floaty bee that lifts pollen into the air.',
    abilities: ['Balloon Blessing', 'Inspire']
  },
  {
    id: '31',
    name: 'Fuzzy Bee',
    slug: 'fuzzy-bee',
    rarity: 'mythic',
    color: 'colorless',
    image_url: '/images/bees/fuzzy-bee.png',
    description: 'The fuzziest bee with powerful fuzz bombs.',
    abilities: ['Fuzz Bombs', 'Pollen Haze']
  },
  {
    id: '32',
    name: 'Precise Bee',
    slug: 'precise-bee',
    rarity: 'mythic',
    color: 'colorless',
    image_url: '/images/bees/precise-bee.png',
    description: 'An accurate bee that never misses.',
    abilities: ['Target Practice', 'Super Focus']
  },
  {
    id: '33',
    name: 'Spicy Bee',
    slug: 'spicy-bee',
    rarity: 'mythic',
    color: 'red',
    image_url: '/images/bees/spicy-bee.png',
    description: 'A hot bee that heats up the competition.',
    abilities: ['Inferno', 'Flame Fuel']
  },
  {
    id: '34',
    name: 'Tadpole Bee',
    slug: 'tadpole-bee',
    rarity: 'mythic',
    color: 'blue',
    image_url: '/images/bees/tadpole-bee.png',
    description: 'A watery bee that commands frogs.',
    abilities: ['Frog Call', 'Bubble Bloat']
  },
  {
    id: '35',
    name: 'Vector Bee',
    slug: 'vector-bee',
    rarity: 'mythic',
    color: 'colorless',
    image_url: '/images/bees/vector-bee.png',
    description: 'A mathematical bee that calculates everything.',
    abilities: ['Triangulate', 'Mark Surge']
  },

  // Event (11)
  {
    id: '36',
    name: 'Bear Bee',
    slug: 'bear-bee',
    rarity: 'event',
    color: 'colorless',
    image_url: '/images/bees/bear-bee.png',
    description: 'A bee dressed as a bear. From Robux purchase.',
    abilities: ['Bear Morph', 'Loot Luck']
  },
  {
    id: '37',
    name: 'Cobalt Bee',
    slug: 'cobalt-bee',
    rarity: 'event',
    color: 'blue',
    image_url: '/images/bees/cobalt-bee.png',
    description: 'A brilliant blue bee from the Cobalt Guard.',
    abilities: ['Blue Pulse', 'Token Link']
  },
  {
    id: '38',
    name: 'Crimson Bee',
    slug: 'crimson-bee',
    rarity: 'event',
    color: 'red',
    image_url: '/images/bees/crimson-bee.png',
    description: 'A fierce red bee from the Crimson Guard.',
    abilities: ['Red Pulse', 'Token Link']
  },
  {
    id: '39',
    name: 'Digital Bee',
    slug: 'digital-bee',
    rarity: 'event',
    color: 'colorless',
    image_url: '/images/bees/digital-bee.png',
    description: 'A digital bee from the virtual realm.',
    abilities: ['Mind Hack', 'Glitch']
  },
  {
    id: '40',
    name: 'Festive Bee',
    slug: 'festive-bee',
    rarity: 'event',
    color: 'red',
    image_url: '/images/bees/festive-bee.png',
    description: 'A jolly bee from Beesmas events.',
    abilities: ['Festive Blessing', 'Beesmas Cheer']
  },
  {
    id: '41',
    name: 'Gummy Bee',
    slug: 'gummy-bee',
    rarity: 'event',
    color: 'colorless',
    image_url: '/images/bees/gummy-bee.png',
    description: 'A bouncy bee made of gummy. Very rare.',
    abilities: ['Gummy Morph', 'Goo Trail']
  },
  {
    id: '42',
    name: 'Photon Bee',
    slug: 'photon-bee',
    rarity: 'event',
    color: 'colorless',
    image_url: '/images/bees/photon-bee.png',
    description: 'A bee made of pure light.',
    abilities: ['Beamstorm', 'Token Link']
  },
  {
    id: '43',
    name: 'Puppy Bee',
    slug: 'puppy-bee',
    rarity: 'event',
    color: 'colorless',
    image_url: '/images/bees/puppy-bee.png',
    description: 'An adorable puppy dressed as a bee.',
    abilities: ['Fetch', 'Puppy Love']
  },
  {
    id: '44',
    name: 'Tabby Bee',
    slug: 'tabby-bee',
    rarity: 'event',
    color: 'colorless',
    image_url: '/images/bees/tabby-bee.png',
    description: 'A cat-like bee that gains Tabby Love over time.',
    abilities: ['Scratch', 'Tabby Love']
  },
  {
    id: '45',
    name: 'Vicious Bee',
    slug: 'vicious-bee',
    rarity: 'event',
    color: 'colorless',
    image_url: '/images/bees/vicious-bee.png',
    description: 'A dangerous bee that hunts mobs.',
    abilities: ['Impale', 'Token Link']
  },
  {
    id: '46',
    name: 'Windy Bee',
    slug: 'windy-bee',
    rarity: 'event',
    color: 'colorless',
    image_url: '/images/bees/windy-bee.png',
    description: 'A powerful bee that commands the wind.',
    abilities: ['Tornado', 'Cloud']
  }
]

// Rarity display info - Game accurate colors
export const beeRarities = {
  common: { name: 'Common', color: '#9CA3AF', bgColor: '#CD7F32' }, // Bronze/Copper
  rare: { name: 'Rare', color: '#60A5FA', bgColor: '#E5E7EB' }, // White/Silver
  epic: { name: 'Epic', color: '#A78BFA', bgColor: '#FCD34D' }, // Bright Yellow
  legendary: { name: 'Legendary', color: '#FBBF24', bgColor: '#22D3D1' }, // Aqua/Cyan
  mythic: { name: 'Mythic', color: '#EC4899', bgColor: '#C084FC' }, // Light Purple
  event: { name: 'Event', color: '#10B981', bgColor: '#22C55E' } // Green
} as const

// Color display info
export const beeColors = {
  red: { name: 'Red', color: '#EF4444' },
  blue: { name: 'Blue', color: '#3B82F6' },
  colorless: { name: 'Colorless', color: '#9CA3AF' }
} as const

// Get bees by rarity
export function getBeesByRarity(rarity: string): Bee[] {
  return bees.filter(b => b.rarity === rarity)
}

// Get bees by color
export function getBeesByColor(color: string): Bee[] {
  return bees.filter(b => b.color === color)
}

// Count bees by rarity
export function countBeesByRarity(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const bee of bees) {
    counts[bee.rarity] = (counts[bee.rarity] || 0) + 1
  }
  return counts
}

// Count bees by color
export function countBeesByColor(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const bee of bees) {
    counts[bee.color] = (counts[bee.color] || 0) + 1
  }
  return counts
}

// Search bees
export function searchBees(query: string): Bee[] {
  const lower = query.toLowerCase()
  return bees.filter(b =>
    b.name.toLowerCase().includes(lower) ||
    b.rarity.toLowerCase().includes(lower) ||
    b.color.toLowerCase().includes(lower) ||
    b.description?.toLowerCase().includes(lower)
  )
}
