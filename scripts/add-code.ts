/**
 * Script to add new codes to Supabase
 * Usage: npx tsx scripts/add-code.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// New code to add
const newCode = {
  code: 'DiscordMillion',
  reward_description: 'x2 Honeyday Event Buff (48h), 10x Mondo Chick Blessing, Marshmallow Bee, Pink Balloon - Celebrating 1 Million Discord Members! Expires Jan 31, 2026',
  is_active: true,
}

async function addCode() {
  console.log('Adding new code:', newCode.code)

  // Check if code already exists
  const { data: existing } = await supabase
    .from('codes')
    .select('id')
    .eq('code', newCode.code)
    .single()

  if (existing) {
    console.log('Code already exists, updating...')
    const { error } = await supabase
      .from('codes')
      .update({
        reward_description: newCode.reward_description,
        is_active: newCode.is_active,
      })
      .eq('code', newCode.code)

    if (error) {
      console.error('Error updating code:', error)
      process.exit(1)
    }
    console.log('Code updated successfully!')
  } else {
    console.log('Inserting new code...')
    const { error } = await supabase
      .from('codes')
      .insert(newCode)

    if (error) {
      console.error('Error inserting code:', error)
      process.exit(1)
    }
    console.log('Code added successfully!')
  }

  // Verify
  const { data: codes } = await supabase
    .from('codes')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  console.log('\nCurrent active codes:')
  codes?.forEach((c) => {
    console.log(`- ${c.code}: ${c.reward_description}`)
  })
}

addCode()
