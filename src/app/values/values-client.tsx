'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { Search, SlidersHorizontal, TrendingUp, TrendingDown, Minus, LayoutGrid, List } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ItemCard } from '@/components/items/item-card'
import { RecommendedTools, recommendedToolsConfig } from '@/components/recommended-tools'
import { stickerCategories } from '@/data/stickers'
import { beequipCategories } from '@/data/beequips'
import { cn } from '@/lib/utils'
import type { Sticker, Beequip, Trend } from '@/types/database'

type SortOption = 'value-desc' | 'value-asc' | 'name-asc' | 'name-desc' | 'trend'
type ViewMode = 'grid' | 'table'

function TrendIndicator({ trend }: { trend: Trend }) {
  if (trend === 'up') {
    return <TrendingUp className="h-4 w-4 text-green-500" />
  }
  if (trend === 'down') {
    return <TrendingDown className="h-4 w-4 text-red-500" />
  }
  return <Minus className="h-4 w-4 text-muted-foreground" />
}

interface ValuesClientProps {
  initialStickers: Sticker[]
  initialBeequips: Beequip[]
}

export default function ValuesClient({ initialStickers, initialBeequips }: ValuesClientProps) {
  const stickers = initialStickers
  const beequips = initialBeequips
  const [activeTab, setActiveTab] = useState<'stickers' | 'beequips'>('stickers')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [sort, setSort] = useState<SortOption>('value-desc')
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [isMobile, setIsMobile] = useState(false)

  // Auto-switch to grid view on mobile for better UX
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Auto-switch to grid on mobile if currently in table view
      if (mobile && viewMode === 'table') {
        setViewMode('grid')
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, []) // Only run on mount

  const categories = activeTab === 'stickers' ? stickerCategories : beequipCategories
  const items = activeTab === 'stickers' ? stickers : beequips

  const filteredItems = useMemo(() => {
    let result = [...items]

    // Filter by search
    if (search) {
      const lower = search.toLowerCase()
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.category.toLowerCase().includes(lower)
      )
    }

    // Filter by category
    if (category !== 'all') {
      result = result.filter((item) => item.category === category)
    }

    // Sort
    result.sort((a, b) => {
      const aValue = 'value' in a ? a.value : a.base_value
      const bValue = 'value' in b ? b.value : b.base_value

      switch (sort) {
        case 'value-desc':
          return bValue - aValue
        case 'value-asc':
          return aValue - bValue
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'trend':
          const trendOrder = { up: 0, down: 1, stable: 2 }
          return trendOrder[a.trend] - trendOrder[b.trend]
        default:
          return 0
      }
    })

    return result
  }, [items, search, category, sort])

  const totalValue = useMemo(() => {
    return filteredItems.reduce((sum, item) => {
      const value = 'value' in item ? item.value : item.base_value
      return sum + value
    }, 0)
  }, [filteredItems])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Value List</h1>
        <p className="text-muted-foreground mt-2">
          Browse and search all tradeable items with their current market values.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => {
        setActiveTab(v as 'stickers' | 'beequips')
        setCategory('all')
      }}>
        <TabsList className="mb-6">
          <TabsTrigger value="stickers" className="gap-2">
            Stickers
            <Badge variant="secondary" className="ml-1">{stickers.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="beequips" className="gap-2">
            Beequips
            <Badge variant="secondary" className="ml-1">{beequips.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Search items"
            />
          </div>

          {/* Category Filter */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(categories).map(([key, name]) => (
                <SelectItem key={key} value={key}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="value-desc">Value: High to Low</SelectItem>
              <SelectItem value="value-asc">Value: Low to High</SelectItem>
              <SelectItem value="name-asc">Name: A-Z</SelectItem>
              <SelectItem value="name-desc">Name: Z-A</SelectItem>
              <SelectItem value="trend">Trending First</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle - hidden on mobile since table doesn't work well */}
          <div className="hidden sm:flex gap-1 border rounded-md p-1">
            <Button
              variant={viewMode === 'table' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('table')}
              aria-label="Table view"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-card rounded-lg border">
          <div>
            <span className="text-sm text-muted-foreground">Showing:</span>
            <span className="font-semibold ml-2">{filteredItems.length} items</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-sm text-muted-foreground">Total Value:</span>
            <span className="font-semibold text-honey ml-2">{totalValue.toLocaleString()}</span>
          </div>
        </div>

        {/* Content */}
        <TabsContent value="stickers" className="mt-0">
          {activeTab === 'stickers' && (viewMode === 'table' ? (
            <StickerTable items={filteredItems as Sticker[]} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {(filteredItems as Sticker[]).map((sticker) => (
                <ItemCard key={sticker.id} item={sticker} type="sticker" />
              ))}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="beequips" className="mt-0">
          {activeTab === 'beequips' && (viewMode === 'table' ? (
            <BeequipTable items={filteredItems as Beequip[]} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {(filteredItems as Beequip[]).map((beequip) => (
                <ItemCard key={beequip.id} item={beequip} type="beequip" />
              ))}
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Recommended Tools - Help users explore trading tools */}
      <RecommendedTools
        title="Now that you know the values:"
        tools={recommendedToolsConfig.afterValues}
      />
    </div>
  )
}

function StickerTable({ items }: { items: Sticker[] }) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Item</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-center">Trend</TableHead>
            <TableHead className="text-center">Obtainable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((sticker) => (
            <TableRow key={sticker.id} className="cursor-pointer hover:bg-accent/50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary/50 flex items-center justify-center relative">
                    {sticker.image_url ? (
                      <Image
                        src={sticker.image_url}
                        alt={sticker.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-lg">🐝</span>
                    )}
                  </div>
                  <span className="font-medium">{sticker.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {sticker.category.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-semibold text-honey">
                {(sticker.value ?? 0).toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <TrendIndicator trend={sticker.trend} />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={sticker.is_obtainable ? 'default' : 'secondary'}>
                  {sticker.is_obtainable ? 'Yes' : 'No'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function BeequipTable({ items }: { items: Beequip[] }) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Item</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Base Value</TableHead>
            <TableHead className="text-center">Max Potential</TableHead>
            <TableHead className="text-center">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((beequip) => (
            <TableRow key={beequip.id} className="cursor-pointer hover:bg-accent/50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary/50 flex items-center justify-center relative">
                    {beequip.image_url ? (
                      <Image
                        src={beequip.image_url}
                        alt={beequip.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-lg">🎒</span>
                    )}
                  </div>
                  <span className="font-medium">{beequip.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {beequip.category}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-semibold text-honey">
                {(beequip.base_value ?? 0).toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline">{beequip.max_potential}/5</Badge>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <TrendIndicator trend={beequip.trend} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
