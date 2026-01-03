import { Code } from '@/types/database'

// Active and expired codes for Bee Swarm Simulator
export const codes: Code[] = [
  // Active Codes
  {
    id: '1',
    code: 'PlushFriday',
    reward_description: '1x Robo Pass, 1x Festive Bean',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    code: '2Years',
    reward_description: 'Capacity Code Buff (+25%), 2 hours',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    code: '1MLikes',
    reward_description: '1x Marshmallow Bee, 1x Jelly Beans',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    code: 'WordFactory',
    reward_description: 'Capacity Code Buff (+50%), 1 hour',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    code: 'WalmartToys',
    reward_description: '1x Gingerbread Bear, 3x Jelly Beans',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    code: 'Sure',
    reward_description: '2500 Honey, 1x Royal Jelly',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    code: 'Wax',
    reward_description: '2500 Honey, 1x Bitterberry',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    code: 'Nectar',
    reward_description: '2500 Honey, 1x Neonberry',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    code: 'Cog',
    reward_description: 'Capacity Code Buff (+25%), 30 min',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '10',
    code: 'Teespring',
    reward_description: '1x Marshmallow Bee, 3x Jelly Beans',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '11',
    code: 'ClubBasic',
    reward_description: '2500 Honey, 1x Micro-Converter',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '12',
    code: 'Buzz',
    reward_description: '5000 Honey',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '13',
    code: 'Bopmaster',
    reward_description: '5x Tickets, 5x Gumdrops',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '14',
    code: 'Roof',
    reward_description: '5000 Honey, 1x Micro-Converter',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '15',
    code: 'Connoisseur',
    reward_description: '5x Tickets, 1x Jelly Beans',
    is_active: true,
    created_at: new Date().toISOString()
  },

  // Expired Codes (for reference)
  {
    id: '16',
    code: 'SecretProfileCode',
    reward_description: '1 billion Honey, 50x Tickets',
    is_active: false,
    created_at: new Date('2024-01-01').toISOString()
  },
  {
    id: '17',
    code: 'RebootFriday',
    reward_description: '3x Field Dice, 3x Jelly Beans',
    is_active: false,
    created_at: new Date('2023-12-01').toISOString()
  },
  {
    id: '18',
    code: '5BillionParty',
    reward_description: 'Capacity Code Buff, 10x Tickets',
    is_active: false,
    created_at: new Date('2023-11-01').toISOString()
  },
  {
    id: '19',
    code: 'ThnxCyasToyBox',
    reward_description: '1x Star Jelly, 5x Tickets',
    is_active: false,
    created_at: new Date('2023-10-01').toISOString()
  },
  {
    id: '20',
    code: 'GummyBoost',
    reward_description: 'Gummy Boost Buff, 3x Gumdrops',
    is_active: false,
    created_at: new Date('2023-09-01').toISOString()
  },
  {
    id: '21',
    code: 'BlackBear',
    reward_description: '1x Basic Egg, 2500 Honey',
    is_active: false,
    created_at: new Date('2023-08-01').toISOString()
  },
  {
    id: '22',
    code: 'BeesBuzz123',
    reward_description: '5000 Honey, 5x Tickets',
    is_active: false,
    created_at: new Date('2023-07-01').toISOString()
  },
  {
    id: '23',
    code: 'MythicMoment',
    reward_description: '1x Mythic Egg (extremely rare code)',
    is_active: false,
    created_at: new Date('2023-06-01').toISOString()
  },
  {
    id: '24',
    code: 'BeesmasReward',
    reward_description: '3x Festive Bean, 5x Gingerbread Bear',
    is_active: false,
    created_at: new Date('2022-12-25').toISOString()
  },
  {
    id: '25',
    code: 'SummerSun',
    reward_description: 'Sun Bear Morph, 10x Tickets',
    is_active: false,
    created_at: new Date('2022-07-01').toISOString()
  }
]

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
