'use client'

import Link from 'next/link'
import { Zap, Sword, Wind, Sparkles, Gift, Star, Package, ExternalLink } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { beeRarities } from '@/data/bees'
import type { Bee } from '@/types/database'

interface BeeDetailModalProps {
  bee: Bee | null
  open: boolean
  onClose: () => void
}

export function BeeDetailModal({ bee, open, onClose }: BeeDetailModalProps) {
  if (!bee) return null

  const getRarityColors = (rarity: string) => {
    const colors: Record<string, { bg: string; text: string; accent: string }> = {
      common: { bg: '#CD7F32', text: '#fff', accent: '#B8722D' },
      rare: { bg: '#C0C0C0', text: '#1f2937', accent: '#A8A8A8' },
      epic: { bg: '#FFD700', text: '#1f2937', accent: '#E6C200' },
      legendary: { bg: '#22D3D1', text: '#1f2937', accent: '#1EB3B1' },
      mythic: { bg: '#DDA0DD', text: '#1f2937', accent: '#C88EC8' },
      event: { bg: '#90EE90', text: '#1f2937', accent: '#7BD67B' },
    }
    return colors[rarity] || colors.common
  }

  const getColorInfo = (color: string) => {
    const colors: Record<string, { bg: string; text: string; name: string; dot: string }> = {
      red: { bg: 'rgba(239, 68, 68, 0.2)', text: '#F87171', name: 'Red', dot: '#EF4444' },
      blue: { bg: 'rgba(59, 130, 246, 0.2)', text: '#60A5FA', name: 'Blue', dot: '#3B82F6' },
      colorless: { bg: 'rgba(156, 163, 175, 0.2)', text: '#9CA3AF', name: 'Colorless', dot: '#9CA3AF' },
    }
    return colors[color] || colors.colorless
  }

  const rarityInfo = beeRarities[bee.rarity as keyof typeof beeRarities]
  const rarityColors = getRarityColors(bee.rarity)
  const colorInfo = getColorInfo(bee.color)

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0 border-zinc-700 bg-transparent">
        {/* Base background + Bee ghost background */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          {/* Solid background base */}
          <div className="absolute inset-0 bg-zinc-900" />
          {/* Bee ghost image */}
          {bee.image_url && (
            <>
              <img
                src={bee.image_url}
                alt=""
                className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] max-w-none h-auto opacity-40"
                style={{ filter: 'blur(10px)' }}
              />
              {/* Gradient overlay for fade effect - very light */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/30 to-zinc-900/60" />
            </>
          )}
        </div>

        {/* Header with bee image */}
        <div
          className="p-5 flex items-center gap-4 relative overflow-hidden z-10"
          style={{ backgroundColor: rarityColors.bg }}
        >
          {/* Decorative background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${rarityColors.accent} 0%, transparent 50%)`,
            }}
          />

          <div className="w-32 h-32 flex items-center justify-center flex-shrink-0 relative z-10 bg-white/20 rounded-xl backdrop-blur-sm">
            {bee.image_url ? (
              <img
                src={bee.image_url}
                alt={bee.name}
                className="w-28 h-28 object-contain drop-shadow-lg"
              />
            ) : (
              <span className="text-7xl">🐝</span>
            )}
          </div>

          <div className="relative z-10" style={{ color: rarityColors.text }}>
            <DialogTitle className="text-xl font-bold mb-2">{bee.name}</DialogTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge
                className="text-xs font-medium border-0"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.25)',
                  color: rarityColors.text,
                }}
              >
                {rarityInfo?.name}
              </Badge>
              <Badge
                className="text-xs font-medium border-0 flex items-center gap-1"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: rarityColors.text,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: colorInfo.dot }}
                />
                {colorInfo.name}
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4 relative z-10">
          {/* Description */}
          <p className="text-zinc-300 text-sm leading-relaxed">{bee.description}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2">
            <StatBox
              icon={<Sword className="h-4 w-4" />}
              label="ATK"
              value={bee.attack}
              color="#EF4444"
            />
            <StatBox
              icon={<Wind className="h-4 w-4" />}
              label="SPD"
              value={bee.speed}
              color="#3B82F6"
            />
            <StatBox
              icon={<Zap className="h-4 w-4" />}
              label="NRG"
              value={bee.energy === 999999999 ? '∞' : bee.energy}
              color="#F59E0B"
            />
            <StatBox
              icon={<Sparkles className="h-4 w-4" />}
              label="GTH"
              value={bee.gather_amount}
              color="#10B981"
            />
          </div>

          {/* Abilities */}
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-zinc-300">
              <Star className="h-4 w-4 text-amber-400" />
              Abilities
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {bee.abilities.map((ability, idx) => (
                <Badge
                  key={idx}
                  className="text-xs bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-700"
                >
                  {ability}
                </Badge>
              ))}
            </div>
          </div>

          {/* Gifted Ability */}
          {bee.gifted_ability && (
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-zinc-300">
                <Gift className="h-4 w-4 text-purple-400" />
                Gifted Ability
              </h4>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-sm text-purple-300">
                {bee.gifted_ability}
              </div>
            </div>
          )}

          {/* Obtain Method */}
          {bee.obtain_method && (
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-zinc-300">
                <Package className="h-4 w-4 text-amber-400" />
                How to Obtain
              </h4>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm text-amber-300">
                {bee.obtain_method}
              </div>
            </div>
          )}

          {/* View Full Page Link */}
          <div className="pt-2">
            <Link href={`/bees/${bee.slug}`} onClick={onClose}>
              <Button
                className="w-full gap-2 bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold"
              >
                <ExternalLink className="h-4 w-4" />
                View Full Details
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function StatBox({
  icon,
  label,
  value,
  color
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}) {
  return (
    <div
      className="rounded-lg p-2.5 text-center border"
      style={{
        backgroundColor: `${color}10`,
        borderColor: `${color}30`,
      }}
    >
      <div className="flex justify-center mb-1" style={{ color }}>{icon}</div>
      <div className="text-base font-bold text-white">{value}</div>
      <div className="text-[10px] text-zinc-400 font-medium">{label}</div>
    </div>
  )
}
