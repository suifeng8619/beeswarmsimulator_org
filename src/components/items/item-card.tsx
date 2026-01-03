'use client'

import Link from 'next/link'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Sticker, Beequip } from '@/types/database'

interface ItemCardProps {
  item: Sticker | Beequip
  type: 'sticker' | 'beequip'
  size?: 'sm' | 'md' | 'lg'
}

export function ItemCard({ item, type, size = 'md' }: ItemCardProps) {
  const value = 'value' in item ? item.value : item.base_value
  const href = `/${type}s/${item.slug}`

  const TrendIcon =
    item.trend === 'up'
      ? TrendingUp
      : item.trend === 'down'
        ? TrendingDown
        : Minus

  const trendColor =
    item.trend === 'up'
      ? 'text-green-500'
      : item.trend === 'down'
        ? 'text-red-500'
        : 'text-muted-foreground'

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  }

  const imageClasses = {
    sm: 'h-10 w-10',
    md: 'h-14 w-14',
    lg: 'h-20 w-20',
  }

  return (
    <Link href={href}>
      <Card className="group transition-all hover:border-honey/50 hover:shadow-md hover:shadow-honey/10 cursor-pointer">
        <CardContent className={cn('flex items-center gap-3', sizeClasses[size])}>
          {/* Item Image */}
          <div
            className={cn(
              'flex items-center justify-center rounded-lg bg-secondary/50 shrink-0',
              imageClasses[size]
            )}
          >
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className={cn('object-contain', imageClasses[size])}
              />
            ) : (
              <span className="text-2xl">🐝</span>
            )}
          </div>

          {/* Item Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate group-hover:text-honey transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-honey font-semibold">
                {value.toLocaleString()}
              </span>
              <TrendIcon className={cn('h-4 w-4', trendColor)} />
            </div>
          </div>

          {/* Category Badge */}
          <Badge variant="secondary" className="shrink-0 text-xs capitalize">
            {item.category.replace('_', ' ')}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  )
}
