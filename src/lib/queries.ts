/**
 * Supabase Query Functions
 * Fetches data from Supabase database
 */

import { supabase } from './supabase'
import type { Database, Bee, Sticker, Beequip, Code, Json } from '@/types/database'

// ============================================
// BEES QUERIES
// ============================================

export async function fetchBees(): Promise<Bee[]> {
  const { data, error } = await supabase
    .from('bees')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching bees:', error)
    return []
  }
  return data || []
}

export async function fetchBeeBySlug(slug: string): Promise<Bee | null> {
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

export async function fetchStickers(): Promise<Sticker[]> {
  const { data, error } = await supabase
    .from('stickers')
    .select('*')
    .order('value', { ascending: false })

  if (error) {
    console.error('Error fetching stickers:', error)
    return []
  }
  return data || []
}

export async function fetchStickerBySlug(slug: string): Promise<Sticker | null> {
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

export async function fetchBeequips(): Promise<Beequip[]> {
  const { data, error } = await supabase
    .from('beequips')
    .select('*')
    .order('base_value', { ascending: false })

  if (error) {
    console.error('Error fetching beequips:', error)
    return []
  }
  return data || []
}

export async function fetchBeequipBySlug(slug: string): Promise<Beequip | null> {
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
