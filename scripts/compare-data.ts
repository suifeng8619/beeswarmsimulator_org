import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { bees as staticBees } from '../src/data/bees'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

async function compareData() {
  console.log('=== 数据一致性对比 ===\n')

  // Compare Bees
  const { data: dbBees } = await supabase.from('bees').select('*')
  console.log('📊 Bees 对比:')
  console.log('   静态数据: ' + staticBees.length + ' 条')
  console.log('   数据库: ' + (dbBees?.length || 0) + ' 条')

  // Check for missing bees
  const dbBeeNames = new Set(dbBees?.map((b) => b.name))
  const staticBeeNames = new Set(staticBees.map((b) => b.name))
  const missingInDb = staticBees.filter((b) => !dbBeeNames.has(b.name))
  const extraInDb = dbBees?.filter((b) => !staticBeeNames.has(b.name)) || []

  if (missingInDb.length)
    console.log(
      '   ⚠️ 数据库缺少: ' + missingInDb.map((b) => b.name).join(', ')
    )
  if (extraInDb.length)
    console.log(
      '   ⚠️ 数据库多余: ' + extraInDb.map((b) => b.name).join(', ')
    )
  if (!missingInDb.length && !extraInDb.length)
    console.log('   ✅ 数据完全一致')

  // Sample data comparison - Basic Bee
  const sampleBee = staticBees.find((b) => b.name === 'Basic Bee')
  const dbSampleBee = dbBees?.find((b) => b.name === 'Basic Bee')
  if (sampleBee && dbSampleBee) {
    console.log('\n   Basic Bee 属性对比:')
    const checks = [
      ['rarity', sampleBee.rarity, dbSampleBee.rarity],
      ['color', sampleBee.color, dbSampleBee.color],
      ['attack', sampleBee.attack, dbSampleBee.attack],
      ['speed', sampleBee.speed, dbSampleBee.speed],
      ['energy', sampleBee.energy, dbSampleBee.energy],
    ]
    checks.forEach(([key, staticVal, dbVal]) => {
      const match = staticVal === dbVal ? '✓' : '✗'
      console.log(`   - ${key}: 静态=${staticVal}, DB=${dbVal} ${match}`)
    })
  }

  // Sample comparison - Gifted Bee (more complex)
  const giftedBee = staticBees.find((b) => b.name === 'Gifted Basic Bee')
  const dbGiftedBee = dbBees?.find((b) => b.name === 'Gifted Basic Bee')
  if (giftedBee && dbGiftedBee) {
    console.log('\n   Gifted Basic Bee 属性对比:')
    console.log(
      `   - is_gifted: 静态=${giftedBee.is_gifted}, DB=${dbGiftedBee.is_gifted}`
    )
    console.log(`   - abilities: 静态=${giftedBee.abilities?.length || 0}, DB=${dbGiftedBee.abilities?.length || 0}`)
  }

  // Check stickers count
  const { count: stickerCount } = await supabase
    .from('stickers')
    .select('*', { count: 'exact', head: true })
  console.log('\n📊 Stickers: ' + stickerCount + ' 条 (预期 282)')
  console.log(stickerCount === 282 ? '   ✅ 数量一致' : '   ⚠️ 数量不一致')

  // Check beequips count
  const { count: beequipCount } = await supabase
    .from('beequips')
    .select('*', { count: 'exact', head: true })
  console.log('\n📊 Beequips: ' + beequipCount + ' 条 (预期 41)')
  console.log(beequipCount === 41 ? '   ✅ 数量一致' : '   ⚠️ 数量不一致')

  // Check codes count
  const { count: codeCount } = await supabase
    .from('codes')
    .select('*', { count: 'exact', head: true })
  console.log('\n📊 Codes: ' + codeCount + ' 条 (预期 33)')
  console.log(codeCount === 33 ? '   ✅ 数量一致' : '   ⚠️ 数量不一致')

  // Value range checks
  console.log('\n=== 数值范围检查 ===')

  const { data: stickers } = await supabase.from('stickers').select('name, value')
  const stickerValues = stickers?.map(s => s.value).filter(v => v != null) || []
  console.log('\n📊 Sticker Values:')
  console.log(`   最小值: ${Math.min(...stickerValues)}`)
  console.log(`   最大值: ${Math.max(...stickerValues)}`)
  console.log(`   平均值: ${(stickerValues.reduce((a,b) => a+b, 0) / stickerValues.length).toFixed(2)}`)

  const { data: beequips } = await supabase.from('beequips').select('name, base_value, max_potential')
  const beequipValues = beequips?.map(b => b.base_value).filter(v => v != null) || []
  console.log('\n📊 Beequip Values:')
  console.log(`   最小 base_value: ${Math.min(...beequipValues)}`)
  console.log(`   最大 base_value: ${Math.max(...beequipValues)}`)
  console.log(`   Max potential 分布: ${[...new Set(beequips?.map(b => b.max_potential))].sort().join(', ')}`)

  // Check for any anomalies
  console.log('\n=== 异常数据检查 ===')
  const negativeStickers = stickers?.filter(s => s.value < 0)
  const zeroStickers = stickers?.filter(s => s.value === 0)
  console.log(`负值 stickers: ${negativeStickers?.length || 0}`)
  console.log(`零值 stickers: ${zeroStickers?.length || 0}`)

  const negativeBeequips = beequips?.filter(b => b.base_value < 0)
  console.log(`负值 beequips: ${negativeBeequips?.length || 0}`)
}

compareData().catch(console.error)
