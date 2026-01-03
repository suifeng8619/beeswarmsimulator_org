import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Calendar, Tag, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { beequips, beequipCategories, calculateBeequipValue } from '@/data/beequips'
import { ItemCard } from '@/components/items/item-card'
import type { Metadata } from 'next'
import type { Beequip } from '@/types/database'

interface PageProps {
  params: Promise<{ slug: string }>
}

function getBeequip(slug: string): Beequip | undefined {
  return beequips.find((b) => b.slug === slug)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const beequip = getBeequip(slug)

  if (!beequip) {
    return { title: 'Beequip Not Found' }
  }

  return {
    title: `${beequip.name} Value & Trading Info`,
    description: `Current base value of ${beequip.name} is ${beequip.base_value.toLocaleString()}. View trading info, potential values, and related beequips.`,
    keywords: [
      beequip.name,
      'BSS beequip',
      'Bee Swarm Simulator',
      'trading value',
      beequip.category,
    ],
    openGraph: {
      title: `${beequip.name} - BSS Nexus`,
      description: `Base Value: ${beequip.base_value.toLocaleString()} | ${beequipCategories[beequip.category as keyof typeof beequipCategories]}`,
      images: beequip.image_url ? [beequip.image_url] : undefined,
    },
  }
}

export async function generateStaticParams() {
  return beequips.map((beequip) => ({
    slug: beequip.slug,
  }))
}

export default async function BeequipDetailPage({ params }: PageProps) {
  const { slug } = await params
  const beequip = getBeequip(slug)

  if (!beequip) {
    notFound()
  }

  const TrendIcon =
    beequip.trend === 'up'
      ? TrendingUp
      : beequip.trend === 'down'
        ? TrendingDown
        : Minus

  const trendColor =
    beequip.trend === 'up'
      ? 'text-green-500'
      : beequip.trend === 'down'
        ? 'text-red-500'
        : 'text-muted-foreground'

  const trendBg =
    beequip.trend === 'up'
      ? 'bg-green-500/10'
      : beequip.trend === 'down'
        ? 'bg-red-500/10'
        : 'bg-muted'

  const relatedBeequips = beequips
    .filter((b) => b.category === beequip.category && b.id !== beequip.id)
    .slice(0, 4)

  // Calculate values for each potential level
  const potentialValues = Array.from({ length: 5 }, (_, i) =>
    calculateBeequipValue(beequip, i + 1)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/values?tab=beequips">
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
                    {beequip.image_url ? (
                      <img
                        src={beequip.image_url}
                        alt={beequip.name}
                        className="h-28 w-28 object-contain"
                      />
                    ) : (
                      <span className="text-6xl">🎒</span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold">{beequip.name}</h1>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="capitalize">
                          {beequipCategories[beequip.category as keyof typeof beequipCategories]}
                        </Badge>
                        <Badge variant="outline">
                          Max Potential: {beequip.max_potential}/5
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Value */}
                  <div className="mt-6">
                    <div className="text-sm text-muted-foreground mb-1">Base Value</div>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold text-honey">
                        {beequip.base_value.toLocaleString()}
                      </span>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${trendBg}`}>
                        <TrendIcon className={`h-5 w-5 ${trendColor}`} />
                        <span className={`text-sm font-medium ${trendColor} capitalize`}>
                          {beequip.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Potential Values */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-honey" />
                Value by Potential
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {potentialValues.map((value, index) => (
                  <div
                    key={index}
                    className="p-3 bg-secondary/30 rounded-lg text-center"
                  >
                    <div className="text-xs text-muted-foreground mb-1">
                      {index + 1}/5
                    </div>
                    <div className="font-bold text-honey">
                      {value.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Each potential level increases the base value by 50%. Maximum potential beequips
                are worth significantly more than base versions.
              </p>
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
                  <div className="font-semibold capitalize">{beequip.category}</div>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg text-center">
                  <Star className="h-5 w-5 mx-auto mb-2 text-honey" />
                  <div className="text-sm text-muted-foreground">Max Potential</div>
                  <div className="font-semibold">{beequip.max_potential}/5</div>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg text-center">
                  <TrendIcon className={`h-5 w-5 mx-auto mb-2 ${trendColor}`} />
                  <div className="text-sm text-muted-foreground">Trend</div>
                  <div className={`font-semibold capitalize ${trendColor}`}>{beequip.trend}</div>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg text-center">
                  <Calendar className="h-5 w-5 mx-auto mb-2 text-honey" />
                  <div className="text-sm text-muted-foreground">Updated</div>
                  <div className="font-semibold">
                    {new Date(beequip.updated_at).toLocaleDateString()}
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
                <Link href={`/calculator?item=${beequip.slug}`}>
                  Add to Calculator
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/values?tab=beequips">
                  View All Beequips
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Max Value Card */}
          <Card className="mb-6 border-honey/30 bg-honey/5">
            <CardContent className="p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">Max Potential Value</div>
              <div className="text-3xl font-bold text-honey">
                {potentialValues[4].toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                at 5/5 potential
              </div>
            </CardContent>
          </Card>

          {/* Value Comparison */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Value Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-3">
                This beequip (base) is worth approximately:
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Basic Eggs</span>
                  <span className="font-semibold">
                    {Math.round(beequip.base_value / 375).toLocaleString()}x
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Royal Jellies</span>
                  <span className="font-semibold">
                    {Math.round(beequip.base_value / 1200).toLocaleString()}x
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Items */}
      {relatedBeequips.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            More {beequipCategories[beequip.category as keyof typeof beequipCategories]} Beequips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedBeequips.map((b) => (
              <ItemCard key={b.id} item={b} type="beequip" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
