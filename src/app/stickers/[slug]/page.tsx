import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Calendar, Tag, Star, BookOpen, Grid3X3, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { stickerCategories } from '@/data/stickers'
import { ITEM_VALUES } from '@/data/game-values'
import { fetchStickers, fetchStickerBySlug, fetchRelatedStickers, fetchTrendingBeequips } from '@/lib/queries'
import { ItemCard } from '@/components/items/item-card'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const sticker = await fetchStickerBySlug(slug)

  if (!sticker) {
    return { title: 'Sticker Not Found' }
  }

  const url = `https://beeswarmsimulator.org/stickers/${slug}`
  const description = `Current value of ${sticker.name} is ${sticker.value.toLocaleString()}. View trading info, trends, and related items for this ${stickerCategories[sticker.category as keyof typeof stickerCategories]} sticker.`

  return {
    title: `${sticker.name} Value & Trading Info`,
    description,
    keywords: [
      sticker.name,
      'BSS sticker',
      'Bee Swarm Simulator',
      'trading value',
      sticker.category,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${sticker.name} - BSS Nexus`,
      description: `Value: ${sticker.value.toLocaleString()} | ${stickerCategories[sticker.category as keyof typeof stickerCategories]}`,
      url,
      type: 'article',
      images: sticker.image_url ? [sticker.image_url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${sticker.name} | BSS Nexus`,
      description: `Value: ${sticker.value.toLocaleString()}`,
      images: sticker.image_url ? [sticker.image_url] : undefined,
    },
  }
}

export const revalidate = 86400 // ISR: revalidate every 24 hours (sticker values don't change that frequently)

export async function generateStaticParams() {
  const stickers = await fetchStickers()
  return stickers.map((sticker) => ({
    slug: sticker.slug,
  }))
}

export default async function StickerDetailPage({ params }: PageProps) {
  const { slug } = await params
  const sticker = await fetchStickerBySlug(slug)

  if (!sticker) {
    notFound()
  }

  // Fetch related data after we have the sticker (more efficient)
  const [relatedStickers, relatedBeequips] = await Promise.all([
    fetchRelatedStickers(sticker.id, sticker.category, 4),
    fetchTrendingBeequips(3),
  ])

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

  const baseUrl = 'https://beeswarmsimulator.org'

  return (
    <>
      <ProductJsonLd
        name={sticker.name}
        description={`${sticker.name} sticker in Bee Swarm Simulator. Current value: ${sticker.value.toLocaleString()}`}
        image={sticker.image_url}
        url={`${baseUrl}/stickers/${sticker.slug}`}
        category={stickerCategories[sticker.category as keyof typeof stickerCategories]}
        value={sticker.value}
        trend={sticker.trend}
        dateModified={sticker.updated_at}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Values', url: `${baseUrl}/values` },
          { name: sticker.name, url: `${baseUrl}/stickers/${sticker.slug}` },
        ]}
      />
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
                  <div className="h-32 w-32 rounded-xl bg-secondary/50 flex items-center justify-center relative">
                    {sticker.image_url ? (
                      <Image
                        src={sticker.image_url}
                        alt={sticker.name}
                        width={112}
                        height={112}
                        className="object-contain"
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
                    {Math.round(sticker.value / ITEM_VALUES.BASIC_EGG).toLocaleString()}x
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Royal Jellies</span>
                  <span className="font-semibold">
                    {Math.round(sticker.value / ITEM_VALUES.ROYAL_JELLY).toLocaleString()}x
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Explore More */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Explore More</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/bees">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <BookOpen className="h-4 w-4 text-orange-500" />
                  Bee Encyclopedia
                </Button>
              </Link>
              <Link href="/values?tab=beequips">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Package className="h-4 w-4 text-blue-500" />
                  View Beequips
                </Button>
              </Link>
              <Link href="/hive-builder">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Grid3X3 className="h-4 w-4 text-purple-500" />
                  Hive Builder
                </Button>
              </Link>
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
    </>
  )
}
