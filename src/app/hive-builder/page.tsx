'use client'

import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { Search, Trash2, Share2, Grid3X3, ChevronUp, ChevronDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { bees, beeRarities } from '@/data/bees'
import { cn } from '@/lib/utils'
import type { Bee } from '@/types/database'

// Honeycomb layout matching game: 5 columns × 5 rows = 25 slots
const HIVE_LAYOUT = [5, 5, 5, 5, 5]
const HIVE_SLOTS = 25

interface HiveBee extends Bee {
  isGifted?: boolean
  level?: number
}

interface DragItem {
  bee: HiveBee
  fromSlot?: number
}

export default function HiveBuilderPage() {
  const [hiveSlots, setHiveSlots] = useState<(HiveBee | null)[]>(Array(HIVE_SLOTS).fill(null))
  const [search, setSearch] = useState('')
  const [filterRarity, setFilterRarity] = useState<string>('all')
  const [dragItem, setDragItem] = useState<DragItem | null>(null)
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [placeAsGifted, setPlaceAsGifted] = useState(false)
  const [defaultLevel, setDefaultLevel] = useState(12)

  // Touch drag state
  const [touchDragging, setTouchDragging] = useState(false)
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 })
  const touchBeeRef = useRef<HiveBee | null>(null)
  const touchFromSlotRef = useRef<number | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filteredBees = useMemo(() => {
    let result = [...bees]
    if (search) {
      const lower = search.toLowerCase()
      result = result.filter((b) => b.name.toLowerCase().includes(lower))
    }
    if (filterRarity !== 'all') {
      result = result.filter((b) => b.rarity === filterRarity)
    }
    return result
  }, [search, filterRarity])

  const hiveStats = useMemo(() => {
    const filledSlots = hiveSlots.filter((b) => b !== null) as HiveBee[]
    const rarityCount: Record<string, number> = {}
    const colorCount: Record<string, number> = { red: 0, blue: 0, colorless: 0 }
    let giftedCount = 0

    filledSlots.forEach((bee) => {
      rarityCount[bee.rarity] = (rarityCount[bee.rarity] || 0) + 1
      colorCount[bee.color] = (colorCount[bee.color] || 0) + 1
      if (bee.isGifted) giftedCount++
    })

    return {
      total: filledSlots.length,
      rarityCount,
      colorCount,
      giftedCount,
    }
  }, [hiveSlots])

  // Get rarity background color - game accurate
  const getRarityBgColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: '#CD7F32',    // Bronze
      rare: '#FFFFFF',       // White
      epic: '#FFD700',       // Gold/Yellow
      legendary: '#00CED1',  // Cyan/Aqua
      mythic: '#DDA0DD',     // Light Purple
      event: '#90EE90',      // Light Green
    }
    return colors[rarity] || '#8B7355'
  }

  // Desktop Drag Handlers
  const handleDragStart = (e: React.DragEvent, bee: Bee, fromSlot?: number) => {
    const hiveBee: HiveBee = fromSlot !== undefined
      ? (hiveSlots[fromSlot] as HiveBee)
      : { ...bee, isGifted: placeAsGifted, level: defaultLevel }
    setDragItem({ bee: hiveBee, fromSlot })
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', bee.id)
  }

  const handleDragOver = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverSlot(slotIndex)
  }

  const handleDragLeave = () => {
    setDragOverSlot(null)
  }

  const handleDrop = (e: React.DragEvent, toSlot: number) => {
    e.preventDefault()
    setDragOverSlot(null)

    if (!dragItem) return

    const newSlots = [...hiveSlots]

    if (dragItem.fromSlot !== undefined) {
      const fromSlot = dragItem.fromSlot
      if (fromSlot !== toSlot) {
        const temp = newSlots[toSlot]
        newSlots[toSlot] = newSlots[fromSlot]
        newSlots[fromSlot] = temp
      }
    } else {
      newSlots[toSlot] = dragItem.bee
    }

    setHiveSlots(newSlots)
    setDragItem(null)
  }

  const handleDragEnd = () => {
    setDragItem(null)
    setDragOverSlot(null)
  }

  // Touch Drag Handlers
  const handleTouchStart = (e: React.TouchEvent, bee: Bee, fromSlot?: number) => {
    const touch = e.touches[0]
    const hiveBee: HiveBee = fromSlot !== undefined
      ? (hiveSlots[fromSlot] as HiveBee)
      : { ...bee, isGifted: placeAsGifted, level: defaultLevel }
    touchBeeRef.current = hiveBee
    touchFromSlotRef.current = fromSlot ?? null
    setTouchPosition({ x: touch.clientX, y: touch.clientY })
    setTouchDragging(true)
    setDragItem({ bee: hiveBee, fromSlot })
  }

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchDragging) return
    e.preventDefault()
    const touch = e.touches[0]
    setTouchPosition({ x: touch.clientX, y: touch.clientY })

    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    const slotElement = element?.closest('[data-slot-index]')
    if (slotElement) {
      const slotIndex = parseInt(slotElement.getAttribute('data-slot-index') || '-1')
      setDragOverSlot(slotIndex >= 0 ? slotIndex : null)
    } else {
      setDragOverSlot(null)
    }
  }, [touchDragging])

  const handleTouchEnd = useCallback(() => {
    if (!touchDragging || !touchBeeRef.current) {
      setTouchDragging(false)
      setDragItem(null)
      setDragOverSlot(null)
      return
    }

    if (dragOverSlot !== null) {
      const newSlots = [...hiveSlots]

      if (touchFromSlotRef.current !== null) {
        const fromSlot = touchFromSlotRef.current
        if (fromSlot !== dragOverSlot) {
          const temp = newSlots[dragOverSlot]
          newSlots[dragOverSlot] = newSlots[fromSlot]
          newSlots[fromSlot] = temp
        }
      } else {
        newSlots[dragOverSlot] = touchBeeRef.current
      }

      setHiveSlots(newSlots)
    }

    setTouchDragging(false)
    setDragItem(null)
    setDragOverSlot(null)
    touchBeeRef.current = null
    touchFromSlotRef.current = null
  }, [touchDragging, dragOverSlot, hiveSlots])

  useEffect(() => {
    if (touchDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      return () => {
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [touchDragging, handleTouchMove, handleTouchEnd])

  const toggleGifted = (index: number) => {
    const newSlots = [...hiveSlots]
    if (newSlots[index]) {
      newSlots[index] = { ...newSlots[index]!, isGifted: !newSlots[index]!.isGifted }
      setHiveSlots(newSlots)
    }
  }

  const removeFromSlot = (index: number) => {
    const newSlots = [...hiveSlots]
    newSlots[index] = null
    setHiveSlots(newSlots)
  }

  const clearHive = () => {
    setHiveSlots(Array(HIVE_SLOTS).fill(null))
    toast.success('蜂巢已清空!')
  }

  const shareHive = () => {
    const config = hiveSlots.map((b) => b ? { slug: b.slug, gifted: b.isGifted, level: b.level } : null)
    const encoded = btoa(JSON.stringify(config))
    const url = `${window.location.origin}/hive-builder?config=${encoded}`
    navigator.clipboard.writeText(url)
    toast.success('分享链接已复制!')
  }

  // Render honeycomb grid with variable row sizes
  const renderHoneycombGrid = () => {
    const rows = []
    let slotIndex = 0

    for (let row = 0; row < HIVE_LAYOUT.length; row++) {
      const colsInRow = HIVE_LAYOUT[row]
      const isOffsetRow = row % 2 === 1
      const slots = []

      for (let col = 0; col < colsInRow; col++) {
        const index = slotIndex++
        const bee = hiveSlots[index]
        // Columns 0, 2, 4 (1st, 3rd, 5th) shift down by half hexagon height
        const isOffsetCol = col % 2 === 0
        slots.push(
          <HexSlot
            key={index}
            index={index}
            bee={bee}
            isOver={dragOverSlot === index}
            isDragging={!!dragItem}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            onTouchStart={handleTouchStart}
            onDoubleClick={() => bee && removeFromSlot(index)}
            onRightClick={() => bee && toggleGifted(index)}
            getRarityBgColor={getRarityBgColor}
            verticalOffset={isOffsetCol ? 57 : 0}
          />
        )
      }

      rows.push(
        <div
          key={row}
          className="flex justify-center items-start gap-0"
          style={{
            marginTop: row > 0 ? '-50px' : '0'
          }}
        >
          {slots}
        </div>
      )
    }
    return rows
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B8860B 0%, #8B7355 50%, #6B5344 100%)' }}>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-4xl">🐝</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">Hive Builder</h1>
          </div>
          <p className="text-sm lg:text-base text-yellow-100/80">
            拖拽蜜蜂到蜂巢格子中 • 双击移除 • 右键切换Gifted
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Hive Grid - Main Area */}
          <div className="order-1">
            <Card className="bg-yellow-900/40 border-yellow-600/50 backdrop-blur">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-yellow-100">
                    <span>🍯</span>
                    你的蜂巢 ({hiveStats.total}/{HIVE_SLOTS})
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={shareHive} className="border-yellow-600 text-yellow-100 hover:bg-yellow-600/20">
                      <Share2 className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">分享</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearHive} className="border-yellow-600 text-yellow-100 hover:bg-yellow-600/20">
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">清空</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Honeycomb Grid */}
                <div
                  className="relative py-6 px-2 rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #C9B84A 0%, #B5A642 50%, #A89830 100%)'
                  }}
                >
                  <div className="flex flex-col items-center">
                    {renderHoneycombGrid()}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4">
                  <StatCard label="总数" value={hiveStats.total} color="#FFD700" />
                  <StatCard label="红色" value={hiveStats.colorCount.red} color="#EF4444" />
                  <StatCard label="蓝色" value={hiveStats.colorCount.blue} color="#3B82F6" />
                  <StatCard label="无色" value={hiveStats.colorCount.colorless} color="#9CA3AF" />
                  <StatCard label="神话" value={hiveStats.rarityCount.mythic || 0} color="#DDA0DD" />
                  <StatCard label="Gifted" value={hiveStats.giftedCount} color="#FFD700" icon="✨" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bee Selection Panel */}
          <div className="order-2">
            <Card className="bg-yellow-900/40 border-yellow-600/50 backdrop-blur sticky top-4">
              <CardHeader className="pb-2">
                <button
                  className="flex items-center justify-between w-full lg:cursor-default"
                  onClick={() => isMobile && setIsPanelOpen(!isPanelOpen)}
                >
                  <CardTitle className="text-lg text-yellow-100">可用蜜蜂</CardTitle>
                  {isMobile && (isPanelOpen ? <ChevronUp className="h-5 w-5 text-yellow-100" /> : <ChevronDown className="h-5 w-5 text-yellow-100" />)}
                </button>
              </CardHeader>

              <CardContent className={cn('transition-all duration-300', !isPanelOpen && isMobile && 'h-0 overflow-hidden p-0')}>
                {/* Settings */}
                <div className="space-y-2 mb-3 p-2 rounded-lg bg-yellow-800/30 border border-yellow-600/30">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="gifted-mode" className="text-sm flex items-center gap-2 cursor-pointer text-yellow-100">
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                      Gifted
                    </Label>
                    <Switch id="gifted-mode" checked={placeAsGifted} onCheckedChange={setPlaceAsGifted} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-yellow-100">等级</Label>
                    <Input
                      type="number"
                      min={1}
                      max={25}
                      value={defaultLevel}
                      onChange={(e) => setDefaultLevel(Math.min(25, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="w-16 h-7 text-center bg-yellow-900/50 border-yellow-600/50 text-yellow-100"
                    />
                  </div>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-yellow-400" />
                  <Input
                    type="search"
                    placeholder="搜索蜜蜂..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9 bg-yellow-900/50 border-yellow-600/50 text-yellow-100 placeholder:text-yellow-400/50"
                  />
                </div>

                {/* Rarity Filter */}
                <div className="flex gap-1 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                  <RarityButton rarity="all" current={filterRarity} onClick={setFilterRarity} />
                  {Object.keys(beeRarities).map((key) => (
                    <RarityButton key={key} rarity={key} current={filterRarity} onClick={setFilterRarity} getRarityBgColor={getRarityBgColor} />
                  ))}
                </div>

                {/* Bee List */}
                <ScrollArea className={cn('pr-2', isMobile ? 'h-[200px]' : 'h-[450px]')}>
                  <div className="grid grid-cols-3 gap-2">
                    {filteredBees.map((bee) => (
                      <BeeCard
                        key={bee.id}
                        bee={bee}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onTouchStart={handleTouchStart}
                        getRarityBgColor={getRarityBgColor}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Legend */}
        <Card className="mt-4 bg-yellow-900/40 border-yellow-600/50 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-yellow-100">
              <span className="font-semibold">稀有度:</span>
              {Object.entries(beeRarities).map(([key, { name }]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded border border-black/30"
                    style={{ backgroundColor: getRarityBgColor(key) }}
                  />
                  <span className="text-yellow-200/80">{name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Touch Drag Ghost */}
      {touchDragging && dragItem && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: touchPosition.x - 44,
            top: touchPosition.y - 38,
          }}
        >
          <div
            className="w-[88px] h-[76px] flex items-center justify-center shadow-lg"
            style={{
              backgroundColor: getRarityBgColor(dragItem.bee.rarity),
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              border: '2px solid #9B9B4D',
            }}
          >
            {dragItem.bee.image_url ? (
              <img src={dragItem.bee.image_url} alt={dragItem.bee.name} className="w-14 h-14 object-contain" />
            ) : (
              <span className="text-4xl">🐝</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Hexagon Slot Component - True hexagon shape like in game
function HexSlot({
  index,
  bee,
  isOver,
  isDragging,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  onTouchStart,
  onDoubleClick,
  onRightClick,
  getRarityBgColor,
  verticalOffset = 0,
}: {
  index: number
  bee: HiveBee | null
  isOver: boolean
  isDragging: boolean
  onDragStart: (e: React.DragEvent, bee: Bee, fromSlot: number) => void
  onDragOver: (e: React.DragEvent, index: number) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent, index: number) => void
  onDragEnd: () => void
  onTouchStart: (e: React.TouchEvent, bee: Bee, fromSlot: number) => void
  onDoubleClick: () => void
  onRightClick: () => void
  getRarityBgColor: (rarity: string) => string
  verticalOffset?: number
}) {
  // Hexagon dimensions - larger for better visibility
  const width = 130
  const height = 113

  // Game accurate colors: olive for empty, rarity color when filled
  const bgColor = bee ? getRarityBgColor(bee.rarity) : '#8B8B3D' // Olive green like game
  const borderColor = bee?.isGifted ? '#FFD700' : '#9B9B4D' // Subtle border

  return (
    <div
      data-slot-index={index}
      draggable={!!bee}
      onDragStart={bee ? (e) => onDragStart(e, bee, index) : undefined}
      onDragOver={(e) => onDragOver(e, index)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      onTouchStart={bee ? (e) => onTouchStart(e, bee, index) : undefined}
      onDoubleClick={onDoubleClick}
      onContextMenu={(e) => {
        e.preventDefault()
        onRightClick()
      }}
      className={cn(
        "relative cursor-pointer select-none touch-none transition-transform duration-150",
        "hover:scale-110 hover:z-10",
        isOver && "scale-110 z-20",
        bee?.isGifted && "animate-pulse"
      )}
      style={{ width, height, marginLeft: '-9px', marginRight: '-9px', marginTop: verticalOffset }}
    >
      {/* Outer hexagon (border) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: borderColor,
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          boxShadow: isOver ? '0 0 20px rgba(255, 215, 0, 0.8)' : bee?.isGifted ? '0 0 10px rgba(255, 215, 0, 0.6)' : 'none',
        }}
      />

      {/* Inner hexagon (content) */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: 2,
          left: 2,
          right: 2,
          bottom: 2,
          backgroundColor: bgColor,
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
        }}
      >
        {bee ? (
          <>
            {/* Bee face */}
            {bee.image_url ? (
              <img
                src={bee.image_url}
                alt={bee.name}
                className="w-14 h-14 object-contain pointer-events-none"
                draggable={false}
              />
            ) : (
              <span className="text-4xl">🐝</span>
            )}

            {/* Level number */}
            <span
              className="absolute text-sm font-bold text-white drop-shadow-md"
              style={{
                top: 10,
                left: 14,
                textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8)'
              }}
            >
              {bee.level || 1}
            </span>

            {/* Gifted star */}
            {bee.isGifted && (
              <span className="absolute top-2 right-3 text-sm">⭐</span>
            )}
          </>
        ) : (
          <span
            className="text-sm font-medium opacity-50"
            style={{ color: '#6B6B2D' }}
          >
            {index + 1}
          </span>
        )}
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon?: string }) {
  return (
    <div className="p-2 rounded-lg bg-yellow-900/50 border border-yellow-600/30 text-center">
      <div className="text-lg sm:text-xl font-bold flex items-center justify-center gap-1" style={{ color }}>
        {icon && <span className="text-sm">{icon}</span>}
        {value}
      </div>
      <div className="text-[10px] sm:text-xs text-yellow-200/70">{label}</div>
    </div>
  )
}

// Rarity Filter Button
function RarityButton({
  rarity,
  current,
  onClick,
  getRarityBgColor,
}: {
  rarity: string
  current: string
  onClick: (r: string) => void
  getRarityBgColor?: (rarity: string) => string
}) {
  const isActive = current === rarity
  const label = rarity === 'all' ? '全部' : beeRarities[rarity as keyof typeof beeRarities]?.name || rarity
  const bgColor = getRarityBgColor ? getRarityBgColor(rarity) : '#6B5B4F'

  return (
    <button
      onClick={() => onClick(rarity)}
      className={cn(
        "px-2 py-1 rounded text-xs font-medium shrink-0 transition-all border-2",
        isActive ? "ring-2 ring-yellow-400 ring-offset-1 ring-offset-yellow-900" : "opacity-70 hover:opacity-100"
      )}
      style={{
        backgroundColor: rarity === 'all' ? '#6B5B4F' : bgColor,
        borderColor: '#DAA520',
        color: rarity === 'rare' || rarity === 'epic' ? '#1f2937' : '#fff',
      }}
    >
      {label}
    </button>
  )
}

// Bee Card Component
function BeeCard({
  bee,
  onDragStart,
  onDragEnd,
  onTouchStart,
  getRarityBgColor,
}: {
  bee: Bee
  onDragStart: (e: React.DragEvent, bee: Bee) => void
  onDragEnd: () => void
  onTouchStart: (e: React.TouchEvent, bee: Bee) => void
  getRarityBgColor: (rarity: string) => string
}) {
  const bgColor = getRarityBgColor(bee.rarity)

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, bee)}
      onDragEnd={onDragEnd}
      onTouchStart={(e) => onTouchStart(e, bee)}
      className={cn(
        "p-2 rounded-lg border-2 transition-all",
        "cursor-grab active:cursor-grabbing touch-none select-none",
        "hover:scale-105 hover:shadow-lg"
      )}
      style={{
        backgroundColor: bgColor,
        borderColor: '#DAA520',
      }}
    >
      <div className="h-10 w-10 mx-auto flex items-center justify-center">
        {bee.image_url ? (
          <img
            src={bee.image_url}
            alt={bee.name}
            className="h-9 w-9 object-contain pointer-events-none"
            draggable={false}
          />
        ) : (
          <span className="text-xl">🐝</span>
        )}
      </div>
      <div
        className="text-[10px] text-center mt-1 truncate font-medium"
        style={{ color: bee.rarity === 'rare' || bee.rarity === 'epic' ? '#1f2937' : '#fff' }}
      >
        {bee.name}
      </div>
    </div>
  )
}
