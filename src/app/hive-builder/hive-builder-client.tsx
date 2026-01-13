'use client'

import { useState, useMemo, useRef, useCallback, useEffect, memo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import html2canvas from 'html2canvas'
import { Search, Trash2, Share2, ChevronUp, ChevronDown, Sparkles, Minus, Plus, Calculator, Scale, Bot, ArrowRight, Copy, MessageCircle, Send, Undo2, Redo2, Download, Save, FolderOpen, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { bees, beeRarities } from '@/data/bees'
import { cn } from '@/lib/utils'
import { BeeDetailModal } from '@/components/bee-detail-modal'
import { useHistory } from '@/hooks/use-history'
import type { Bee } from '@/types/database'

// Honeycomb layout matching game: 5 columns × 5 rows = 25 slots
const HIVE_LAYOUT = [5, 5, 5, 5, 5]
const HIVE_SLOTS = 25
const STORAGE_KEY = 'bss-hive-builder-config'
const SAVED_CONFIGS_KEY = 'bss-hive-builder-saved-configs'

// Types
interface HiveBee extends Bee {
  isGifted?: boolean
  level?: number
}

interface DragItem {
  bee: HiveBee
  fromSlot?: number
}

interface SavedConfig {
  id: string
  name: string
  data: string
  createdAt: number
}

interface HiveSlotConfig {
  slug: string
  gifted?: boolean
  level?: number
}

// Rarity colors - moved outside component to avoid recreation
const RARITY_COLORS: Record<string, string> = {
  common: '#CD7F32',
  rare: '#FFFFFF',
  epic: '#FFD700',
  legendary: '#00CED1',
  mythic: '#DDA0DD',
  event: '#90EE90',
}

function getRarityBgColor(rarity: string): string {
  return RARITY_COLORS[rarity] || '#8B7355'
}

// Parse hive config from encoded string
function parseHiveConfig(encoded: string): (HiveBee | null)[] {
  try {
    const decoded = atob(encoded)
    const config: (HiveSlotConfig | null)[] = JSON.parse(decoded)
    return config.map(item => {
      if (!item) return null
      const bee = bees.find(b => b.slug === item.slug)
      if (!bee) return null
      return { ...bee, isGifted: item.gifted, level: item.level || 12 }
    })
  } catch {
    return Array(HIVE_SLOTS).fill(null)
  }
}

// Serialize hive slots to config
function serializeHiveConfig(slots: (HiveBee | null)[]): string {
  const config = slots.map(b => b ? { slug: b.slug, gifted: b.isGifted, level: b.level } : null)
  return btoa(JSON.stringify(config))
}

export default function HiveBuilderClient() {
  const searchParams = useSearchParams()

  // Use custom history hook for undo/redo
  const {
    state: hiveSlots,
    setState: setHiveSlots,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory<(HiveBee | null)[]>(Array(HIVE_SLOTS).fill(null), { maxHistory: 50 })

  const [search, setSearch] = useState('')
  const [filterRarity, setFilterRarity] = useState<string>('all')
  const [dragItem, setDragItem] = useState<DragItem | null>(null)
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [placeAsGifted, setPlaceAsGifted] = useState(false)
  const [defaultLevel, setDefaultLevel] = useState(12)
  const [selectedBee, setSelectedBee] = useState<Bee | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Saved configs state
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>([])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showLoadDialog, setShowLoadDialog] = useState(false)
  const [newConfigName, setNewConfigName] = useState('')

  // Touch drag state
  const [touchDragging, setTouchDragging] = useState(false)
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 })
  const touchBeeRef = useRef<HiveBee | null>(null)
  const touchFromSlotRef = useRef<number | null>(null)
  const hiveSlotsRef = useRef(hiveSlots)
  hiveSlotsRef.current = hiveSlots

  // Ref for export
  const hiveGridRef = useRef<HTMLDivElement>(null)

  // Keyboard shortcuts (Ctrl+Z/Y)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (canUndo) {
          undo()
          toast.success('Undo')
        }
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        if (canRedo) {
          redo()
          toast.success('Redo')
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canUndo, canRedo, undo, redo])

  // Load saved configs from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVED_CONFIGS_KEY)
      if (saved) {
        setSavedConfigs(JSON.parse(saved))
      }
    } catch {
      // localStorage not available
    }
  }, [])

  // Load config from URL or localStorage on mount
  useEffect(() => {
    const configParam = searchParams.get('config')
    if (configParam) {
      const loaded = parseHiveConfig(configParam)
      setHiveSlots(loaded)
      toast.success('Hive configuration loaded from link!')
    } else {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const loaded = parseHiveConfig(saved)
          setHiveSlots(loaded)
        }
      } catch {
        // localStorage not available
      }
    }
    setIsInitialized(true)
  }, [searchParams, setHiveSlots])

  // Save to localStorage when hiveSlots changes
  useEffect(() => {
    if (!isInitialized) return
    try {
      const encoded = serializeHiveConfig(hiveSlots)
      localStorage.setItem(STORAGE_KEY, encoded)
    } catch {
      // localStorage not available
    }
  }, [hiveSlots, isInitialized])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Sync all hive bees to defaultLevel when it changes
  useEffect(() => {
    setHiveSlots(prev => {
      const needsUpdate = prev.some(bee => bee && bee.level !== defaultLevel)
      if (!needsUpdate) return prev
      return prev.map(bee => {
        if (bee && bee.level !== defaultLevel) {
          return { ...bee, level: defaultLevel }
        }
        return bee
      })
    })
  }, [defaultLevel, setHiveSlots])

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

    return { total: filledSlots.length, rarityCount, colorCount, giftedCount }
  }, [hiveSlots])

  // Desktop Drag Handlers - wrapped with useCallback
  const handleDragStart = useCallback((e: React.DragEvent, bee: Bee, fromSlot?: number) => {
    const hiveBee: HiveBee = fromSlot !== undefined
      ? (hiveSlotsRef.current[fromSlot] as HiveBee)
      : { ...bee, isGifted: placeAsGifted, level: defaultLevel }
    setDragItem({ bee: hiveBee, fromSlot })
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', bee.id)
  }, [placeAsGifted, defaultLevel])

  const handleDragOver = useCallback((e: React.DragEvent, slotIndex: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverSlot(slotIndex)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOverSlot(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, toSlot: number) => {
    e.preventDefault()
    setDragOverSlot(null)

    if (!dragItem) return

    const newSlots = [...hiveSlotsRef.current]

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
  }, [dragItem, setHiveSlots])

  const handleDragEnd = useCallback(() => {
    setDragItem(null)
    setDragOverSlot(null)
  }, [])

  // Touch Drag Handlers
  const handleTouchStart = useCallback((e: React.TouchEvent, bee: Bee, fromSlot?: number) => {
    const touch = e.touches[0]
    const hiveBee: HiveBee = fromSlot !== undefined
      ? (hiveSlotsRef.current[fromSlot] as HiveBee)
      : { ...bee, isGifted: placeAsGifted, level: defaultLevel }
    touchBeeRef.current = hiveBee
    touchFromSlotRef.current = fromSlot ?? null
    setTouchPosition({ x: touch.clientX, y: touch.clientY })
    setTouchDragging(true)
    setDragItem({ bee: hiveBee, fromSlot })
  }, [placeAsGifted, defaultLevel])

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
      const newSlots = [...hiveSlotsRef.current]

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
  }, [touchDragging, dragOverSlot, setHiveSlots])

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

  const toggleGifted = useCallback((index: number) => {
    setHiveSlots(prev => {
      const newSlots = [...prev]
      if (newSlots[index]) {
        newSlots[index] = { ...newSlots[index]!, isGifted: !newSlots[index]!.isGifted }
      }
      return newSlots
    })
  }, [setHiveSlots])

  const removeFromSlot = useCallback((index: number) => {
    setHiveSlots(prev => {
      const newSlots = [...prev]
      newSlots[index] = null
      return newSlots
    })
  }, [setHiveSlots])

  const clearHive = useCallback(() => {
    setHiveSlots(Array(HIVE_SLOTS).fill(null))
    toast.success('Hive cleared!')
  }, [setHiveSlots])

  // Generate share URL
  const getShareUrl = useCallback(() => {
    const encoded = serializeHiveConfig(hiveSlots)
    return `${window.location.origin}/hive-builder?config=${encoded}`
  }, [hiveSlots])

  // Copy link to clipboard
  const copyShareLink = useCallback(() => {
    const url = getShareUrl()
    navigator.clipboard.writeText(url)
    toast.success('Share link copied!')
  }, [getShareUrl])

  // Share functions
  const shareToTwitter = useCallback(() => {
    const url = getShareUrl()
    const text = `Check out my Bee Swarm Simulator hive build! 🐝🍯 ${hiveStats.total} bees, ${hiveStats.giftedCount} gifted`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  }, [getShareUrl, hiveStats])

  const shareToFacebook = useCallback(() => {
    const url = getShareUrl()
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  }, [getShareUrl])

  const shareToWhatsApp = useCallback(() => {
    const url = getShareUrl()
    const text = `Check out my Bee Swarm Simulator hive build! 🐝🍯 ${hiveStats.total} bees, ${hiveStats.giftedCount} gifted\n${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }, [getShareUrl, hiveStats])

  const shareToTelegram = useCallback(() => {
    const url = getShareUrl()
    const text = `Check out my Bee Swarm Simulator hive build! 🐝🍯 ${hiveStats.total} bees, ${hiveStats.giftedCount} gifted`
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
  }, [getShareUrl, hiveStats])

  const shareToReddit = useCallback(() => {
    const url = getShareUrl()
    const title = `My Bee Swarm Simulator Hive Build - ${hiveStats.total} bees, ${hiveStats.giftedCount} gifted`
    window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank')
  }, [getShareUrl, hiveStats])

  const shareToDiscord = useCallback(() => {
    const url = getShareUrl()
    const text = `**My Bee Swarm Simulator Hive Build** 🐝🍯\n📊 ${hiveStats.total} bees | ✨ ${hiveStats.giftedCount} gifted | 🔴 ${hiveStats.colorCount.red} red | 🔵 ${hiveStats.colorCount.blue} blue\n🔗 ${url}`
    navigator.clipboard.writeText(text)
    toast.success('Discord message copied! Paste it in your server.')
  }, [getShareUrl, hiveStats])

  // Export hive as image
  const exportAsImage = useCallback(async () => {
    if (!hiveGridRef.current || isExporting) return
    setIsExporting(true)
    try {
      const canvas = await html2canvas(hiveGridRef.current, {
        backgroundColor: '#B8860B',
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `hive-build-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      toast.success('Hive exported as image!')
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('Failed to export image')
    } finally {
      setIsExporting(false)
    }
  }, [isExporting])

  // Save config functions
  const saveConfig = useCallback(() => {
    if (!newConfigName.trim()) {
      toast.error('Please enter a name for the configuration')
      return
    }
    const newConfig: SavedConfig = {
      id: `config-${Date.now()}`,
      name: newConfigName.trim(),
      data: serializeHiveConfig(hiveSlots),
      createdAt: Date.now(),
    }
    const updated = [...savedConfigs, newConfig]
    setSavedConfigs(updated)
    try {
      localStorage.setItem(SAVED_CONFIGS_KEY, JSON.stringify(updated))
    } catch {
      // localStorage not available
    }
    setNewConfigName('')
    setShowSaveDialog(false)
    toast.success(`Configuration "${newConfig.name}" saved!`)
  }, [newConfigName, hiveSlots, savedConfigs])

  const loadConfig = useCallback((config: SavedConfig) => {
    const loaded = parseHiveConfig(config.data)
    setHiveSlots(loaded)
    setShowLoadDialog(false)
    toast.success(`Configuration "${config.name}" loaded!`)
  }, [setHiveSlots])

  const deleteConfig = useCallback((configId: string) => {
    const updated = savedConfigs.filter(c => c.id !== configId)
    setSavedConfigs(updated)
    try {
      localStorage.setItem(SAVED_CONFIGS_KEY, JSON.stringify(updated))
    } catch {
      // localStorage not available
    }
    toast.success('Configuration deleted')
  }, [savedConfigs])

  // Memoized honeycomb grid
  const honeycombGrid = useMemo(() => {
    const rows = []
    let slotIndex = 0

    for (let row = 0; row < HIVE_LAYOUT.length; row++) {
      const colsInRow = HIVE_LAYOUT[row]
      const slots = []

      for (let col = 0; col < colsInRow; col++) {
        const index = slotIndex++
        const bee = hiveSlots[index]
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
          style={{ marginTop: row > 0 ? '-50px' : '0' }}
        >
          {slots}
        </div>
      )
    }
    return rows
  }, [hiveSlots, dragOverSlot, dragItem, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd, handleTouchStart, removeFromSlot, toggleGifted])

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
            <span className="hidden lg:inline">Drag bees into hive slots • Double-click to remove • Right-click to toggle Gifted • <span className="font-medium">Ctrl+Z/Y</span> to undo/redo</span>
            <span className="lg:hidden">Drag bees into hive slots • Double-tap to remove • Enable "Gifted" before placing</span>
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
                    Your Hive ({hiveStats.total}/{HIVE_SLOTS})
                  </CardTitle>
                  <div className="flex gap-1 sm:gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={undo}
                      disabled={!canUndo}
                      className="border-yellow-600 text-yellow-100 hover:bg-yellow-600/20 disabled:opacity-40"
                      title="Undo (Ctrl+Z)"
                    >
                      <Undo2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={redo}
                      disabled={!canRedo}
                      className="border-yellow-600 text-yellow-100 hover:bg-yellow-600/20 disabled:opacity-40"
                      title="Redo (Ctrl+Y)"
                    >
                      <Redo2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSaveDialog(true)}
                      className="border-yellow-600 text-yellow-100 hover:bg-yellow-600/20"
                      title="Save Configuration"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowLoadDialog(true)}
                      className="border-yellow-600 text-yellow-100 hover:bg-yellow-600/20"
                      title="Load Configuration"
                    >
                      <FolderOpen className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportAsImage}
                      disabled={isExporting}
                      className="border-yellow-600 text-yellow-100 hover:bg-yellow-600/20"
                      title="Export as Image"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="border-yellow-600 text-yellow-100 hover:bg-yellow-600/20">
                          <Share2 className="h-4 w-4 sm:mr-1" />
                          <span className="hidden sm:inline">Share</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={copyShareLink}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={shareToTwitter}>
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                          Twitter / X
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={shareToFacebook}>
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={shareToWhatsApp}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={shareToTelegram}>
                          <Send className="h-4 w-4 mr-2" />
                          Telegram
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={shareToReddit}>
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                          </svg>
                          Reddit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={shareToDiscord}>
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                          Discord
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm" onClick={clearHive} className="border-yellow-600 text-yellow-100 hover:bg-yellow-600/20">
                      <Trash2 className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Clear</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Honeycomb Grid */}
                <div
                  ref={hiveGridRef}
                  className="relative py-6 px-2 rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #C9B84A 0%, #B5A642 50%, #A89830 100%)'
                  }}
                >
                  <div className="flex flex-col items-center">
                    {honeycombGrid}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4">
                  <StatCard label="Total" value={hiveStats.total} color="#FFD700" />
                  <StatCard label="Red" value={hiveStats.colorCount.red} color="#EF4444" />
                  <StatCard label="Blue" value={hiveStats.colorCount.blue} color="#3B82F6" />
                  <StatCard label="Colorless" value={hiveStats.colorCount.colorless} color="#9CA3AF" />
                  <StatCard label="Mythic" value={hiveStats.rarityCount.mythic || 0} color="#DDA0DD" />
                  <StatCard label="Gifted" value={hiveStats.giftedCount} color="#FFD700" icon="✨" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bee Selection Panel */}
          <div className="order-2">
            <Card className="bg-yellow-900/40 border-yellow-600/50 backdrop-blur">
              <CardHeader className="pb-2">
                <button
                  className="flex items-center justify-between w-full lg:cursor-default"
                  onClick={() => isMobile && setIsPanelOpen(!isPanelOpen)}
                >
                  <CardTitle className="text-lg text-yellow-100">Available Bees</CardTitle>
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
                    <Label className="text-sm text-yellow-100">Level</Label>
                    <div className="flex items-center gap-0 bg-yellow-900/50 border border-yellow-600/50 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setDefaultLevel(Math.max(1, defaultLevel - 1))}
                        className="w-8 h-8 flex items-center justify-center text-yellow-400 hover:bg-yellow-600/30 transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center text-yellow-100 font-semibold text-sm border-x border-yellow-600/30">
                        {defaultLevel}
                      </span>
                      <button
                        onClick={() => setDefaultLevel(Math.min(25, defaultLevel + 1))}
                        className="w-8 h-8 flex items-center justify-center text-yellow-400 hover:bg-yellow-600/30 transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-yellow-400" />
                  <Input
                    type="search"
                    placeholder="Search bees..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9 bg-yellow-900/50 border-yellow-600/50 text-yellow-100 placeholder:text-yellow-400/50"
                    aria-label="Search bees"
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
                <ScrollArea className={cn('pr-2', isMobile ? 'h-[200px]' : 'h-[590px]')}>
                  <div className="grid grid-cols-5 gap-1.5 pt-1">
                    {filteredBees.map((bee) => (
                      <BeeCard
                        key={bee.id}
                        bee={bee}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onTouchStart={handleTouchStart}
                        getRarityBgColor={getRarityBgColor}
                        onClick={() => {
                          setSelectedBee(bee)
                          setIsModalOpen(true)
                        }}
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
              <span className="font-semibold">Rarity:</span>
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

        {/* Related Tools */}
        <Card className="mt-4 bg-yellow-900/40 border-yellow-600/50 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-yellow-100">Related Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/calculator">
                <div className="p-4 rounded-lg bg-yellow-800/30 border border-yellow-600/30 hover:bg-yellow-700/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold text-yellow-100">Trade Calculator</h3>
                  </div>
                  <p className="text-sm text-yellow-200/70 mb-2">Calculate fair trade values</p>
                  <span className="text-xs text-yellow-400 flex items-center gap-1">
                    Calculate <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>

              <Link href="/values">
                <div className="p-4 rounded-lg bg-yellow-800/30 border border-yellow-600/30 hover:bg-yellow-700/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <Scale className="h-5 w-5 text-green-400" />
                    <h3 className="font-semibold text-yellow-100">Value List</h3>
                  </div>
                  <p className="text-sm text-yellow-200/70 mb-2">Browse item values</p>
                  <span className="text-xs text-yellow-400 flex items-center gap-1">
                    View Values <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>

              <Link href="/advisor">
                <div className="p-4 rounded-lg bg-yellow-800/30 border border-yellow-600/30 hover:bg-yellow-700/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <Bot className="h-5 w-5 text-pink-400" />
                    <h3 className="font-semibold text-yellow-100">AI Advisor</h3>
                  </div>
                  <p className="text-sm text-yellow-200/70 mb-2">Get trading advice</p>
                  <span className="text-xs text-yellow-400 flex items-center gap-1">
                    Ask Advisor <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
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
              <Image src={dragItem.bee.image_url} alt={dragItem.bee.name} width={56} height={56} className="object-contain" />
            ) : (
              <span className="text-4xl">🐝</span>
            )}
          </div>
        </div>
      )}

      {/* Save Config Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-yellow-900/95 border-yellow-600">
            <CardHeader>
              <CardTitle className="text-yellow-100 flex items-center justify-between">
                Save Configuration
                <button onClick={() => setShowSaveDialog(false)} className="text-yellow-400 hover:text-yellow-100">
                  <X className="h-5 w-5" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter configuration name..."
                value={newConfigName}
                onChange={(e) => setNewConfigName(e.target.value)}
                className="bg-yellow-900/50 border-yellow-600/50 text-yellow-100"
                onKeyDown={(e) => e.key === 'Enter' && saveConfig()}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowSaveDialog(false)} className="border-yellow-600 text-yellow-100">
                  Cancel
                </Button>
                <Button onClick={saveConfig} className="bg-yellow-600 hover:bg-yellow-500 text-white">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Load Config Dialog */}
      {showLoadDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-yellow-900/95 border-yellow-600">
            <CardHeader>
              <CardTitle className="text-yellow-100 flex items-center justify-between">
                Load Configuration
                <button onClick={() => setShowLoadDialog(false)} className="text-yellow-400 hover:text-yellow-100">
                  <X className="h-5 w-5" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {savedConfigs.length === 0 ? (
                <p className="text-yellow-200/70 text-center py-4">No saved configurations</p>
              ) : (
                <ScrollArea className="h-[200px] sm:h-[300px]">
                  <div className="space-y-2">
                    {savedConfigs.map((config) => (
                      <div
                        key={config.id}
                        className="p-3 rounded-lg bg-yellow-800/30 border border-yellow-600/30 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-yellow-100">{config.name}</p>
                          <p className="text-xs text-yellow-200/60">
                            {new Date(config.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => loadConfig(config)}
                            className="bg-yellow-600 hover:bg-yellow-500 text-white"
                          >
                            Load
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteConfig(config.id)}
                            className="border-red-600 text-red-400 hover:bg-red-600/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bee Detail Modal */}
      <BeeDetailModal
        bee={selectedBee}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedBee(null)
        }}
      />
    </div>
  )
}

// Hexagon Slot Component with improved drag hint
const HexSlot = memo(function HexSlot({
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
  const width = 130
  const height = 113

  const bgColor = bee ? getRarityBgColor(bee.rarity) : '#8B8B3D'
  const borderColor = isOver ? '#FFD700' : bee?.isGifted ? '#FFD700' : '#9B9B4D'

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
        "relative cursor-pointer select-none touch-none transition-all duration-150",
        "hover:scale-110 hover:z-10",
        isOver && "scale-115 z-20",
        bee?.isGifted && "animate-pulse",
        isDragging && !bee && "ring-2 ring-yellow-400/50 ring-offset-2 ring-offset-transparent"
      )}
      style={{ width, height, marginLeft: '-9px', marginRight: '-9px', marginTop: verticalOffset }}
    >
      {/* Drop zone indicator when dragging */}
      {isDragging && !bee && (
        <>
          {/* Outer dashed border effect (slightly larger hexagon) */}
          <div
            className="absolute z-10 animate-pulse"
            style={{
              inset: '-3px',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              background: `repeating-linear-gradient(
                90deg,
                rgba(255, 215, 0, 0.8) 0px,
                rgba(255, 215, 0, 0.8) 6px,
                transparent 6px,
                transparent 12px
              )`,
              opacity: isOver ? 1 : 0.6,
            }}
          />
          {/* Inner fill */}
          <div
            className="absolute inset-0 z-10"
            style={{
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              backgroundColor: isOver ? 'rgba(255, 215, 0, 0.35)' : 'rgba(255, 215, 0, 0.15)',
            }}
          />
        </>
      )}

      {/* Outer hexagon (border) */}
      <div
        className="absolute inset-0 transition-all duration-150"
        style={{
          backgroundColor: borderColor,
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          boxShadow: isOver
            ? '0 0 25px rgba(255, 215, 0, 0.9), 0 0 50px rgba(255, 215, 0, 0.5)'
            : bee?.isGifted
            ? '0 0 10px rgba(255, 215, 0, 0.6)'
            : 'none',
        }}
      />

      {/* Inner hexagon (content) */}
      <div
        className="absolute flex items-center justify-center transition-all duration-150"
        style={{
          top: 2,
          left: 2,
          right: 2,
          bottom: 2,
          backgroundColor: isOver && !bee ? 'rgba(255, 215, 0, 0.2)' : bgColor,
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
        }}
      >
        {bee ? (
          <>
            {bee.image_url ? (
              <Image
                src={bee.image_url}
                alt={bee.name}
                width={80}
                height={80}
                className="object-contain pointer-events-none"
                style={{ marginTop: '-10px' }}
                draggable={false}
              />
            ) : (
              <span className="text-6xl" style={{ marginTop: '-10px' }}>🐝</span>
            )}

            <div
              className="absolute font-bold text-white text-center"
              style={{
                bottom: 0,
                left: '25%',
                right: '25%',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '3px 0',
                fontSize: '13px',
              }}
            >
              {bee.level || 1}
            </div>

            {bee.isGifted && (
              <span
                className="absolute text-base"
                style={{
                  top: 6,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
                }}
              >
                ⭐
              </span>
            )}
          </>
        ) : (
          <span
            className={cn(
              "text-sm font-medium transition-opacity",
              isDragging ? "opacity-80" : "opacity-50"
            )}
            style={{ color: isDragging ? '#FFD700' : '#6B6B2D' }}
          >
            {isDragging ? '↓' : index + 1}
          </span>
        )}
      </div>
    </div>
  )
})

// Stat Card Component
const StatCard = memo(function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon?: string }) {
  return (
    <div className="p-2 rounded-lg bg-yellow-900/50 border border-yellow-600/30 text-center">
      <div className="text-lg sm:text-xl font-bold flex items-center justify-center gap-1" style={{ color }}>
        {icon && <span className="text-sm">{icon}</span>}
        {value}
      </div>
      <div className="text-[10px] sm:text-xs text-yellow-200/70">{label}</div>
    </div>
  )
})

// Rarity Filter Button
const RarityButton = memo(function RarityButton({
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
  const label = rarity === 'all' ? 'All' : beeRarities[rarity as keyof typeof beeRarities]?.name || rarity
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
        color: rarity === 'all' || rarity === 'common' ? '#fff' : '#1f2937',
      }}
    >
      {label}
    </button>
  )
})

// Bee Card Component
const BeeCard = memo(function BeeCard({
  bee,
  onDragStart,
  onDragEnd,
  onTouchStart,
  getRarityBgColor,
  onClick,
}: {
  bee: Bee
  onDragStart: (e: React.DragEvent, bee: Bee) => void
  onDragEnd: () => void
  onTouchStart: (e: React.TouchEvent, bee: Bee) => void
  getRarityBgColor: (rarity: string) => string
  onClick?: () => void
}) {
  const bgColor = getRarityBgColor(bee.rarity)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onClick?.()
  }, [onClick])

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, bee)}
      onDragEnd={onDragEnd}
      onTouchStart={(e) => onTouchStart(e, bee)}
      onClick={handleClick}
      className={cn(
        "p-2 rounded-lg border-2 transition-all aspect-square",
        "cursor-pointer active:cursor-grabbing select-none",
        "hover:scale-105 hover:shadow-lg",
        "flex flex-col items-center justify-center"
      )}
      style={{
        backgroundColor: bgColor,
        borderColor: '#DAA520',
      }}
    >
      <div className="flex-1 w-full flex items-center justify-center relative">
        {bee.image_url ? (
          <Image
            src={bee.image_url}
            alt={bee.name}
            width={56}
            height={56}
            className="object-contain pointer-events-none"
            draggable={false}
          />
        ) : (
          <span className="text-3xl">🐝</span>
        )}
      </div>
      <div
        className="text-xs text-center mt-1 truncate font-bold w-full px-0.5"
        style={{
          color: bee.rarity === 'common' ? '#fff' : '#1f2937',
          textShadow: bee.rarity === 'common' ? '0 1px 2px rgba(0,0,0,0.6)' : '0 0 1px rgba(255,255,255,0.3)'
        }}
      >
        {bee.name}
      </div>
    </div>
  )
})
