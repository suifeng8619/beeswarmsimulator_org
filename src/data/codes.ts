import { Code } from '@/types/database'

// Active and expired codes for Bee Swarm Simulator
// Source: Bee Swarm Simulator Wiki
// Last Updated: 2026-01-03
export const codes: Code[] = [
  // ==================== ACTIVE CODES ====================
  {
    id: '1',
    code: 'ThreeBeeVee',
    reward_description: '1x Marshmallow Bee, 1x Loaded Dice, Mountain Top Field Boost x3, Winds x13',
    is_active: true,
    created_at: '2025-12-01T00:00:00.000Z'
  },
  {
    id: '2',
    code: '15MMembers',
    reward_description: '1x Red Balloon, 1x Marshmallow Bee, Seeds/Berries x15 each, Gumdrops x15, Field Boosts x4, Winds x15',
    is_active: true,
    created_at: '2025-11-01T00:00:00.000Z'
  },
  {
    id: '3',
    code: 'BeesBuzz123',
    reward_description: '1x Cloud Vial, 5x Bitterberries, 10x Gumdrops',
    is_active: true,
    created_at: '2025-10-01T00:00:00.000Z'
  },
  {
    id: '4',
    code: 'GumdropsForScience',
    reward_description: '15x Gumdrops',
    is_active: true,
    created_at: '2025-09-01T00:00:00.000Z'
  },
  {
    id: '5',
    code: 'ClubBean',
    reward_description: '1x Magic Bean, Pineapple Patch Boost x2',
    is_active: true,
    created_at: '2025-08-01T00:00:00.000Z'
  },
  {
    id: '6',
    code: '38217',
    reward_description: '5x Tickets',
    is_active: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '7',
    code: 'Bopmaster',
    reward_description: '5x Tickets',
    is_active: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '8',
    code: 'Connoisseur',
    reward_description: '5x Tickets',
    is_active: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '9',
    code: 'Crawlers',
    reward_description: '5x Tickets',
    is_active: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '10',
    code: 'Nectar',
    reward_description: '5,000 Honey',
    is_active: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '11',
    code: 'Roof',
    reward_description: '5x Tickets',
    is_active: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '12',
    code: 'Wax',
    reward_description: '5x Tickets, 5,000 Honey',
    is_active: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },

  // ==================== EXPIRED CODES ====================
  {
    id: '100',
    code: 'Soup',
    reward_description: '10x Tickets, 1x Royal Jelly, 5,000 Honey',
    is_active: false,
    created_at: '2024-06-01T00:00:00.000Z'
  },
  {
    id: '101',
    code: 'General',
    reward_description: '10,000 Honey, 5x Tickets',
    is_active: false,
    created_at: '2024-05-01T00:00:00.000Z'
  },
  {
    id: '102',
    code: 'Decaboost',
    reward_description: 'All buffs at x10',
    is_active: false,
    created_at: '2024-04-01T00:00:00.000Z'
  },
  {
    id: '103',
    code: 'PandaPower',
    reward_description: 'Temporary Panda Morph, Field Boosts, Multiple Buff Types',
    is_active: false,
    created_at: '2024-03-01T00:00:00.000Z'
  },
  {
    id: '104',
    code: 'Friday',
    reward_description: '10,000 Honey, 5x Tickets, Field Boosts, 1x Royal Jelly',
    is_active: false,
    created_at: '2024-02-01T00:00:00.000Z'
  },
  {
    id: '105',
    code: 'AnniversaBee',
    reward_description: 'Honeyday Event Rewards',
    is_active: false,
    created_at: '2023-03-01T00:00:00.000Z'
  },
  {
    id: '106',
    code: 'TrickOrTreat',
    reward_description: '1x Royal Jelly, 5x Tickets, 50x Treats, 10x Sunflower Seeds',
    is_active: false,
    created_at: '2023-10-31T00:00:00.000Z'
  },
  {
    id: '107',
    code: 'HappyNewYear',
    reward_description: '2,019 Honey, 1x Royal Jelly, 20x Gumdrops, Various Seeds/Treats',
    is_active: false,
    created_at: '2019-01-01T00:00:00.000Z'
  },
  {
    id: '108',
    code: 'SecretProfileCode',
    reward_description: '1 Billion Honey, 50x Tickets',
    is_active: false,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '109',
    code: 'RebootFriday',
    reward_description: '3x Field Dice, 3x Jelly Beans',
    is_active: false,
    created_at: '2023-12-01T00:00:00.000Z'
  },
  {
    id: '110',
    code: '5BillionParty',
    reward_description: 'Capacity Code Buff, 10x Tickets',
    is_active: false,
    created_at: '2023-11-01T00:00:00.000Z'
  },
  {
    id: '111',
    code: 'ThnxCyasToyBox',
    reward_description: '1x Star Jelly, 5x Tickets',
    is_active: false,
    created_at: '2023-10-01T00:00:00.000Z'
  },
  {
    id: '112',
    code: 'GummyBoost',
    reward_description: 'Gummy Boost Buff, 3x Gumdrops',
    is_active: false,
    created_at: '2023-09-01T00:00:00.000Z'
  },
  {
    id: '113',
    code: 'BlackBear',
    reward_description: '1x Basic Egg, 2,500 Honey',
    is_active: false,
    created_at: '2023-08-01T00:00:00.000Z'
  },
  {
    id: '114',
    code: 'MythicMoment',
    reward_description: '1x Mythic Egg (Extremely Rare Code)',
    is_active: false,
    created_at: '2023-06-01T00:00:00.000Z'
  },
  {
    id: '115',
    code: 'BeesmasReward',
    reward_description: '3x Festive Bean, 5x Gingerbread Bear',
    is_active: false,
    created_at: '2022-12-25T00:00:00.000Z'
  },
  {
    id: '116',
    code: 'SummerSun',
    reward_description: 'Sun Bear Morph, 10x Tickets',
    is_active: false,
    created_at: '2022-07-01T00:00:00.000Z'
  },
  {
    id: '117',
    code: 'PlushFriday',
    reward_description: '1x Robo Pass, 1x Festive Bean',
    is_active: false,
    created_at: '2022-06-01T00:00:00.000Z'
  },
  {
    id: '118',
    code: '2Years',
    reward_description: 'Capacity Code Buff (+25%), 2 Hours',
    is_active: false,
    created_at: '2022-03-01T00:00:00.000Z'
  },
  {
    id: '119',
    code: '1MLikes',
    reward_description: '1x Marshmallow Bee, 1x Jelly Beans',
    is_active: false,
    created_at: '2022-02-01T00:00:00.000Z'
  },
  {
    id: '120',
    code: 'WordFactory',
    reward_description: 'Capacity Code Buff (+50%), 1 Hour',
    is_active: false,
    created_at: '2022-01-01T00:00:00.000Z'
  }
]

// Code statistics
export const codeStats = {
  total: codes.length,
  active: codes.filter(c => c.is_active).length,
  expired: codes.filter(c => !c.is_active).length
}

// Get active codes only
export function getActiveCodes(): Code[] {
  return codes.filter(c => c.is_active)
}

// Get expired codes
export function getExpiredCodes(): Code[] {
  return codes.filter(c => !c.is_active)
}

// Count active codes
export function getActiveCodesCount(): number {
  return codes.filter(c => c.is_active).length
}

// Search codes
export function searchCodes(query: string): Code[] {
  const lower = query.toLowerCase()
  return codes.filter(c =>
    c.code.toLowerCase().includes(lower) ||
    c.reward_description.toLowerCase().includes(lower)
  )
}

// Get recently added codes
export function getRecentCodes(limit = 5): Code[] {
  return [...codes]
    .filter(c => c.is_active)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
}

// Get code by exact code string
export function getCodeByString(codeStr: string): Code | undefined {
  return codes.find(c => c.code.toLowerCase() === codeStr.toLowerCase())
}
