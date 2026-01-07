import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Zap, Sword, Wind, Sparkles, Gift, Star, Package, Calculator, Grid3X3, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { beeRarities } from '@/data/bees'
import { fetchBees, fetchBeeBySlug, fetchRelatedBees, fetchTrendingBeequips } from '@/lib/queries'
import { BeeJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 86400 // ISR: revalidate every 24 hours (bee data is stable)

export async function generateStaticParams() {
  const bees = await fetchBees()
  return bees.map((bee) => ({
    slug: bee.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const bee = await fetchBeeBySlug(slug)
  if (!bee) return { title: 'Bee Not Found' }

  const url = `https://beeswarmsimulator.org/bees/${slug}`

  return {
    title: `${bee.name} - Bee Encyclopedia`,
    description: bee.description || `Learn about ${bee.name} in Bee Swarm Simulator. Stats, abilities, and how to obtain this ${bee.rarity} bee.`,
    keywords: [bee.name, 'BSS bee', 'Bee Swarm Simulator', bee.rarity, bee.color],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${bee.name} - Bee Encyclopedia | BSS Nexus`,
      description: bee.description || `Learn about ${bee.name} in Bee Swarm Simulator.`,
      url,
      type: 'article',
      images: bee.image_url ? [bee.image_url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${bee.name} | BSS Nexus`,
      description: bee.description || `Learn about ${bee.name} in Bee Swarm Simulator.`,
      images: bee.image_url ? [bee.image_url] : undefined,
    },
  }
}

export default async function BeeDetailPage({ params }: PageProps) {
  const { slug } = await params
  const bee = await fetchBeeBySlug(slug)

  if (!bee) {
    notFound()
  }

  // Fetch related data after we have the bee (more efficient)
  const [relatedBees, trendingBeequips] = await Promise.all([
    fetchRelatedBees(bee.id, bee.rarity, bee.color, 6),
    fetchTrendingBeequips(4),
  ])

  const getRarityBgColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: '#CD7F32',
      rare: '#E5E7EB',
      epic: '#FCD34D',
      legendary: '#22D3D1',
      mythic: '#DDA0DD',
      event: '#90EE90',
    }
    return colors[rarity] || '#6B5B4F'
  }

  const getRarityTextColor = (rarity: string) => {
    return rarity === 'common' ? '#fff' : '#1f2937'
  }

  const getColorInfo = (color: string) => {
    const colors: Record<string, { bg: string; text: string; name: string }> = {
      red: { bg: '#FEE2E2', text: '#DC2626', name: 'Red' },
      blue: { bg: '#DBEAFE', text: '#2563EB', name: 'Blue' },
      colorless: { bg: '#F3F4F6', text: '#6B7280', name: 'Colorless' },
    }
    return colors[color] || colors.colorless
  }

  const rarityInfo = beeRarities[bee.rarity as keyof typeof beeRarities]
  const colorInfo = getColorInfo(bee.color)

  // Use trending beequips as recommendations (already sorted by value)
  const recommendedBeequips = trendingBeequips

  const baseUrl = 'https://beeswarmsimulator.org'

  return (
    <>
      <BeeJsonLd
        name={bee.name}
        description={bee.description || `${bee.name} is a ${bee.rarity} ${bee.color} bee in Bee Swarm Simulator.`}
        image={bee.image_url}
        url={`${baseUrl}/bees/${bee.slug}`}
        rarity={rarityInfo?.name || bee.rarity}
        color={colorInfo.name}
        abilities={bee.abilities}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Bees', url: `${baseUrl}/bees` },
          { name: bee.name, url: `${baseUrl}/bees/${bee.slug}` },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/bees">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Bee List
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              {/* Header with bee image */}
              <div
                className="p-8 flex flex-col md:flex-row items-center gap-6"
                style={{ backgroundColor: getRarityBgColor(bee.rarity) }}
              >
                <div className="w-32 h-32 flex items-center justify-center relative">
                  {bee.image_url ? (
                    <Image
                      src={bee.image_url}
                      alt={bee.name}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  ) : (
                    <span className="text-8xl">🐝</span>
                  )}
                </div>
                <div style={{ color: getRarityTextColor(bee.rarity) }}>
                  <h1 className="text-3xl font-bold mb-2">{bee.name}</h1>
                  <div className="flex gap-2 flex-wrap">
                    <Badge
                      className="text-sm"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        color: getRarityTextColor(bee.rarity),
                      }}
                    >
                      {rarityInfo?.name}
                    </Badge>
                    <Badge
                      className="text-sm"
                      style={{
                        backgroundColor: colorInfo.bg,
                        color: colorInfo.text,
                      }}
                    >
                      {colorInfo.name}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Description */}
                <p className="text-gray-700 text-lg mb-6">{bee.description}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <StatCard
                    icon={<Sword className="h-5 w-5 text-red-500" />}
                    label="Attack"
                    value={bee.attack}
                  />
                  <StatCard
                    icon={<Wind className="h-5 w-5 text-blue-500" />}
                    label="Speed"
                    value={bee.speed}
                  />
                  <StatCard
                    icon={<Zap className="h-5 w-5 text-yellow-500" />}
                    label="Energy"
                    value={bee.energy === 999999999 ? '∞' : bee.energy}
                  />
                  <StatCard
                    icon={<Sparkles className="h-5 w-5 text-green-500" />}
                    label="Gather"
                    value={bee.gather_amount}
                  />
                </div>

                {/* Abilities */}
                <div className="mb-6">
                  <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    Abilities
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {bee.abilities.map((ability, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">
                        {ability}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Gifted Ability */}
                {bee.gifted_ability && (
                  <div className="mb-6">
                    <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Gift className="h-5 w-5 text-purple-500" />
                      Gifted Ability
                    </h2>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-purple-800">{bee.gifted_ability}</p>
                    </div>
                  </div>
                )}

                {/* Obtain Method */}
                {bee.obtain_method && (
                  <div>
                    <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Package className="h-5 w-5 text-amber-500" />
                      How to Obtain
                    </h2>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-amber-800">{bee.obtain_method}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rarity</span>
                    <Badge style={{
                      backgroundColor: getRarityBgColor(bee.rarity),
                      color: getRarityTextColor(bee.rarity),
                    }}>
                      {rarityInfo?.name}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Color</span>
                    <Badge style={{
                      backgroundColor: colorInfo.bg,
                      color: colorInfo.text,
                    }}>
                      {colorInfo.name}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Attack</span>
                    <span className="font-bold">{bee.attack}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Speed</span>
                    <span className="font-bold">{bee.speed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Energy</span>
                    <span className="font-bold">{bee.energy === 999999999 ? '∞' : bee.energy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Gather Amount</span>
                    <span className="font-bold">{bee.gather_amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Abilities</span>
                    <span className="font-bold">{bee.abilities.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Bees */}
            {relatedBees.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Bees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {relatedBees.map((relBee) => (
                      <Link key={relBee.id} href={`/bees/${relBee.slug}`}>
                        <div
                          className="rounded-lg p-2 text-center hover:scale-105 transition-transform cursor-pointer"
                          style={{ backgroundColor: getRarityBgColor(relBee.rarity) }}
                        >
                          {relBee.image_url ? (
                            <div className="w-10 h-10 mx-auto relative">
                              <Image
                                src={relBee.image_url}
                                alt={relBee.name}
                                fill
                                className="object-contain"
                                sizes="40px"
                              />
                            </div>
                          ) : (
                            <span className="text-2xl">🐝</span>
                          )}
                          <div
                            className="text-[10px] font-medium mt-1 truncate"
                            style={{ color: getRarityTextColor(relBee.rarity) }}
                          >
                            {relBee.name}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommended Beequips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Beequips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recommendedBeequips.map((beequip) => (
                    <Link key={beequip.id} href={`/beequips/${beequip.slug}`}>
                      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                        {beequip.image_url ? (
                          <div className="w-8 h-8 relative flex-shrink-0">
                            <Image
                              src={beequip.image_url}
                              alt={beequip.name}
                              fill
                              className="object-contain"
                              sizes="32px"
                            />
                          </div>
                        ) : (
                          <span className="text-xl">🎒</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{beequip.name}</div>
                          <div className="text-xs text-gray-500">{beequip.base_value.toLocaleString()} value</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/values?tab=beequips" className="block mt-3">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Beequips
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/calculator">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Calculator className="h-4 w-4 text-blue-500" />
                    Trade Calculator
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
      </div>
    </div>
    </>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}
