import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Calendar, Tag, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { stickers, stickerCategories, getTopValueStickers } from '@/data/stickers'
import { ItemCard } from '@/components/items/item-card'
import type { Metadata } from 'next'
import type { Sticker } from '@/types/database'

interface PageProps {
  params: Promise<{ slug: string }>
}

function getSticker(slug: string): Sticker | undefined {
  return stickers.find((s) => s.slug === slug)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const sticker = getSticker(slug)

  if (!sticker) {
    return { title: 'Sticker Not Found' }
  }

  return {
    title: `${sticker.name} Value & Trading Info`,
    description: `Current value of ${sticker.name} is ${sticker.value.toLocaleString()}. View trading info, trends, and related items for this ${stickerCategories[sticker.category as keyof typeof stickerCategories]} sticker.`,
    keywords: [
      sticker.name,
      'BSS sticker',
      'Bee Swarm Simulator',
      'trading value',
      sticker.category,
    ],
    openGraph: {
      title: `${sticker.name} - BSS Nexus`,
      description: `Value: ${sticker.value.toLocaleString()} | ${stickerCategories[sticker.category as keyof typeof stickerCategories]}`,
      images: sticker.image_url ? [sticker.image_url] : undefined,
    },
  }
}

export async function generateStaticParams() {
  return stickers.map((sticker) => ({
    slug: sticker.slug,
  }))
}

export default async function StickerDetailPage({ params }: PageProps) {
  const { slug } = await params
  const sticker = getSticker(slug)

  if (!sticker) {
    notFound()
  }

  const TrendIcon =
    sticker.trend === 'up'
      ? TrendingUp
      : sticker.trend === 'down'
        ? TrendingDown
        : Minus

  const trendColor =
    sticker.trend === 'up'
      ? 'text-green-500'
      : sticker.trend === 'down'
        ? 'text-red-500'
        : 'text-muted-foreground'

  const trendBg =
    sticker.trend === 'up'
      ? 'bg-green-500/10'
      : sticker.trend === 'down'
        ? 'bg-red-500/10'
        : 'bg-muted'

  const relatedStickers = stickers
    .filter((s) => s.category === sticker.category && s.id !== sticker.id)
    .slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/values">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Value List
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="h-32 w-32 rounded-xl bg-secondary/50 flex items-center justify-center">
                    {sticker.image_url ? (
                      <img
                        src={sticker.image_url}
                        alt={sticker.name}
                        className="h-28 w-28 object-contain"
                      />
                    ) : (
                      <span className="text-6xl">🐝</span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold">{sticker.name}</h1>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="capitalize">
                          {stickerCategories[sticker.category as keyof typeof stickerCategories]}
                        </Badge>
                        <Badge
                          variant={sticker.is_obtainable ? 'default' : 'secondary'}
                        >
                          {sticker.is_obtainable ? 'Obtainable' : 'Unobtainable'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Value */}
                  <div className="mt-6">
                    <div className="text-sm text-muted-foreground mb-1">Current Value</div>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold text-honey">
                        {sticker.value.toLocaleString()}
                      </span>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${trendBg}`}>
                        <TrendIcon className={`h-5 w-5 ${trendColor}`} />
                        <span className={`text-sm font-medium ${trendColor} capitalize`}>
                          {sticker.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Trading Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-secondary/30 rounded-lg text-center">
                  <Tag className="h-5 w-5 mx-auto mb-2 text-honey" />
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="font-semibold capitalize">
                    {sticker.category.replace('_', ' ')}
                  </div>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg text-center">
                  <Star className="h-5 w-5 mx-auto mb-2 text-honey" />
                  <div className="text-sm text-muted-foreground">Rarity</div>
                  <div className="font-semibold">
                    {sticker.is_obtainable ? 'Available' : 'Limited'}
                  </div>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg text-center">
                  <TrendIcon className={`h-5 w-5 mx-auto mb-2 ${trendColor}`} />
                  <div className="text-sm text-muted-foreground">Trend</div>
                  <div className={`font-semibold capitalize ${trendColor}`}>{sticker.trend}</div>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg text-center">
                  <Calendar className="h-5 w-5 mx-auto mb-2 text-honey" />
                  <div className="text-sm text-muted-foreground">Updated</div>
                  <div className="font-semibold">
                    {new Date(sticker.updated_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Quick Actions */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full bg-honey text-honey-foreground hover:bg-honey-dark">
                <Link href={`/calculator?item=${sticker.slug}`}>
                  Add to Calculator
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/values">
                  View All Stickers
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Value Comparison */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Value Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-3">
                This sticker is worth approximately:
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Basic Eggs</span>
                  <span className="font-semibold">
                    {Math.round(sticker.value / 375).toLocaleString()}x
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Royal Jellies</span>
                  <span className="font-semibold">
                    {Math.round(sticker.value / 1200).toLocaleString()}x
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Items */}
      {relatedStickers.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Similar {stickerCategories[sticker.category as keyof typeof stickerCategories]}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedStickers.map((s) => (
              <ItemCard key={s.id} item={s} type="sticker" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
