import { Sticker } from '@/types/database'

// Sticker data collected from bssmvalues.com + Star Signs from Wiki/Traderie
// Source: https://www.bssmvalues.com/valuelist, https://traderie.com/beeswarmsimulator/values/stickers
// Last Updated: 2026-01-03
// Total: 282 stickers across 17 categories

// Helper function to create slug
function createSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// Raw sticker data by category
const rawStickerData = {
  'Cub Skins': [
    { name: 'Bee Cub', value: 79.5 },
    { name: 'Brown Cub', value: 11.5 },
    { name: 'Doodle Cub', value: 7.25 },
    { name: 'Gingerbread Cub', value: 11.75 },
    { name: 'Gloomy Cub', value: 9.5 },
    { name: 'Noob Cub', value: 17.75 },
    { name: 'Peppermint Cub', value: 30.5 },
    { name: 'Robo Cub', value: 4.5 },
    { name: 'Snow Cub', value: 47 },
    { name: 'Star Cub', value: 6.75 },
    { name: 'Stick Cub', value: 10.5 }
  ],
  'Hive Skins': [
    { name: 'Black Hive Skin', value: 0.13 },
    { name: 'Blue Hive Skin', value: 0.08 },
    { name: 'Doodle Hive Skin', value: 3.75 },
    { name: 'Green Hive Skin', value: 0.08 },
    { name: 'Icy Crowned Hive Skin', value: 6.75 },
    { name: 'Pink Hive Skin', value: 0.08 },
    { name: 'Red Hive Skin', value: 0.08 },
    { name: 'Wavy Cyan Hive Skin', value: 1.25 },
    { name: 'Wavy Festive Hive Skin', value: 0.29 },
    { name: 'Wavy Gold Hive Skin', value: 0.83 },
    { name: 'Wavy Purple Hive Skin', value: 13.5 },
    { name: 'White Hive Skin', value: 0.13 }
  ],
  'Vouchers': [
    { name: 'Bear Bee Voucher', value: 4.25 },
    { name: 'Bee Gather Voucher', value: 2.25 },
    { name: 'Convert Speed Voucher', value: 1.63 },
    { name: 'Cub Voucher', value: 2.25 },
    { name: 'Offline Voucher', value: 6 },
    { name: 'Ticket Voucher', value: 0.23 }
  ],
  'Bees': [
    { name: '4-Pronged Vector Bee', value: 0.29 },
    { name: 'Basic Bee', value: 1.25 },
    { name: 'Bear Bee Offer', value: 0.68 },
    { name: 'Brave Bee', value: 0.08 },
    { name: 'Bumble Bee', value: 0.04 },
    { name: 'Diamond Diamond Bee', value: 0.29 },
    { name: 'Drooping Stubborn Bee', value: 0.23 },
    { name: 'Fuzz Bomb', value: 0.29 },
    { name: 'Looker Bee', value: 0.13 },
    { name: 'Ninja Bee', value: 0.04 },
    { name: 'Photon Bee', value: 0.29 },
    { name: 'Precise Eye', value: 0.42 },
    { name: 'Rad Bee', value: 0.04 },
    { name: 'Rascal Bee', value: 0.04 },
    { name: 'Shocked Hive Slot', value: 0.04 },
    { name: 'Tabby From Behind', value: 0.68 },
    { name: 'Tabby Scratch', value: 0.29 }
  ],
  'Bears': [
    { name: 'Bomber Bear', value: 0.08 },
    { name: 'Chef Hat Polar Bear', value: 0.04 },
    { name: 'Dapper Bear From Above', value: 0.55 },
    { name: 'Glowering Gummy Bear', value: 0.9 },
    { name: 'Honey Bee Bear', value: 0.04 },
    { name: 'Panicked Science Bear', value: 0.04 },
    { name: 'Shy Brown Bear', value: 0.63 },
    { name: 'Sideways Spirit Bear', value: 0.68 },
    { name: 'Sitting Green Shirt Bear', value: 0.04 },
    { name: 'Sitting Mother Bear', value: 0.63 },
    { name: 'Squashed Head Bear', value: 0.08 },
    { name: 'Stretched Head Bear', value: 0.08 },
    { name: 'Sunbear', value: 2.5 },
    { name: 'Uplooking Bear', value: 0.04 }
  ],
  'Mobs': [
    { name: 'Blue Triangle Critter', value: 0.04 },
    { name: 'Coiled Snake', value: 0.04 },
    { name: 'Flying Magenta Critter', value: 0.04 },
    { name: 'Forward Facing Aphid', value: 0.04 },
    { name: 'Forward Facing Spider', value: 0.23 },
    { name: 'Happy Fish', value: 0.04 },
    { name: 'Left Facing Ant', value: 0.08 },
    { name: 'Little Scorpion', value: 0.08 },
    { name: 'Menacing Mantis', value: 0.08 },
    { name: 'Orange Leg Critter', value: 0.04 },
    { name: 'Purple Pointed Critter', value: 0.04 },
    { name: 'Right Facing Stump Snail', value: 0.13 },
    { name: 'Round Green Critter', value: 0.04 },
    { name: 'Small Blue Chick', value: 0.04 },
    { name: 'Standing Bean Bug', value: 0.29 },
    { name: 'Standing Caterpillar', value: 0.04 },
    { name: 'Tadpole', value: 0.04 },
    { name: 'Walking Stick Nymph', value: 2.5 }
  ],
  'Misc': [
    { name: 'AFK', value: 0.08 },
    { name: 'Alert Icon', value: 0.01 },
    { name: 'Atom Symbol', value: 0.04 },
    { name: 'Auryn', value: 0.83 },
    { name: 'Barcode', value: 0.04 },
    { name: 'Baseball Swing', value: 0.13 },
    { name: 'Black Diamond', value: 0.58 },
    { name: 'Black Star', value: 2.5 },
    { name: 'Blue Square', value: 0.04 },
    { name: 'Built Ship', value: 0.01 },
    { name: 'Classic Killroy', value: 0.01 },
    { name: 'Colorful Buttons', value: 0.01 },
    { name: 'Cool Backpack', value: 0.42 },
    { name: 'Cop And Robber', value: 0.04 },
    { name: 'Cyan Hilted Sword', value: 0.88 },
    { name: 'Cyan Star', value: 1.5 },
    { name: 'Dark Flame', value: 0.88 },
    { name: 'Desperate Booth', value: 0.01 },
    { name: 'Doodle S', value: 0.04 },
    { name: 'Eighth Note', value: 0.04 },
    { name: 'Eviction', value: 0.88 },
    { name: 'Evil Pig', value: 0.04 },
    { name: 'Fork And Knife', value: 0.04 },
    { name: 'Giraffe', value: 0.01 },
    { name: 'Glowing Smile', value: 0.37 },
    { name: 'Green Check Mark', value: 0.01 },
    { name: 'Green Circle', value: 0.04 },
    { name: 'Green Plus Sign', value: 0.01 },
    { name: 'Green Sell', value: 0.01 },
    { name: 'Grey Diamond Logo', value: 0.04 },
    { name: 'Grey Raining Cloud', value: 0.08 },
    { name: 'Grey Shape Companion', value: 0.04 },
    { name: 'Hourglass', value: 0.18 },
    { name: 'Interrobang Block', value: 0.04 },
    { name: 'Jack-0-Lantern', value: 0.29 },
    { name: 'Killroy With Hair', value: 0.01 },
    { name: 'Launching Rocket', value: 0.01 },
    { name: 'Lightning', value: 0.04 },
    { name: 'Orphan Dog', value: 0.04 },
    { name: 'Pale Heart', value: 0.04 },
    { name: 'Palm Tree', value: 0.23 },
    { name: 'Peace Sign Hand', value: 0.04 },
    { name: 'Pink Chair', value: 0.04 },
    { name: 'Pink Cupcake', value: 0.04 },
    { name: 'Pizza Delivery Man', value: 0.04 },
    { name: 'Prehistoric Boar', value: 0.08 },
    { name: 'Prehistoric Hand', value: 0.08 },
    { name: 'Pyramid', value: 0.01 },
    { name: 'Red Palm Hand', value: 0.13 },
    { name: 'Red Wailing Cry', value: 0.08 },
    { name: 'Red X', value: 0.01 },
    { name: 'Rhubarb', value: 0.04 },
    { name: 'Robot Head', value: 0.13 },
    { name: 'Rubber Duck', value: 0.01 },
    { name: 'Saturn', value: 0.08 },
    { name: 'Shining Halo', value: 0.23 },
    { name: 'Shining Star', value: 1.5 },
    { name: 'Shrugging Heart', value: 0.08 },
    { name: 'Silly Tongue', value: 0.42 },
    { name: 'Simple Cloud', value: 0.13 },
    { name: 'Simple Mountain', value: 0.04 },
    { name: 'Simple Skyscraper', value: 0.01 },
    { name: 'Simple Sun', value: 0.01 },
    { name: 'Small Flame', value: 0.04 },
    { name: 'Small Shield', value: 0.4 },
    { name: 'Sprout', value: 0.01 },
    { name: 'Standing Beekeeper', value: 0.18 },
    { name: 'Taunting Doodle Person', value: 0.08 },
    { name: 'Theatrical Intruder', value: 0.04 },
    { name: 'Thumbs Up Hand', value: 0.04 },
    { name: 'Tiny House', value: 0.08 },
    { name: 'TNT', value: 0.23 },
    { name: 'Tornado', value: 0.5 },
    { name: 'Tough Potato', value: 0.01 },
    { name: 'Traffic Light', value: 0.08 },
    { name: 'Triple Exclamation', value: 0.04 },
    { name: 'Wall Crack', value: 0.42 },
    { name: 'Waving Townsperson', value: 0.04 },
    { name: 'Waxing Crescent Moon', value: 0.08 },
    { name: 'White Flag', value: 0.04 },
    { name: 'Window', value: 0.04 },
    { name: 'Wishbone', value: 0.08 },
    { name: 'Yellow Coffee Mug', value: 0.23 },
    { name: 'Yellow Hi', value: 0.01 },
    { name: 'Yellow Left Arrow', value: 0.23 },
    { name: 'Yellow Right Arrow', value: 0.23 },
    { name: 'Yellow Sticky Hand', value: 0.42 },
    { name: 'Yellow Umbrella', value: 0.04 },
    { name: 'Yellow Walking Wiggly Person', value: 0.08 },
    { name: 'Young Elf', value: 0.01 }
  ],
  'Art': [
    { name: 'Abstract Color Painting', value: 0.45 },
    { name: 'Banana Painting', value: 0.29 },
    { name: 'Ionic Column Base', value: 2.25 },
    { name: 'Ionic Column Middle', value: 0.9 },
    { name: 'Ionic Column Top', value: 2.25 },
    { name: 'Moai', value: 0.08 },
    { name: 'Nessie', value: 18 },
    { name: 'Orange Green Tri Deco', value: 0.18 },
    { name: 'Orange Step Array', value: 0.08 },
    { name: 'Pearl Girl', value: 0.38 },
    { name: 'Prism Painting', value: 0.29 },
    { name: 'Red Doodle Person', value: 0.08 }
  ],
  'Gems': [
    { name: 'Blue And Green Marble', value: 0.08 },
    { name: 'Cyan Decorative Border', value: 0.08 },
    { name: 'Diamond Cluster', value: 0.08 },
    { name: 'Diamond Trim', value: 0.04 },
    { name: 'Left Gold Swirl Fleuron', value: 0.44 },
    { name: 'Left Mythic Gem Fleuron', value: 0.63 },
    { name: 'Left Shining Diamond Fleuron', value: 0.63 },
    { name: 'Mythic M', value: 0.29 },
    { name: 'Orange Swirled Marble', value: 0.08 },
    { name: 'Purple Fleuron', value: 0.29 },
    { name: 'Right Gold Swirl Fleuron', value: 0.44 },
    { name: 'Right Mythic Gem Fleuron', value: 0.63 },
    { name: 'Right Shining Diamond Fleuron', value: 0.63 },
    { name: 'Royal Bear', value: 0.5 },
    { name: 'Royal Symbol', value: 2.5 },
    { name: 'Yellow Swirled Marble', value: 0.08 }
  ],
  'Nectar': [
    { name: 'Comforting Nectar Icon', value: 0.23 },
    { name: 'Invigorating Nectar Icon', value: 0.23 },
    { name: 'Motivating Nectar Icon', value: 0.23 },
    { name: 'Refreshing Nectar Icon', value: 0.23 },
    { name: 'Satisfying Nectar Icon', value: 0.23 }
  ],
  'Flowers': [
    { name: 'Purple 4-Point Flower', value: 0.42 },
    { name: 'Small Dandelion', value: 0.08 },
    { name: 'Small Pink Tulip', value: 0.08 },
    { name: 'Small Tickseed', value: 0.08 },
    { name: 'Small White Daisy', value: 0.08 }
  ],
  'Mushrooms': [
    { name: 'Black Truffle Mushroom', value: 0.23 },
    { name: 'Chanterelle Mushroom', value: 0.08 },
    { name: 'Fly Agaric Mushroom', value: 0.08 },
    { name: 'Morel Mushroom', value: 0.08 },
    { name: 'Oiler Mushroom', value: 0.13 },
    { name: 'Porcini Mushroom', value: 0.08 },
    { name: 'Prismatic Mushroom', value: 0.9 },
    { name: 'Shiitake Mushroom', value: 0.08 },
    { name: 'Spore Covered Puffshroom', value: 0.04 },
    { name: 'White Button Mushroom', value: 0.04 }
  ],
  'Leaves': [
    { name: 'Autumn Leaf', value: 0.08 },
    { name: 'Green Leaf', value: 0.04 },
    { name: 'Maple Leaf', value: 0.08 },
    { name: 'Oak Leaf', value: 0.04 },
    { name: 'Pine Needle', value: 0.04 }
  ],
  'Tools': [
    { name: 'Bubble Wand', value: 0.13 },
    { name: 'Clippers', value: 0.88 },
    { name: 'Dark Scythe', value: 0.04 },
    { name: 'Electro-Magnet', value: 0.88 },
    { name: 'Golden Rake', value: 0.13 },
    { name: 'Gummyballer', value: 0.13 },
    { name: 'Honey Dipper', value: 0.63 },
    { name: 'Magnet', value: 0.88 },
    { name: 'Petal Wand', value: 0.04 },
    { name: 'Porcelain Dipper', value: 0.13 },
    { name: 'Pulsar', value: 0.88 },
    { name: 'Rake', value: 0.88 },
    { name: 'Scissors', value: 0.88 },
    { name: 'Scooper', value: 0.88 },
    { name: 'Scythe', value: 0.13 },
    { name: 'Spark Staff', value: 0.13 },
    { name: 'Super-Scooper', value: 0.88 },
    { name: 'Tide Popper', value: 0.04 },
    { name: 'Vacuum', value: 0.88 }
  ],
  'Stamps': [
    { name: 'Ant Field Stamp', value: 0.13 },
    { name: 'Bamboo Field Stamp', value: 0.29 },
    { name: 'Blue Flower Field Stamp', value: 0.29 },
    { name: 'Cactus Field Stamp', value: 0.29 },
    { name: 'Clover Field Stamp', value: 0.29 },
    { name: 'Coconut Field Stamp', value: 0.29 },
    { name: 'Dandelion Field Stamp', value: 0.29 },
    { name: 'Hub Field Stamp', value: 0.29 },
    { name: 'Mountain Top Field Stamp', value: 0.29 },
    { name: 'Mushroom Field Stamp', value: 0.29 },
    { name: 'Pepper Patch Stamp', value: 0.8 },
    { name: 'Pine Tree Forest Stamp', value: 0.83 },
    { name: 'Pineapple Patch Stamp', value: 0.29 },
    { name: 'Pumpkin Patch Stamp', value: 0.29 },
    { name: 'Rose Field Stamp', value: 0.35 },
    { name: 'Spider Field Stamp', value: 0.63 },
    { name: 'Strawberry Field Stamp', value: 0.29 },
    { name: 'Stump Field Stamp', value: 0.29 },
    { name: 'Sunflower Field Stamp', value: 0.29 }
  ],
  'Beesmas': [
    { name: 'BBM From Below', value: 7.5 },
    { name: 'Blue Beesmas Light', value: 0.18 },
    { name: 'Critter In A Stocking', value: 0.13 },
    { name: 'Festive Pea', value: 0.42 },
    { name: 'Festive Pufferfish', value: 0.23 },
    { name: 'Flying Bee Bear', value: 0.08 },
    { name: 'Flying Festive Bee', value: 1.13 },
    { name: 'Green Beesmas Light', value: 0.18 },
    { name: 'Party Robo Bear', value: 1.13 },
    { name: 'Red Beesmas Light', value: 0.18 },
    { name: 'Yellow Beesmas Light', value: 0.18 }
  ],
  'Star Signs': [
    { name: 'Aries Star Sign', value: 1.0 },
    { name: 'Taurus Star Sign', value: 0.88 },
    { name: 'Gemini Star Sign', value: 0.92 },
    { name: 'Cancer Star Sign', value: 0.95 },
    { name: 'Leo Star Sign', value: 0.93 },
    { name: 'Virgo Star Sign', value: 0.89 },
    { name: 'Libra Star Sign', value: 0.87 },
    { name: 'Scorpio Star Sign', value: 0.91 },
    { name: 'Sagittarius Star Sign', value: 0.94 },
    { name: 'Capricorn Star Sign', value: 0.96 },
    { name: 'Aquarius Star Sign', value: 0.95 },
    { name: 'Pisces Star Sign', value: 0.90 }
  ]
}

// Map category names to database category types
const categoryMap: Record<string, Sticker['category']> = {
  'Cub Skins': 'cub_skin',
  'Hive Skins': 'hive_skin',
  'Stamps': 'field_stamp',
  'Tools': 'tool',
  'Beesmas': 'beesmas',
  'Star Signs': 'star_sign',
  'Vouchers': 'other',
  'Bees': 'other',
  'Bears': 'other',
  'Mobs': 'other',
  'Misc': 'other',
  'Art': 'other',
  'Gems': 'other',
  'Nectar': 'other',
  'Flowers': 'other',
  'Mushrooms': 'other',
  'Leaves': 'other'
}

// Generate stickers array with proper typing
let idCounter = 1
export const stickers: Sticker[] = []

for (const [categoryName, items] of Object.entries(rawStickerData)) {
  const dbCategory = categoryMap[categoryName] || 'other'

  for (const item of items) {
    stickers.push({
      id: String(idCounter++),
      name: item.name,
      slug: createSlug(item.name),
      category: dbCategory,
      image_url: null,
      value: item.value,
      trend: 'stable',
      is_obtainable: true,
      updated_at: new Date().toISOString()
    })
  }
}

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

// Sticker statistics
export const stickerStats = {
  total: stickers.length,
  byCategory: {
    cub_skin: stickers.filter(s => s.category === 'cub_skin').length,
    hive_skin: stickers.filter(s => s.category === 'hive_skin').length,
    field_stamp: stickers.filter(s => s.category === 'field_stamp').length,
    tool: stickers.filter(s => s.category === 'tool').length,
    beesmas: stickers.filter(s => s.category === 'beesmas').length,
    other: stickers.filter(s => s.category === 'other').length
  }
}

// Get stickers by category
export function getStickersByCategory(category: Sticker['category']): Sticker[] {
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

// Get sticker by slug
export function getStickerBySlug(slug: string): Sticker | undefined {
  return stickers.find(s => s.slug === slug)
}

// Get sticker by ID
export function getStickerById(id: string): Sticker | undefined {
  return stickers.find(s => s.id === id)
}
