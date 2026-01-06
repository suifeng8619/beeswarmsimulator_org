'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ArrowUpDown, Zap, Sword, Wind, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { beeRarities, beeColors } from '@/data/bees'
import { cn } from '@/lib/utils'
import type { Bee } from '@/types/database'

type SortKey = 'name' | 'rarity' | 'attack' | 'speed' | 'energy' | 'gather_amount'
type SortOrder = 'asc' | 'desc'

const rarityOrder = ['common', 'rare', 'epic', 'legendary', 'mythic', 'event']

interface BeesClientProps {
  initialBees: Bee[]
}

export default function BeesClient({ initialBees }: BeesClientProps) {
  const bees = initialBees
  const [search, setSearch] = useState('')
  const [filterRarity, setFilterRarity] = useState<string>('all')
  const [filterColor, setFilterColor] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('rarity')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const filteredBees = useMemo(() => {
    let result = [...bees]

    // Search filter
    if (search) {
      const lower = search.toLowerCase()
      result = result.filter(b =>
        b.name.toLowerCase().includes(lower) ||
        b.description?.toLowerCase().includes(lower) ||
        b.abilities.some(a => a.toLowerCase().includes(lower))
      )
    }

    // Rarity filter
    if (filterRarity !== 'all') {
      result = result.filter(b => b.rarity === filterRarity)
    }

    // Color filter
    if (filterColor !== 'all') {
      result = result.filter(b => b.color === filterColor)
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0
      if (sortKey === 'rarity') {
        comparison = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
      } else if (sortKey === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else {
        const aVal = a[sortKey] ?? 0
        const bVal = b[sortKey] ?? 0
        comparison = (aVal as number) - (bVal as number)
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return result
  }, [search, filterRarity, filterColor, sortKey, sortOrder])

  const getRarityBgColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: '#CD7F32',
      rare: '#C0C0C0',
      epic: '#FCD34D',
      legendary: '#40E0D0',
      mythic: '#FFB6C1',
      event: '#90EE90',
    }
    return colors[rarity] || '#6B5B4F'
  }

  const getRarityTextColor = (rarity: string) => {
    return rarity === 'common' ? '#fff' : '#1f2937'
  }

  const getColorBadge = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      red: { bg: '#FEE2E2', text: '#DC2626' },
      blue: { bg: '#E0F2FE', text: '#0891B2' },
      colorless: { bg: '#F5F5F4', text: '#78716C' },
    }
    return colors[color] || colors.colorless
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const stats = useMemo(() => {
    const byRarity: Record<string, number> = {}
    const byColor: Record<string, number> = {}
    bees.forEach(b => {
      byRarity[b.rarity] = (byRarity[b.rarity] || 0) + 1
      byColor[b.color] = (byColor[b.color] || 0) + 1
    })
    return { byRarity, byColor }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-5xl">🐝</span>
            <h1 className="text-4xl font-bold text-amber-900">Bee Encyclopedia</h1>
          </div>
          <p className="text-amber-700">
            Complete guide to all {bees.length} bees in Bee Swarm Simulator
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          {Object.entries(beeRarities).map(([key, { name }]) => (
            <div key={key} className="overflow-hidden rounded-xl shadow-md">
              <div className="p-3 text-center" style={{ backgroundColor: getRarityBgColor(key) }}>
                <div className="text-2xl font-bold" style={{ color: getRarityTextColor(key) }}>
                  {stats.byRarity[key] || 0}
                </div>
                <div className="text-sm font-medium" style={{ color: getRarityTextColor(key) }}>
                  {name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6 bg-amber-100/80 backdrop-blur-sm rounded-xl shadow-md border border-amber-200/50">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-500" />
                <input
                  type="search"
                  placeholder="Search bees by name, ability, or description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-300 bg-white/80 text-amber-900 placeholder:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  aria-label="Search bees"
                />
              </div>

              {/* Rarity Filter */}
              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => setFilterRarity('all')}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                    filterRarity === 'all'
                      ? "bg-amber-500 text-white"
                      : "bg-white/60 text-amber-800 hover:bg-amber-200"
                  )}
                >
                  All
                </button>
                {Object.entries(beeRarities).map(([key, { name }]) => (
                  <button
                    key={key}
                    onClick={() => setFilterRarity(key)}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
                    style={{
                      backgroundColor: filterRarity === key ? getRarityBgColor(key) : 'rgba(255,255,255,0.6)',
                      color: filterRarity === key ? getRarityTextColor(key) : '#92400e',
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>

              {/* Color Filter */}
              <div className="flex gap-1">
                <button
                  onClick={() => setFilterColor('all')}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                    filterColor === 'all'
                      ? "bg-amber-500 text-white"
                      : "bg-white/60 text-amber-800 hover:bg-amber-200"
                  )}
                >
                  All Colors
                </button>
                {Object.entries(beeColors).map(([key, { name, color }]) => (
                  <button
                    key={key}
                    onClick={() => setFilterColor(key)}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5",
                      filterColor === key
                        ? "bg-amber-500 text-white"
                        : "bg-white/60 text-amber-800 hover:bg-amber-200"
                    )}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-amber-300"
                      style={{ backgroundColor: color }}
                    />
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="text-sm text-amber-700 flex items-center gap-1">
                <ArrowUpDown className="h-4 w-4" /> Sort:
              </span>
              {[
                { key: 'rarity' as SortKey, label: 'Rarity' },
                { key: 'name' as SortKey, label: 'Name' },
                { key: 'attack' as SortKey, label: 'Attack' },
                { key: 'speed' as SortKey, label: 'Speed' },
                { key: 'energy' as SortKey, label: 'Energy' },
                { key: 'gather_amount' as SortKey, label: 'Gather' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => toggleSort(key)}
                  className={cn(
                    "px-3 py-1 text-sm font-medium rounded-lg transition-colors",
                    sortKey === key
                      ? "bg-amber-500 text-white"
                      : "text-amber-700 hover:bg-amber-200"
                  )}
                >
                  {label}
                  {sortKey === key && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-amber-700">
          Showing {filteredBees.length} of {bees.length} bees
        </div>

        {/* Bee Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredBees.map((bee) => (
            <BeeCard key={bee.id} bee={bee} getRarityBgColor={getRarityBgColor} getRarityTextColor={getRarityTextColor} getColorBadge={getColorBadge} />
          ))}
        </div>

        {filteredBees.length === 0 && (
          <div className="text-center py-12 text-amber-600">
            No bees found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
}

function BeeCard({
  bee,
  getRarityBgColor,
  getRarityTextColor,
  getColorBadge,
}: {
  bee: Bee
  getRarityBgColor: (rarity: string) => string
  getRarityTextColor: (rarity: string) => string
  getColorBadge: (color: string) => { bg: string; text: string }
}) {
  const colorBadge = getColorBadge(bee.color)

  return (
    <Link href={`/bees/${bee.slug}`}>
      <div className="overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer h-full rounded-xl shadow-md bg-amber-50">
        {/* Header with rarity color */}
        <div
          className="p-4 text-center relative"
          style={{ backgroundColor: getRarityBgColor(bee.rarity) }}
        >
          {bee.image_url ? (
            <img
              src={bee.image_url}
              alt={bee.name}
              className="w-20 h-20 mx-auto object-contain drop-shadow-md"
            />
          ) : (
            <span className="text-6xl">🐝</span>
          )}
        </div>

        <div className="p-3">
          {/* Name */}
          <h2 className="font-bold text-sm text-center mb-2 line-clamp-1 text-amber-900">{bee.name}</h2>

          {/* Badges */}
          <div className="flex justify-center gap-1 mb-2 flex-wrap">
            <Badge
              variant="secondary"
              className="text-[10px] border-0"
              style={{
                backgroundColor: getRarityBgColor(bee.rarity),
                color: getRarityTextColor(bee.rarity),
              }}
            >
              {beeRarities[bee.rarity as keyof typeof beeRarities]?.name}
            </Badge>
            <Badge
              variant="secondary"
              className="text-[10px] border-0"
              style={{
                backgroundColor: colorBadge.bg,
                color: colorBadge.text,
              }}
            >
              {beeColors[bee.color as keyof typeof beeColors]?.name}
            </Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-amber-800">
            <div className="flex items-center gap-1">
              <Sword className="h-3 w-3 text-red-500" />
              <span>{bee.attack}</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-3 w-3 text-cyan-600" />
              <span>{bee.speed}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-amber-500" />
              <span>{bee.energy === 999999999 ? '∞' : bee.energy}</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-emerald-500" />
              <span>{bee.gather_amount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
