/**
 * Supabase Query Functions
 * Fetches data from Supabase database
 */

import { cache } from 'react'
import { supabase } from './supabase'
import type { Database, Bee, Sticker, Beequip, Code, Json } from '@/types/database'

// ============================================
// BEES QUERIES
// ============================================

// Cached fetch for all bees - deduplicated across render
export const fetchBees = cache(async (): Promise<Bee[]> => {
  const { data, error } = await supabase
    .from('bees')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching bees:', error)
    return []
  }
  return data || []
})

// Cached fetch for single bee
export const fetchBeeBySlug = cache(async (slug: string): Promise<Bee | null> => {
  const { data, error } = await supabase
    .from('bees')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching bee:', error)
    return null
  }
  return data
})

// Fetch related bees by rarity or color (more efficient than fetching all)
export async function fetchRelatedBees(
  excludeId: string,
  rarity: string,
  color: string,
  limit = 6
): Promise<Bee[]> {
  const { data, error } = await supabase
    .from('bees')
    .select('*')
    .neq('id', excludeId)
    .or(`rarity.eq.${rarity},color.eq.${color}`)
    .limit(limit)

  if (error) {
    console.error('Error fetching related bees:', error)
    return []
  }
  return data || []
}

export async function fetchBeesByRarity(rarity: string): Promise<Bee[]> {
  const { data, error } = await supabase
    .from('bees')
    .select('*')
    .eq('rarity', rarity)
    .order('name')

  if (error) {
    console.error('Error fetching bees by rarity:', error)
    return []
  }
  return data || []
}

export async function fetchBeesByColor(color: string): Promise<Bee[]> {
  const { data, error } = await supabase
    .from('bees')
    .select('*')
    .eq('color', color)
    .order('name')

  if (error) {
    console.error('Error fetching bees by color:', error)
    return []
  }
  return data || []
}

// ============================================
// STICKERS QUERIES
// ============================================

// Cached fetch for all stickers
export const fetchStickers = cache(async (): Promise<Sticker[]> => {
  const { data, error } = await supabase
    .from('stickers')
    .select('*')
    .order('value', { ascending: false })

  if (error) {
    console.error('Error fetching stickers:', error)
    return []
  }
  return data || []
})

// Cached fetch for single sticker
export const fetchStickerBySlug = cache(async (slug: string): Promise<Sticker | null> => {
  const { data, error } = await supabase
    .from('stickers')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching sticker:', error)
    return null
  }
  return data
})

// Fetch related stickers by category (more efficient)
export async function fetchRelatedStickers(
  excludeId: string,
  category: string,
  limit = 4
): Promise<Sticker[]> {
  const { data, error } = await supabase
    .from('stickers')
    .select('*')
    .neq('id', excludeId)
    .eq('category', category)
    .order('value', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching related stickers:', error)
    return []
  }
  return data || []
}

export async function fetchStickersByCategory(category: string): Promise<Sticker[]> {
  const { data, error } = await supabase
    .from('stickers')
    .select('*')
    .eq('category', category)
    .order('value', { ascending: false })

  if (error) {
    console.error('Error fetching stickers by category:', error)
    return []
  }
  return data || []
}

export async function fetchTopValueStickers(limit = 10): Promise<Sticker[]> {
  const { data, error } = await supabase
    .from('stickers')
    .select('*')
    .order('value', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching top stickers:', error)
    return []
  }
  return data || []
}

// ============================================
// BEEQUIPS QUERIES
// ============================================

// Cached fetch for all beequips
export const fetchBeequips = cache(async (): Promise<Beequip[]> => {
  const { data, error } = await supabase
    .from('beequips')
    .select('*')
    .order('base_value', { ascending: false })

  if (error) {
    console.error('Error fetching beequips:', error)
    return []
  }
  return data || []
})

// Cached fetch for single beequip
export const fetchBeequipBySlug = cache(async (slug: string): Promise<Beequip | null> => {
  const { data, error } = await supabase
    .from('beequips')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching beequip:', error)
    return null
  }
  return data
})

// Fetch related beequips by category (more efficient)
export async function fetchRelatedBeequips(
  excludeId: string,
  category: string,
  limit = 4
): Promise<Beequip[]> {
  const { data, error } = await supabase
    .from('beequips')
    .select('*')
    .neq('id', excludeId)
    .eq('category', category)
    .order('base_value', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching related beequips:', error)
    return []
  }
  return data || []
}

// Fetch trending beequips (efficient query for recommendations)
export async function fetchTrendingBeequips(limit = 4): Promise<Beequip[]> {
  const { data, error } = await supabase
    .from('beequips')
    .select('*')
    .eq('trend', 'up')
    .order('base_value', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching trending beequips:', error)
    return []
  }
  return data || []
}

export async function fetchBeequipsByCategory(category: string): Promise<Beequip[]> {
  const { data, error } = await supabase
    .from('beequips')
    .select('*')
    .eq('category', category)
    .order('base_value', { ascending: false })

  if (error) {
    console.error('Error fetching beequips by category:', error)
    return []
  }
  return data || []
}

// ============================================
// CODES QUERIES
// ============================================

export async function fetchCodes(): Promise<Code[]> {
  const { data, error } = await supabase
    .from('codes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching codes:', error)
    return []
  }
  return data || []
}

export async function fetchActiveCodes(): Promise<Code[]> {
  const { data, error } = await supabase
    .from('codes')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching active codes:', error)
    return []
  }
  return data || []
}

export async function fetchExpiredCodes(): Promise<Code[]> {
  const { data, error } = await supabase
    .from('codes')
    .select('*')
    .eq('is_active', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching expired codes:', error)
    return []
  }
  return data || []
}

export async function fetchRecentCodes(limit = 5): Promise<Code[]> {
  const { data, error } = await supabase
    .from('codes')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent codes:', error)
    return []
  }
  return data || []
}

// ============================================
// HIVE CONFIGS QUERIES
// ============================================

export async function fetchHiveConfigByToken(shareToken: string) {
  const { data, error } = await supabase
    .from('hive_configs')
    .select('*')
    .eq('share_token', shareToken)
    .single()

  if (error) {
    console.error('Error fetching hive config:', error)
    return null
  }
  return data
}

export async function saveHiveConfig(configData: {
  share_token: string
  name?: string | null
  config: Json
  stats?: Json | null
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('hive_configs')
    .insert(configData)
    .select()
    .single()

  if (error) {
    console.error('Error saving hive config:', error)
    return null
  }
  return data
}

// ============================================
// SEARCH QUERIES
// ============================================

export interface SearchResults {
  bees: Bee[]
  stickers: Sticker[]
  beequips: Beequip[]
}

export async function searchAll(query: string): Promise<SearchResults> {
  const searchPattern = `%${query}%`

  const [beesResult, stickersResult, beequipsResult] = await Promise.all([
    supabase
      .from('bees')
      .select('*')
      .ilike('name', searchPattern)
      .order('name')
      .limit(20),
    supabase
      .from('stickers')
      .select('*')
      .ilike('name', searchPattern)
      .order('value', { ascending: false })
      .limit(20),
    supabase
      .from('beequips')
      .select('*')
      .ilike('name', searchPattern)
      .order('base_value', { ascending: false })
      .limit(20),
  ])

  return {
    bees: beesResult.data || [],
    stickers: stickersResult.data || [],
    beequips: beequipsResult.data || [],
  }
}
