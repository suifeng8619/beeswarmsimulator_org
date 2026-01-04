'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, X, Search, Scale, ArrowLeftRight, Trash2, RotateCcw, Grid3X3, BookOpen, Bot, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { stickers } from '@/data/stickers'
import { beequips } from '@/data/beequips'
import { cn } from '@/lib/utils'
import type { Sticker, Beequip } from '@/types/database'

const allItems: (Sticker | Beequip)[] = [
  ...stickers.map((s) => ({ ...s, itemType: 'sticker' as const })),
  ...beequips.map((b) => ({ ...b, itemType: 'beequip' as const })),
]

interface SelectedItem {
  item: Sticker | Beequip
  quantity: number
  itemType: 'sticker' | 'beequip'
}

function getItemValue(item: Sticker | Beequip): number {
  return 'value' in item ? item.value : item.base_value
}

export default function CalculatorClient() {
  const [yourItems, setYourItems] = useState<SelectedItem[]>([])
  const [theirItems, setTheirItems] = useState<SelectedItem[]>([])

  const yourTotal = useMemo(
    () => yourItems.reduce((sum, i) => sum + getItemValue(i.item) * i.quantity, 0),
    [yourItems]
  )

  const theirTotal = useMemo(
    () => theirItems.reduce((sum, i) => sum + getItemValue(i.item) * i.quantity, 0),
    [theirItems]
  )

  const difference = theirTotal - yourTotal
  const percentDiff = yourTotal > 0 ? ((theirTotal - yourTotal) / yourTotal) * 100 : 0

  const tradeResult = useMemo(() => {
    if (yourTotal === 0 && theirTotal === 0) return 'neutral'
    if (Math.abs(percentDiff) <= 5) return 'fair'
    if (percentDiff > 5) return 'win'
    return 'lose'
  }, [percentDiff, yourTotal, theirTotal])

  const addItem = (
    item: Sticker | Beequip,
    side: 'yours' | 'theirs',
    itemType: 'sticker' | 'beequip'
  ) => {
    const setter = side === 'yours' ? setYourItems : setTheirItems
    setter((prev) => {
      const existing = prev.find((i) => i.item.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { item, quantity: 1, itemType }]
    })
  }

  const removeItem = (itemId: string, side: 'yours' | 'theirs') => {
    const setter = side === 'yours' ? setYourItems : setTheirItems
    setter((prev) => prev.filter((i) => i.item.id !== itemId))
  }

  const updateQuantity = (itemId: string, side: 'yours' | 'theirs', delta: number) => {
    const setter = side === 'yours' ? setYourItems : setTheirItems
    setter((prev) =>
      prev
        .map((i) =>
          i.item.id === itemId
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    )
  }

  const clearAll = () => {
    setYourItems([])
    setTheirItems([])
  }

  const swapSides = () => {
    const temp = yourItems
    setYourItems(theirItems)
    setTheirItems(temp)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Trade Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Add items to each side to see if a trade is fair.
        </p>
      </div>

      {/* Scale Visualization */}
      <div className="mb-6">
        <TradeScale
          leftValue={yourTotal}
          rightValue={theirTotal}
          result={tradeResult}
          difference={difference}
          percentDiff={percentDiff}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 mb-6">
        <Button variant="outline" size="sm" onClick={swapSides} disabled={yourItems.length === 0 && theirItems.length === 0}>
          <ArrowLeftRight className="h-4 w-4 mr-2" />
          Swap
        </Button>
        <Button variant="outline" size="sm" onClick={clearAll} disabled={yourItems.length === 0 && theirItems.length === 0}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>

      {/* Trade Sides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TradeSide
          title="Your Items"
          items={yourItems}
          total={yourTotal}
          onAddItem={(item, type) => addItem(item, 'yours', type)}
          onRemoveItem={(id) => removeItem(id, 'yours')}
          onUpdateQuantity={(id, delta) => updateQuantity(id, 'yours', delta)}
          color="blue"
        />
        <TradeSide
          title="Their Items"
          items={theirItems}
          total={theirTotal}
          onAddItem={(item, type) => addItem(item, 'theirs', type)}
          onRemoveItem={(id) => removeItem(id, 'theirs')}
          onUpdateQuantity={(id, delta) => updateQuantity(id, 'theirs', delta)}
          color="green"
        />
      </div>

      {/* Related Tools */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Related Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/hive-builder">
            <Card className="h-full hover:bg-secondary/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Grid3X3 className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold">Hive Builder</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Plan your perfect hive configuration
                </p>
                <span className="text-xs text-honey flex items-center gap-1">
                  Build Hive <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/bees">
            <Card className="h-full hover:bg-secondary/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-5 w-5 text-orange-500" />
                  <h3 className="font-semibold">Bee Encyclopedia</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Learn about all bees and their abilities
                </p>
                <span className="text-xs text-honey flex items-center gap-1">
                  Explore Bees <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/advisor">
            <Card className="h-full hover:bg-secondary/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Bot className="h-5 w-5 text-pink-500" />
                  <h3 className="font-semibold">AI Trade Advisor</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Get AI-powered trading recommendations
                </p>
                <span className="text-xs text-honey flex items-center gap-1">
                  Ask Advisor <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

interface TradeScaleProps {
  leftValue: number
  rightValue: number
  result: 'win' | 'lose' | 'fair' | 'neutral'
  difference: number
  percentDiff: number
}

function TradeScale({ leftValue, rightValue, result, difference, percentDiff }: TradeScaleProps) {
  const total = leftValue + rightValue
  const maxRotation = 12
  const rotation = total === 0
    ? 0
    : Math.min(maxRotation, Math.max(-maxRotation, ((rightValue - leftValue) / (total || 1)) * 25))

  const resultConfig = {
    win: { label: 'WIN', emoji: '🎉', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/50' },
    lose: { label: 'LOSE', emoji: '❌', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' },
    fair: { label: 'FAIR', emoji: '⚖️', color: 'text-honey', bg: 'bg-honey/20', border: 'border-honey/50' },
    neutral: { label: 'ADD ITEMS', emoji: '➕', color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-muted' },
  }

  const config = resultConfig[result]

  return (
    <div className="relative">
      {/* Main Scale Container */}
      <div className="relative mx-auto max-w-2xl">
        {/* Result Badge - Top Center */}
        <div className="flex justify-center mb-4">
          <div className={cn(
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-bold text-lg',
            config.bg, config.border, config.color
          )}>
            <span>{config.emoji}</span>
            <span>{config.label}</span>
          </div>
        </div>

        {/* Scale Visual */}
        <div className="relative h-48 md:h-56">
          {/* Center Post */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-28 md:h-32">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-t-sm" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-3 bg-zinc-700 rounded-full" />
          </div>

          {/* Base Platform */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-lg shadow-lg" />

          {/* Beam Container */}
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-lg transition-transform duration-700 ease-out origin-center"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Main Beam */}
            <div className="relative h-3 mx-8 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full shadow-lg">
              {/* Center Pivot Decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-amber-400 rounded-full border-2 border-amber-600 shadow-inner" />
            </div>

            {/* Left Pan (Your Items) */}
            <div
              className="absolute -left-2 top-2 flex flex-col items-center"
              style={{ transform: `rotate(${-rotation}deg)` }}
            >
              {/* Chain */}
              <div className="flex flex-col items-center gap-0.5 mb-1">
                <div className="w-0.5 h-3 bg-zinc-500" />
                <div className="w-1 h-1 rounded-full bg-zinc-400" />
                <div className="w-0.5 h-3 bg-zinc-500" />
              </div>
              {/* Pan */}
              <div className="relative">
                <div className="w-24 md:w-28 h-12 md:h-14 bg-gradient-to-b from-blue-500/30 to-blue-600/40 rounded-b-full border-2 border-blue-400/60 shadow-lg backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-blue-300 font-medium">YOU</div>
                    <div className="text-lg md:text-xl font-bold text-white">{leftValue.toLocaleString()}</div>
                  </div>
                </div>
                {/* Pan rim highlight */}
                <div className="absolute -top-0.5 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent rounded-full" />
              </div>
            </div>

            {/* Right Pan (Their Items) */}
            <div
              className="absolute -right-2 top-2 flex flex-col items-center"
              style={{ transform: `rotate(${-rotation}deg)` }}
            >
              {/* Chain */}
              <div className="flex flex-col items-center gap-0.5 mb-1">
                <div className="w-0.5 h-3 bg-zinc-500" />
                <div className="w-1 h-1 rounded-full bg-zinc-400" />
                <div className="w-0.5 h-3 bg-zinc-500" />
              </div>
              {/* Pan */}
              <div className="relative">
                <div className="w-24 md:w-28 h-12 md:h-14 bg-gradient-to-b from-emerald-500/30 to-emerald-600/40 rounded-b-full border-2 border-emerald-400/60 shadow-lg backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-emerald-300 font-medium">THEM</div>
                    <div className="text-lg md:text-xl font-bold text-white">{rightValue.toLocaleString()}</div>
                  </div>
                </div>
                {/* Pan rim highlight */}
                <div className="absolute -top-0.5 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Difference Info */}
        {leftValue > 0 && rightValue > 0 && (
          <div className="text-center mt-2">
            <p className="text-sm text-muted-foreground">
              Difference:
              <span className={cn('font-semibold ml-1', difference > 0 ? 'text-green-400' : difference < 0 ? 'text-red-400' : 'text-muted-foreground')}>
                {difference > 0 ? '+' : ''}{difference.toLocaleString()}
              </span>
              <span className="text-muted-foreground/60 ml-1">
                ({percentDiff > 0 ? '+' : ''}{percentDiff.toFixed(1)}%)
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

interface TradeSideProps {
  title: string
  items: SelectedItem[]
  total: number
  onAddItem: (item: Sticker | Beequip, type: 'sticker' | 'beequip') => void
  onRemoveItem: (id: string) => void
  onUpdateQuantity: (id: string, delta: number) => void
  color: 'blue' | 'green'
}

function TradeSide({
  title,
  items,
  total,
  onAddItem,
  onRemoveItem,
  onUpdateQuantity,
  color,
}: TradeSideProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredItems = useMemo(() => {
    if (!search) return allItems.slice(0, 20)
    const lower = search.toLowerCase()
    return allItems
      .filter((item) => item.name.toLowerCase().includes(lower))
      .slice(0, 20)
  }, [search])

  const colorStyles = color === 'blue'
    ? { border: 'border-blue-500/30', header: 'bg-blue-500/10', accent: 'text-blue-400' }
    : { border: 'border-emerald-500/30', header: 'bg-emerald-500/10', accent: 'text-emerald-400' }

  return (
    <Card className={cn('border-2', colorStyles.border)}>
      <CardHeader className={cn('pb-3', colorStyles.header)}>
        <div className="flex items-center justify-between">
          <CardTitle className={cn('text-lg', colorStyles.accent)}>{title}</CardTitle>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-xl font-bold text-honey">
              {total.toLocaleString()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full mb-3" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Search items..."
                value={search}
                onValueChange={setSearch}
              />
              <CommandList>
                <CommandEmpty>No items found.</CommandEmpty>
                <CommandGroup heading="Stickers">
                  {filteredItems
                    .filter((i) => 'value' in i)
                    .map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.name}
                        onSelect={() => {
                          onAddItem(item, 'sticker')
                          setOpen(false)
                          setSearch('')
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="truncate">{item.name}</span>
                          <span className="text-honey text-sm ml-2">
                            {getItemValue(item).toLocaleString()}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Beequips">
                  {filteredItems
                    .filter((i) => 'base_value' in i)
                    .map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.name}
                        onSelect={() => {
                          onAddItem(item, 'beequip')
                          setOpen(false)
                          setSearch('')
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="truncate">{item.name}</span>
                          <span className="text-honey text-sm ml-2">
                            {getItemValue(item).toLocaleString()}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="space-y-2 min-h-[180px] max-h-[300px] overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-8 text-sm">
              Click "Add Item" to start
            </div>
          ) : (
            items.map((selected) => (
              <div
                key={selected.item.id}
                className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg"
              >
                <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center shrink-0 text-sm">
                  {selected.itemType === 'sticker' ? '🐝' : '🎒'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{selected.item.name}</div>
                  <div className="text-xs text-honey">
                    {getItemValue(selected.item).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onUpdateQuantity(selected.item.id, -1)}
                  >
                    -
                  </Button>
                  <span className="w-6 text-center text-sm font-medium">
                    {selected.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onUpdateQuantity(selected.item.id, 1)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive/70 hover:text-destructive"
                  onClick={() => onRemoveItem(selected.item.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
