import { Bee } from '@/types/database'

// All 46 bees in Bee Swarm Simulator - Complete data from Wiki
// Last Updated: 2026-01-03
export const bees: Bee[] = [
  // ==================== COMMON (1) ====================
  {
    id: '1',
    name: 'Basic Bee',
    slug: 'basic-bee',
    rarity: 'common',
    color: 'colorless',
    energy: 20,
    speed: 14,
    attack: 1,
    gather_amount: 10,
    image_url: '/images/bees/basic-bee.png',
    description: 'The most basic bee. A good all-rounder that can help with any task.',
    abilities: ['Bomb', 'Gather Pollen'],
    gifted_ability: '+20% Pollen',
    obtain_method: 'Starting bee, eggs, Royal Jelly'
  },

  // ==================== RARE (9) ====================
  {
    id: '2',
    name: 'Bomber Bee',
    slug: 'bomber-bee',
    rarity: 'rare',
    color: 'colorless',
    energy: 20,
    speed: 12.6,
    attack: 1,
    gather_amount: 10,
    image_url: '/images/bees/bomber-bee.png',
    description: 'A bee that specializes in bombs that can collect pollen from a large area.',
    abilities: ['Bomb+', 'Bomb Sync'],
    gifted_ability: '+10% Bomb Pollen',
    obtain_method: 'Basic Egg, Silver Egg, Gold Egg, Royal Jelly'
  },
  {
    id: '3',
    name: 'Brave Bee',
    slug: 'brave-bee',
    rarity: 'rare',
    color: 'colorless',
    energy: 20,
    speed: 15.4,
    attack: 3,
    gather_amount: 10,
    image_url: '/images/bees/brave-bee.png',
    description: 'A courageous bee that fights monsters with extra power.',
    abilities: ['Bomb', 'Focus'],
    gifted_ability: '+10% Critical Chance',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '4',
    name: 'Bumble Bee',
    slug: 'bumble-bee',
    rarity: 'rare',
    color: 'blue',
    energy: 40,
    speed: 11.9,
    attack: 3,
    gather_amount: 10,
    image_url: '/images/bees/bumble-bee.png',
    description: 'A fluffy bee that produces blue boost tokens.',
    abilities: ['Blue Bomb', 'Blue Boost'],
    gifted_ability: '+10% Blue Pollen',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '5',
    name: 'Cool Bee',
    slug: 'cool-bee',
    rarity: 'rare',
    color: 'blue',
    energy: 25,
    speed: 14,
    attack: 2,
    gather_amount: 10,
    image_url: '/images/bees/cool-bee.png',
    description: 'A chill bee with shades that creates blue bombs.',
    abilities: ['Blue Bomb+', 'Haste'],
    gifted_ability: '+5% Bee Movespeed',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '6',
    name: 'Hasty Bee',
    slug: 'hasty-bee',
    rarity: 'rare',
    color: 'colorless',
    energy: 20,
    speed: 18.2,
    attack: 1,
    gather_amount: 10,
    image_url: '/images/bees/hasty-bee.png',
    description: 'One of the fastest bees. Creates haste tokens.',
    abilities: ['Haste', 'Haste+'],
    gifted_ability: '+10% Player Movespeed',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '7',
    name: 'Looker Bee',
    slug: 'looker-bee',
    rarity: 'rare',
    color: 'colorless',
    energy: 20,
    speed: 14,
    attack: 1,
    gather_amount: 10,
    image_url: '/images/bees/looker-bee.png',
    description: 'A bee with excellent vision that helps find tokens.',
    abilities: ['Token Link', 'Focus'],
    gifted_ability: '+5% Super-Crit Chance',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '8',
    name: 'Rad Bee',
    slug: 'rad-bee',
    rarity: 'rare',
    color: 'red',
    energy: 25,
    speed: 14,
    attack: 2,
    gather_amount: 10,
    image_url: '/images/bees/rad-bee.png',
    description: 'A totally rad bee that boosts red pollen collection.',
    abilities: ['Red Bomb+', 'Haste'],
    gifted_ability: '+5% Bee Movespeed',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '9',
    name: 'Rascal Bee',
    slug: 'rascal-bee',
    rarity: 'rare',
    color: 'red',
    energy: 30,
    speed: 15.4,
    attack: 4,
    gather_amount: 10,
    image_url: '/images/bees/rascal-bee.png',
    description: 'A mischievous bee with high attack power.',
    abilities: ['Red Bomb', 'Rage'],
    gifted_ability: '+5% Bee Attack',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '10',
    name: 'Stubborn Bee',
    slug: 'stubborn-bee',
    rarity: 'rare',
    color: 'colorless',
    energy: 60,
    speed: 11.2,
    attack: 1,
    gather_amount: 10,
    image_url: '/images/bees/stubborn-bee.png',
    description: 'A persistent bee with high energy.',
    abilities: ['Bomb', 'Haste'],
    gifted_ability: '+5% Bee Gather Pollen',
    obtain_method: 'Eggs, Royal Jelly'
  },

  // ==================== EPIC (11) ====================
  {
    id: '11',
    name: 'Bubble Bee',
    slug: 'bubble-bee',
    rarity: 'epic',
    color: 'blue',
    energy: 30,
    speed: 14,
    attack: 2,
    gather_amount: 10,
    image_url: '/images/bees/bubble-bee.png',
    description: 'A bubbly bee that creates bubbles to collect pollen.',
    abilities: ['Blue Bomb', 'Gathering Bubbles'],
    gifted_ability: '+25% Bubble Duration',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '12',
    name: 'Bucko Bee',
    slug: 'bucko-bee',
    rarity: 'epic',
    color: 'blue',
    energy: 30,
    speed: 14,
    attack: 3,
    gather_amount: 10,
    image_url: '/images/bees/bucko-bee.png',
    description: 'The leader of blue bees. Gives powerful blue buffs.',
    abilities: ['Blue Bomb+', 'Blue Boost'],
    gifted_ability: '+25% Blue Bomb Pollen',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '13',
    name: 'Commander Bee',
    slug: 'commander-bee',
    rarity: 'epic',
    color: 'colorless',
    energy: 30,
    speed: 14,
    attack: 2,
    gather_amount: 10,
    image_url: '/images/bees/commander-bee.png',
    description: 'Commands other bees to work harder.',
    abilities: ['Focus', 'Rally'],
    gifted_ability: '+10% Bee Attack',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '14',
    name: 'Demo Bee',
    slug: 'demo-bee',
    rarity: 'epic',
    color: 'colorless',
    energy: 30,
    speed: 12.6,
    attack: 2,
    gather_amount: 20,
    image_url: '/images/bees/demo-bee.png',
    description: 'An explosive bee that loves demolition.',
    abilities: ['Bomb+', 'Bomb Sync', 'Buzz Bomb'],
    gifted_ability: '+20% Bomb Pollen',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '15',
    name: 'Exhausted Bee',
    slug: 'exhausted-bee',
    rarity: 'epic',
    color: 'colorless',
    energy: 10,
    speed: 11.2,
    attack: 1,
    gather_amount: 10,
    image_url: '/images/bees/exhausted-bee.png',
    description: 'A tired bee that somehow still works hard.',
    abilities: ['Bomb', 'Wake Up'],
    gifted_ability: '+5% Bee Energy',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '16',
    name: 'Fire Bee',
    slug: 'fire-bee',
    rarity: 'epic',
    color: 'red',
    energy: 25,
    speed: 15.4,
    attack: 4,
    gather_amount: 10,
    image_url: '/images/bees/fire-bee.png',
    description: 'A hot-tempered bee that creates flames.',
    abilities: ['Red Bomb', 'Flame Heat'],
    gifted_ability: '+25% Flame Pollen',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '17',
    name: 'Frosty Bee',
    slug: 'frosty-bee',
    rarity: 'epic',
    color: 'blue',
    energy: 25,
    speed: 14,
    attack: 3,
    gather_amount: 10,
    image_url: '/images/bees/frosty-bee.png',
    description: 'An icy bee that freezes pollen in place.',
    abilities: ['Blue Bomb', 'Blue Boost'],
    gifted_ability: '+10% Blue Pollen',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '18',
    name: 'Honey Bee',
    slug: 'honey-bee',
    rarity: 'epic',
    color: 'colorless',
    energy: 20,
    speed: 14,
    attack: 1,
    gather_amount: 10,
    image_url: '/images/bees/honey-bee.png',
    description: 'Produces bonus honey from all sources.',
    abilities: ['Honey Gift', 'Token Link'],
    gifted_ability: '+10% Honey Per Pollen',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '19',
    name: 'Rage Bee',
    slug: 'rage-bee',
    rarity: 'epic',
    color: 'red',
    energy: 30,
    speed: 15.4,
    attack: 4,
    gather_amount: 10,
    image_url: '/images/bees/rage-bee.png',
    description: 'An angry bee that builds up rage for power.',
    abilities: ['Red Bomb', 'Rage'],
    gifted_ability: '+15% Bee Attack',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '20',
    name: 'Riley Bee',
    slug: 'riley-bee',
    rarity: 'epic',
    color: 'red',
    energy: 30,
    speed: 14,
    attack: 3,
    gather_amount: 10,
    image_url: '/images/bees/riley-bee.png',
    description: 'The leader of red bees. Gives powerful red buffs.',
    abilities: ['Red Bomb+', 'Red Boost'],
    gifted_ability: '+25% Red Bomb Pollen',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '21',
    name: 'Shocked Bee',
    slug: 'shocked-bee',
    rarity: 'epic',
    color: 'colorless',
    energy: 20,
    speed: 19.6,
    attack: 2,
    gather_amount: 10,
    image_url: '/images/bees/shocked-bee.png',
    description: 'A fast bee with +40% movement speed bonus.',
    abilities: ['Haste', 'Token Link'],
    gifted_ability: 'x1.1 White Pollen',
    obtain_method: 'Eggs, Royal Jelly'
  },

  // ==================== LEGENDARY (8) ====================
  {
    id: '22',
    name: 'Baby Bee',
    slug: 'baby-bee',
    rarity: 'legendary',
    color: 'colorless',
    energy: 15,
    speed: 10.5,
    attack: 0,
    gather_amount: 10,
    image_url: '/images/bees/baby-bee.png',
    description: 'The only bee with 0 attack. Grants Baby Love for x2 pollen.',
    abilities: ['Baby Love'],
    gifted_ability: '+25% Loot Luck',
    obtain_method: 'Eggs, Royal Jelly, Tunnel Bear drop'
  },
  {
    id: '23',
    name: 'Carpenter Bee',
    slug: 'carpenter-bee',
    rarity: 'legendary',
    color: 'colorless',
    energy: 25,
    speed: 11.2,
    attack: 5,
    gather_amount: 10,
    image_url: '/images/bees/carpenter-bee.png',
    description: 'A skilled bee that creates Honey and Pollen Marks.',
    abilities: ['Honey Mark+', 'Pollen Mark'],
    gifted_ability: '+25% Pollen From Tools',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '24',
    name: 'Demon Bee',
    slug: 'demon-bee',
    rarity: 'legendary',
    color: 'red',
    energy: 20,
    speed: 10.5,
    attack: 8,
    gather_amount: 35,
    image_url: '/images/bees/demon-bee.png',
    description: 'A dark bee with Gathering Flames passive.',
    abilities: ['Red Bomb', 'Red Bomb+', 'Gathering Flames'],
    gifted_ability: '+20% Instant Bomb Conversion',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '25',
    name: 'Diamond Bee',
    slug: 'diamond-bee',
    rarity: 'legendary',
    color: 'blue',
    energy: 20,
    speed: 14,
    attack: 1,
    gather_amount: 10,
    image_url: '/images/bees/diamond-bee.png',
    description: 'A precious bee with +920 convert amount.',
    abilities: ['Blue Boost', 'Honey Gift+', 'Shimmering Honey'],
    gifted_ability: 'x1.2 Convert Rate',
    obtain_method: 'Eggs, Royal Jelly, Diamond Egg'
  },
  {
    id: '26',
    name: 'Lion Bee',
    slug: 'lion-bee',
    rarity: 'legendary',
    color: 'colorless',
    energy: 60,
    speed: 19.6,
    attack: 10,
    gather_amount: 20,
    image_url: '/images/bees/lion-bee.png',
    description: 'A fierce bee with the highest attack among Legendaries.',
    abilities: ['Buzz Bomb+'],
    gifted_ability: '+5% Gifted Bee Pollen',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '27',
    name: 'Music Bee',
    slug: 'music-bee',
    rarity: 'legendary',
    color: 'colorless',
    energy: 20,
    speed: 16.1,
    attack: 1,
    gather_amount: 16,
    image_url: '/images/bees/music-bee.png',
    description: 'A melodic bee that grants +100% Critical Power.',
    abilities: ['Melody', 'Focus', 'Token Link'],
    gifted_ability: '+25% Pollen From Bee Gathering',
    obtain_method: 'Music Bee Jelly (Beesmas events)'
  },
  {
    id: '28',
    name: 'Ninja Bee',
    slug: 'ninja-bee',
    rarity: 'legendary',
    color: 'blue',
    energy: 20,
    speed: 21,
    attack: 4,
    gather_amount: 10,
    image_url: '/images/bees/ninja-bee.png',
    description: 'The fastest Legendary bee at 21 speed.',
    abilities: ['Haste', 'Blue Bomb+'],
    gifted_ability: '+5% Bee Movespeed',
    obtain_method: 'Eggs, Royal Jelly'
  },
  {
    id: '29',
    name: 'Shy Bee',
    slug: 'shy-bee',
    rarity: 'legendary',
    color: 'red',
    energy: 40,
    speed: 18.2,
    attack: 2,
    gather_amount: 10,
    image_url: '/images/bees/shy-bee.png',
    description: 'A timid bee with Nectar Lover passive (2x Nectar).',
    abilities: ['Red Boost', 'Red Bomb', 'Nectar Lover'],
    gifted_ability: '+5% Bee Ability Pollen',
    obtain_method: 'Eggs, Royal Jelly'
  },

  // ==================== MYTHIC (6) ====================
  {
    id: '30',
    name: 'Buoyant Bee',
    slug: 'buoyant-bee',
    rarity: 'mythic',
    color: 'blue',
    energy: 60,
    speed: 14,
    attack: 4,
    gather_amount: 15,
    image_url: '/images/bees/buoyant-bee.png',
    description: 'A floaty bee with Balloon Enthusiast (x3 convert from balloons).',
    abilities: ['Blue Bomb', 'Inflate Balloons', 'Balloon Enthusiast'],
    gifted_ability: 'Surprise Party - Summons Gold Balloons for all players',
    obtain_method: 'Mythic Egg, Royal Jelly (0.004%)'
  },
  {
    id: '31',
    name: 'Fuzzy Bee',
    slug: 'fuzzy-bee',
    rarity: 'mythic',
    color: 'colorless',
    energy: 50,
    speed: 11.9,
    attack: 3,
    gather_amount: 100,
    image_url: '/images/bees/fuzzy-bee.png',
    description: 'The fuzziest bee with highest base gather amount (+90).',
    abilities: ['Fuzz Bombs', 'Buzz Bomb+', 'Fuzzy Coat'],
    gifted_ability: 'Pollen Haze - Summons yellow haze that pollinates flowers',
    obtain_method: 'Mythic Egg, Royal Jelly (0.004%), Robux'
  },
  {
    id: '32',
    name: 'Precise Bee',
    slug: 'precise-bee',
    rarity: 'mythic',
    color: 'red',
    energy: 40,
    speed: 11.2,
    attack: 8,
    gather_amount: 20,
    image_url: '/images/bees/precise-bee.png',
    description: 'A sniper bee with Target Practice and long-range attacks.',
    abilities: ['Target Practice', 'Sniper'],
    gifted_ability: '+3% Super-Crit Chance',
    obtain_method: 'Mythic Egg, Royal Jelly (0.004%)'
  },
  {
    id: '33',
    name: 'Spicy Bee',
    slug: 'spicy-bee',
    rarity: 'mythic',
    color: 'red',
    energy: 20,
    speed: 14,
    attack: 5,
    gather_amount: 14,
    image_url: '/images/bees/spicy-bee.png',
    description: 'A hot bee with Steam Engine (up to +100% speed/gather with Flame Heat).',
    abilities: ['Inferno', 'Rage', 'Steam Engine'],
    gifted_ability: 'Flame Fuel - Oil into flames for longer duration and conversion',
    obtain_method: 'Mythic Egg, Royal Jelly (0.004%)'
  },
  {
    id: '34',
    name: 'Tadpole Bee',
    slug: 'tadpole-bee',
    rarity: 'mythic',
    color: 'blue',
    energy: 10,
    speed: 11.2,
    attack: 1,
    gather_amount: 10,
    image_url: '/images/bees/tadpole-bee.png',
    description: 'A watery bee that summons frogs to collect resources.',
    abilities: ['Blue Boost', 'Summon Frog', 'Gathering Bubbles+'],
    gifted_ability: 'Baby Love + 25% Bubble Duration',
    obtain_method: 'Mythic Egg, Royal Jelly (0.004%), Beesmas 2020'
  },
  {
    id: '35',
    name: 'Vector Bee',
    slug: 'vector-bee',
    rarity: 'mythic',
    color: 'colorless',
    energy: 45,
    speed: 16.24,
    attack: 5,
    gather_amount: 18,
    image_url: '/images/bees/vector-bee.png',
    description: 'A mathematical bee with Triangulate ability.',
    abilities: ['Pollen Mark+', 'Triangulate'],
    gifted_ability: 'Mark Surge - Extends marks and collects pollen',
    obtain_method: 'Mythic Egg, Royal Jelly (0.004%)'
  },

  // ==================== EVENT (11) ====================
  {
    id: '36',
    name: 'Bear Bee',
    slug: 'bear-bee',
    rarity: 'event',
    color: 'colorless',
    energy: 35,
    speed: 14,
    attack: 5,
    gather_amount: 15,
    image_url: '/images/bees/bear-bee.png',
    description: 'A bee dressed as a bear. Transforms you into bears!',
    abilities: ['Bear Morph'],
    gifted_ability: '+10% Pollen, 20% chance to transform into rare bears',
    obtain_method: '800 Robux, Tunnel Bear drop, Retro Swarm Challenge'
  },
  {
    id: '37',
    name: 'Cobalt Bee',
    slug: 'cobalt-bee',
    rarity: 'event',
    color: 'blue',
    energy: 35,
    speed: 18.2,
    attack: 7,
    gather_amount: 10,
    image_url: '/images/bees/cobalt-bee.png',
    description: 'Blue counterpart to Crimson. Blue Pulse bounces between blue bees.',
    abilities: ['Blue Pulse', 'Blue Bomb Sync'],
    gifted_ability: 'Blue Pulse converts pollen instantly',
    obtain_method: '250 Tickets (Ticket Tent)'
  },
  {
    id: '38',
    name: 'Crimson Bee',
    slug: 'crimson-bee',
    rarity: 'event',
    color: 'red',
    energy: 35,
    speed: 18.2,
    attack: 7,
    gather_amount: 10,
    image_url: '/images/bees/crimson-bee.png',
    description: 'Red counterpart to Cobalt. Red Pulse bounces between red bees.',
    abilities: ['Red Pulse', 'Red Bomb Sync'],
    gifted_ability: 'Red Pulse converts pollen instantly',
    obtain_method: '250 Tickets (Ticket Tent)'
  },
  {
    id: '39',
    name: 'Digital Bee',
    slug: 'digital-bee',
    rarity: 'event',
    color: 'colorless',
    energy: 20,
    speed: 11.9,
    attack: 1,
    gather_amount: 125,
    image_url: '/images/bees/digital-bee.png',
    description: 'A glitchy bee that corrupts fields for bonus tokens.',
    abilities: ['Glitch', 'Mind Hack', 'Drive Expansion'],
    gifted_ability: 'Map Corruption - Corrupts random fields for all players',
    obtain_method: 'Robo Bear Shop (7.7M Honey + Drives)'
  },
  {
    id: '40',
    name: 'Festive Bee',
    slug: 'festive-bee',
    rarity: 'event',
    color: 'red',
    energy: 20,
    speed: 16.1,
    attack: 1,
    gather_amount: 40,
    image_url: '/images/bees/festive-bee.png',
    description: 'A jolly bee that gives Festive Gift to all players.',
    abilities: ['Festive Gift', 'Honey Mark', 'Red Bomb+'],
    gifted_ability: 'x1.25 Convert Rate at Hive',
    obtain_method: '500 Tickets (Ticket Tent)'
  },
  {
    id: '41',
    name: 'Gummy Bee',
    slug: 'gummy-bee',
    rarity: 'event',
    color: 'colorless',
    energy: 50,
    speed: 14,
    attack: 3,
    gather_amount: 10,
    image_url: '/images/bees/gummy-bee.png',
    description: 'A bouncy gummy bee that covers fields in goo.',
    abilities: ['Gumdrop Barrage', 'Glob'],
    gifted_ability: '+5% Honey Per Pollen',
    obtain_method: '2,500 Gumdrops (Gummy Bee Egg Claim)'
  },
  {
    id: '42',
    name: 'Photon Bee',
    slug: 'photon-bee',
    rarity: 'event',
    color: 'colorless',
    energy: 999999999,
    speed: 21,
    attack: 4,
    gather_amount: 20,
    image_url: '/images/bees/photon-bee.png',
    description: 'A bee made of pure light with unlimited energy!',
    abilities: ['Beamstorm', 'Haste'],
    gifted_ability: '+5% Instant Conversion, white beams',
    obtain_method: '500 Tickets (Ticket Tent)'
  },
  {
    id: '43',
    name: 'Puppy Bee',
    slug: 'puppy-bee',
    rarity: 'event',
    color: 'colorless',
    energy: 40,
    speed: 16.1,
    attack: 2,
    gather_amount: 25,
    image_url: '/images/bees/puppy-bee.png',
    description: 'An adorable puppy bee with Fetch ability.',
    abilities: ['Fetch', 'Puppy Love'],
    gifted_ability: '+20% Bond From Treats',
    obtain_method: '500 Tickets (Ticket Tent)'
  },
  {
    id: '44',
    name: 'Tabby Bee',
    slug: 'tabby-bee',
    rarity: 'event',
    color: 'colorless',
    energy: 28,
    speed: 16.1,
    attack: 4,
    gather_amount: 110,
    image_url: '/images/bees/tabby-bee.png',
    description: 'A cat-like bee that gains permanent Tabby Love stacks (max 1000).',
    abilities: ['Scratch', 'Tabby Love'],
    gifted_ability: '+50% Critical Power, Scratch always crits',
    obtain_method: '500 Tickets (Ticket Tent)'
  },
  {
    id: '45',
    name: 'Vicious Bee',
    slug: 'vicious-bee',
    rarity: 'event',
    color: 'blue',
    energy: 50,
    speed: 17.5,
    attack: 9,
    gather_amount: 10,
    image_url: '/images/bees/vicious-bee.png',
    description: 'A dangerous bee that impales enemies for 5% of their health.',
    abilities: ['Impale', 'Blue Bomb+'],
    gifted_ability: '-15% Mob Respawn Time',
    obtain_method: '250 Stingers (Vicious Bee Egg Claim)'
  },
  {
    id: '46',
    name: 'Windy Bee',
    slug: 'windy-bee',
    rarity: 'event',
    color: 'colorless',
    energy: 20,
    speed: 19.6,
    attack: 4,
    gather_amount: 10,
    image_url: '/images/bees/windy-bee.png',
    description: 'A powerful bee with +40% Movespeed and Rain Cloud ability.',
    abilities: ['White Boost', 'Rain Cloud', 'Tornado'],
    gifted_ability: '+15% Instant White Conversion, x2 Cloud Boosts',
    obtain_method: 'Cloud Vials + Spirit Petal at Wind Shrine'
  }
]

// Rarity display info - Game accurate colors
export const beeRarities = {
  common: { name: 'Common', color: '#9CA3AF', bgColor: '#CD7F32' },
  rare: { name: 'Rare', color: '#60A5FA', bgColor: '#E5E7EB' },
  epic: { name: 'Epic', color: '#A78BFA', bgColor: '#FCD34D' },
  legendary: { name: 'Legendary', color: '#FBBF24', bgColor: '#22D3D1' },
  mythic: { name: 'Mythic', color: '#EC4899', bgColor: '#C084FC' },
  event: { name: 'Event', color: '#10B981', bgColor: '#22C55E' }
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
    b.description?.toLowerCase().includes(lower) ||
    b.abilities.some(a => a.toLowerCase().includes(lower))
  )
}

// Get bee by slug
export function getBeeBySlug(slug: string): Bee | undefined {
  return bees.find(b => b.slug === slug)
}

// Get bee by id
export function getBeeById(id: string): Bee | undefined {
  return bees.find(b => b.id === id)
}

// Bee statistics
export const beeStats = {
  total: 46,
  byRarity: {
    common: 1,
    rare: 9,
    epic: 11,
    legendary: 8,
    mythic: 6,
    event: 11
  },
  byColor: {
    red: 11,
    blue: 10,
    colorless: 25
  }
}
