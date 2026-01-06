/**
 * Data Migration Script
 * Migrates static TypeScript data to Supabase
 *
 * Usage:
 *   npx tsx scripts/migrate-data.ts
 *
 * Prerequisites:
 *   1. Create .env.local with Supabase credentials
 *   2. Run supabase-schema.sql in Supabase SQL Editor
 *   3. npm install tsx (if not installed)
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
  console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✓' : '✗')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Import static data
import { bees } from '../src/data/bees'
import { stickers } from '../src/data/stickers'
import { beequips } from '../src/data/beequips'
import { codes } from '../src/data/codes'

async function migrateBees() {
  console.log('\n🐝 Migrating bees...')

  const beesData = bees.map(bee => ({
    name: bee.name,
    slug: bee.slug,
    rarity: bee.rarity,
    color: bee.color,
    energy: bee.energy,
    speed: bee.speed,
    attack: bee.attack,
    gather_amount: bee.gather_amount,
    image_url: bee.image_url,
    description: bee.description,
    abilities: bee.abilities,
    gifted_ability: bee.gifted_ability,
    obtain_method: bee.obtain_method,
  }))

  const { data, error } = await supabase
    .from('bees')
    .upsert(beesData, { onConflict: 'slug' })
    .select()

  if (error) {
    console.error('❌ Error migrating bees:', error.message)
    return false
  }

  console.log(`✅ Migrated ${beesData.length} bees`)
  return true
}

async function migrateStickers() {
  console.log('\n🏷️ Migrating stickers...')

  const stickersData = stickers.map(sticker => ({
    name: sticker.name,
    slug: sticker.slug,
    category: sticker.category,
    image_url: sticker.image_url,
    value: sticker.value,
    trend: sticker.trend,
    is_obtainable: sticker.is_obtainable,
  }))

  const { data, error } = await supabase
    .from('stickers')
    .upsert(stickersData, { onConflict: 'slug' })
    .select()

  if (error) {
    console.error('❌ Error migrating stickers:', error.message)
    return false
  }

  console.log(`✅ Migrated ${stickersData.length} stickers`)
  return true
}

async function migrateBeequips() {
  console.log('\n🎒 Migrating beequips...')

  const beequipsData = beequips.map(beequip => ({
    name: beequip.name,
    slug: beequip.slug,
    category: beequip.category,
    image_url: beequip.image_url,
    base_value: beequip.base_value,
    max_potential: beequip.max_potential,
    trend: beequip.trend,
  }))

  const { data, error } = await supabase
    .from('beequips')
    .upsert(beequipsData, { onConflict: 'slug' })
    .select()

  if (error) {
    console.error('❌ Error migrating beequips:', error.message)
    return false
  }

  console.log(`✅ Migrated ${beequipsData.length} beequips`)
  return true
}

async function migrateCodes() {
  console.log('\n🎫 Migrating codes...')

  const codesData = codes.map(code => ({
    code: code.code,
    reward_description: code.reward_description,
    is_active: code.is_active,
  }))

  const { data, error } = await supabase
    .from('codes')
    .upsert(codesData, { onConflict: 'code' })
    .select()

  if (error) {
    console.error('❌ Error migrating codes:', error.message)
    return false
  }

  console.log(`✅ Migrated ${codesData.length} codes`)
  return true
}

async function main() {
  console.log('🚀 Starting data migration to Supabase...')
  console.log('   URL:', supabaseUrl)

  const results = await Promise.all([
    migrateBees(),
    migrateStickers(),
    migrateBeequips(),
    migrateCodes(),
  ])

  const allSuccess = results.every(r => r)

  if (allSuccess) {
    console.log('\n✅ All data migrated successfully!')
    console.log('\n📝 Next steps:')
    console.log('   1. Verify data in Supabase Dashboard → Table Editor')
    console.log('   2. Update src/data/*.ts to fetch from Supabase')
    console.log('   3. Test the application')
  } else {
    console.log('\n⚠️ Some migrations failed. Check errors above.')
  }
}

main().catch(console.error)
