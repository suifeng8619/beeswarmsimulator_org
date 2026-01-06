/**
 * Data Integrity Check Script
 * Verifies data quality in Supabase database
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

interface DataReport {
  table: string
  totalCount: number
  issues: string[]
  sampleData: any[]
}

async function checkBees(): Promise<DataReport> {
  const { data, error, count } = await supabase
    .from('bees')
    .select('*', { count: 'exact' })

  const issues: string[] = []

  if (error) {
    issues.push(`Query error: ${error.message}`)
    return { table: 'bees', totalCount: 0, issues, sampleData: [] }
  }

  const bees = data || []

  // Check for missing required fields
  const missingName = bees.filter(b => !b.name)
  const missingSlug = bees.filter(b => !b.slug)
  const missingRarity = bees.filter(b => !b.rarity)
  const missingImage = bees.filter(b => !b.image_url)
  const missingStats = bees.filter(b => b.attack === null || b.speed === null || b.energy === null)

  if (missingName.length) issues.push(`${missingName.length} bees missing name`)
  if (missingSlug.length) issues.push(`${missingSlug.length} bees missing slug`)
  if (missingRarity.length) issues.push(`${missingRarity.length} bees missing rarity`)
  if (missingImage.length) issues.push(`${missingImage.length} bees missing image_url`)
  if (missingStats.length) issues.push(`${missingStats.length} bees missing stats (attack/speed/energy)`)

  // Check for duplicates
  const slugs = bees.map(b => b.slug)
  const duplicateSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i)
  if (duplicateSlugs.length) issues.push(`Duplicate slugs: ${duplicateSlugs.join(', ')}`)

  return {
    table: 'bees',
    totalCount: count || bees.length,
    issues,
    sampleData: bees.slice(0, 3)
  }
}

async function checkStickers(): Promise<DataReport> {
  const { data, error, count } = await supabase
    .from('stickers')
    .select('*', { count: 'exact' })

  const issues: string[] = []

  if (error) {
    issues.push(`Query error: ${error.message}`)
    return { table: 'stickers', totalCount: 0, issues, sampleData: [] }
  }

  const stickers = data || []

  // Check for missing required fields
  const missingName = stickers.filter(s => !s.name)
  const missingSlug = stickers.filter(s => !s.slug)
  const missingValue = stickers.filter(s => s.value === null || s.value === undefined)
  const missingCategory = stickers.filter(s => !s.category)
  const missingImage = stickers.filter(s => !s.image_url)
  const invalidValue = stickers.filter(s => s.value !== null && s.value < 0)

  if (missingName.length) issues.push(`${missingName.length} stickers missing name`)
  if (missingSlug.length) issues.push(`${missingSlug.length} stickers missing slug`)
  if (missingValue.length) issues.push(`${missingValue.length} stickers missing value`)
  if (missingCategory.length) issues.push(`${missingCategory.length} stickers missing category`)
  if (missingImage.length) issues.push(`${missingImage.length} stickers missing image_url`)
  if (invalidValue.length) issues.push(`${invalidValue.length} stickers have negative value`)

  // Check for duplicates
  const slugs = stickers.map(s => s.slug)
  const duplicateSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i)
  if (duplicateSlugs.length) issues.push(`Duplicate slugs: ${duplicateSlugs.join(', ')}`)

  // Category distribution
  const categories = [...new Set(stickers.map(s => s.category))]
  console.log(`  Categories: ${categories.join(', ')}`)

  return {
    table: 'stickers',
    totalCount: count || stickers.length,
    issues,
    sampleData: stickers.slice(0, 3)
  }
}

async function checkBeequips(): Promise<DataReport> {
  const { data, error, count } = await supabase
    .from('beequips')
    .select('*', { count: 'exact' })

  const issues: string[] = []

  if (error) {
    issues.push(`Query error: ${error.message}`)
    return { table: 'beequips', totalCount: 0, issues, sampleData: [] }
  }

  const beequips = data || []

  // Check for missing required fields
  const missingName = beequips.filter(b => !b.name)
  const missingSlug = beequips.filter(b => !b.slug)
  const missingValue = beequips.filter(b => b.base_value === null || b.base_value === undefined)
  const missingCategory = beequips.filter(b => !b.category)
  const missingImage = beequips.filter(b => !b.image_url)
  const missingPotential = beequips.filter(b => b.max_potential === null)

  if (missingName.length) issues.push(`${missingName.length} beequips missing name`)
  if (missingSlug.length) issues.push(`${missingSlug.length} beequips missing slug`)
  if (missingValue.length) issues.push(`${missingValue.length} beequips missing base_value`)
  if (missingCategory.length) issues.push(`${missingCategory.length} beequips missing category`)
  if (missingImage.length) issues.push(`${missingImage.length} beequips missing image_url`)
  if (missingPotential.length) issues.push(`${missingPotential.length} beequips missing max_potential`)

  // Check for duplicates
  const slugs = beequips.map(b => b.slug)
  const duplicateSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i)
  if (duplicateSlugs.length) issues.push(`Duplicate slugs: ${duplicateSlugs.join(', ')}`)

  // Category distribution
  const categories = [...new Set(beequips.map(b => b.category))]
  console.log(`  Categories: ${categories.join(', ')}`)

  return {
    table: 'beequips',
    totalCount: count || beequips.length,
    issues,
    sampleData: beequips.slice(0, 3)
  }
}

async function checkCodes(): Promise<DataReport> {
  const { data, error, count } = await supabase
    .from('codes')
    .select('*', { count: 'exact' })

  const issues: string[] = []

  if (error) {
    issues.push(`Query error: ${error.message}`)
    return { table: 'codes', totalCount: 0, issues, sampleData: [] }
  }

  const codes = data || []

  // Check for missing required fields
  const missingCode = codes.filter(c => !c.code)
  const missingRewards = codes.filter(c => !c.rewards || c.rewards.length === 0)

  if (missingCode.length) issues.push(`${missingCode.length} codes missing code`)
  if (missingRewards.length) issues.push(`${missingRewards.length} codes missing rewards`)

  // Count active vs expired
  const activeCodes = codes.filter(c => c.is_active)
  const expiredCodes = codes.filter(c => !c.is_active)
  console.log(`  Active: ${activeCodes.length}, Expired: ${expiredCodes.length}`)

  return {
    table: 'codes',
    totalCount: count || codes.length,
    issues,
    sampleData: codes.slice(0, 3)
  }
}

async function checkImageUrls() {
  console.log('\n=== Checking Image URLs ===')

  // Get sample images from each table
  const { data: bees } = await supabase.from('bees').select('name, image_url').limit(5)
  const { data: stickers } = await supabase.from('stickers').select('name, image_url').limit(5)
  const { data: beequips } = await supabase.from('beequips').select('name, image_url').limit(5)

  console.log('\nBees sample images:')
  bees?.forEach(b => console.log(`  ${b.name}: ${b.image_url?.substring(0, 60)}...`))

  console.log('\nStickers sample images:')
  stickers?.forEach(s => console.log(`  ${s.name}: ${s.image_url?.substring(0, 60)}...`))

  console.log('\nBeequips sample images:')
  beequips?.forEach(b => console.log(`  ${b.name}: ${b.image_url?.substring(0, 60)}...`))
}

async function main() {
  console.log('=== BSS Nexus Data Integrity Check ===\n')
  console.log(`Supabase URL: ${supabaseUrl}\n`)

  const reports: DataReport[] = []

  console.log('Checking bees...')
  reports.push(await checkBees())

  console.log('Checking stickers...')
  reports.push(await checkStickers())

  console.log('Checking beequips...')
  reports.push(await checkBeequips())

  console.log('Checking codes...')
  reports.push(await checkCodes())

  // Print summary
  console.log('\n=== Summary Report ===\n')

  for (const report of reports) {
    console.log(`📊 ${report.table.toUpperCase()}`)
    console.log(`   Total records: ${report.totalCount}`)
    if (report.issues.length === 0) {
      console.log(`   ✅ No issues found`)
    } else {
      console.log(`   ⚠️  Issues:`)
      report.issues.forEach(issue => console.log(`      - ${issue}`))
    }
    console.log('')
  }

  await checkImageUrls()

  // Overall status
  const totalIssues = reports.reduce((sum, r) => sum + r.issues.length, 0)
  console.log('\n=== Overall Status ===')
  if (totalIssues === 0) {
    console.log('✅ All data checks passed!')
  } else {
    console.log(`⚠️  Found ${totalIssues} issues that need attention`)
  }
}

main().catch(console.error)
