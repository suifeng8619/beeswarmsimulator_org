import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Zap, Sword, Wind, Sparkles, Gift, Star, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { bees, beeRarities, beeColors, getBeeBySlug } from '@/data/bees'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return bees.map((bee) => ({
    slug: bee.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const bee = getBeeBySlug(slug)
  if (!bee) return { title: 'Bee Not Found' }
  return {
    title: `${bee.name} - Bee Encyclopedia | BSS Nexus`,
    description: bee.description,
  }
}

export default async function BeeDetailPage({ params }: PageProps) {
  const { slug } = await params
  const bee = getBeeBySlug(slug)

  if (!bee) {
    notFound()
  }

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

  // Find related bees (same rarity or color)
  const relatedBees = bees
    .filter(b => b.id !== bee.id && (b.rarity === bee.rarity || b.color === bee.color))
    .slice(0, 6)

  return (
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
                <div className="w-32 h-32 flex items-center justify-center">
                  {bee.image_url ? (
                    <img
                      src={bee.image_url}
                      alt={bee.name}
                      className="w-full h-full object-contain"
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
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    Abilities
                  </h3>
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
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Gift className="h-5 w-5 text-purple-500" />
                      Gifted Ability
                    </h3>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-purple-800">{bee.gifted_ability}</p>
                    </div>
                  </div>
                )}

                {/* Obtain Method */}
                {bee.obtain_method && (
                  <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Package className="h-5 w-5 text-amber-500" />
                      How to Obtain
                    </h3>
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
                            <img
                              src={relBee.image_url}
                              alt={relBee.name}
                              className="w-10 h-10 mx-auto object-contain"
                            />
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
          </div>
        </div>
      </div>
    </div>
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
