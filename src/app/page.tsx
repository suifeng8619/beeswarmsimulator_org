import Link from 'next/link'
import { Search, Scale, Calculator, Grid3X3, Ticket, Bot, ArrowRight, TrendingUp, BookOpen, Zap, Star, HelpCircle, Sparkles, Target, Shield, Sword } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ItemCard } from '@/components/items/item-card'
import { CodeCard } from '@/components/items/code-card'
import { stickers, getTopValueStickers } from '@/data/stickers'
import { beequips } from '@/data/beequips'
import { getActiveCodes, getRecentCodes } from '@/data/codes'
import { bees, beeRarities } from '@/data/bees'

const tools = [
  {
    name: 'Bee Encyclopedia',
    description: 'Complete guide to all 46 bees with stats, abilities and tips',
    href: '/bees',
    icon: BookOpen,
    color: 'text-amber-400',
  },
  {
    name: 'Value List',
    description: 'Browse all stickers and beequips with live market values',
    href: '/values',
    icon: Scale,
    color: 'text-emerald-400',
  },
  {
    name: 'Trade Calculator',
    description: 'Calculate if a trade is fair, win, or lose',
    href: '/calculator',
    icon: Calculator,
    color: 'text-green-400',
  },
  {
    name: 'Hive Builder',
    description: 'Design and optimize your perfect 50-bee hive',
    href: '/hive-builder',
    icon: Grid3X3,
    color: 'text-orange-400',
  },
  {
    name: 'Active Codes',
    description: 'Get free rewards with the latest working codes',
    href: '/codes',
    icon: Ticket,
    color: 'text-honey',
  },
  {
    name: 'AI Trade Advisor',
    description: 'Get AI-powered trading advice and recommendations',
    href: '/advisor',
    icon: Bot,
    color: 'text-rose-400',
  },
]

// Game tips for beginners
const gameTips = [
  {
    icon: Target,
    title: 'Focus on Quests',
    description: 'Complete quests from NPCs to earn valuable rewards and progress faster.',
  },
  {
    icon: Sparkles,
    title: 'Collect Gifted Bees',
    description: 'Gifted bees provide unique hive bonuses. Use star treats wisely!',
  },
  {
    icon: Shield,
    title: 'Balance Your Hive',
    description: 'Mix red, blue, and white bees for a well-rounded pollen collection.',
  },
  {
    icon: Zap,
    title: 'Use Codes Regularly',
    description: 'Check for new codes often - they provide free boosts and items!',
  },
]

// FAQ items
const faqItems = [
  {
    question: 'How do I get Mythic Bees?',
    answer: 'Mythic bees can be obtained from Mythic Eggs, which are rare drops from certain quests and purchases.',
  },
  {
    question: 'What is the best bee for beginners?',
    answer: 'Tabby Bee and Photon Bee are excellent early event bees. For regular bees, focus on getting Gifted versions.',
  },
  {
    question: 'How do I calculate trade values?',
    answer: 'Use our Trade Calculator to compare item values. Always verify current market prices before trading.',
  },
  {
    question: 'What are Beequips?',
    answer: 'Beequips are equipment items that can be attached to bees to boost their stats and abilities.',
  },
]

export default function HomePage() {
  const topStickers = getTopValueStickers(6)
  const activeCodes = getRecentCodes(3)

  // Get featured bees (mythic and legendary)
  const featuredBees = bees.filter(b => b.rarity === 'mythic' || b.rarity === 'legendary').slice(0, 6)

  // Count bees by rarity
  const beeStats = {
    total: bees.length,
    mythic: bees.filter(b => b.rarity === 'mythic').length,
    legendary: bees.filter(b => b.rarity === 'legendary').length,
    epic: bees.filter(b => b.rarity === 'epic').length,
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-honey/10 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-honey/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-5xl">🐝</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your Ultimate{' '}
              <span className="text-honey">BSS</span>{' '}
              Companion
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              The most comprehensive Bee Swarm Simulator resource. Track values, calculate trades,
              explore all bees, build your perfect hive, and get AI-powered advice.
            </p>

            {/* Search Bar */}
            <form
              action="/search"
              method="GET"
              className="mt-10 flex items-center gap-2 max-w-lg mx-auto"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  name="q"
                  placeholder="Search stickers, beequips, bees..."
                  className="w-full pl-12 h-12 text-lg bg-card border-border focus-visible:ring-honey"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 px-6 bg-honey text-honey-foreground hover:bg-honey-dark"
              >
                Search
              </Button>
            </form>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
              <div className="text-center p-4 rounded-xl bg-card/50 border border-border">
                <div className="text-3xl font-bold text-honey">{beeStats.total}</div>
                <div className="text-sm text-muted-foreground">Total Bees</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card/50 border border-border">
                <div className="text-3xl font-bold text-honey">{stickers.length}</div>
                <div className="text-sm text-muted-foreground">Stickers</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card/50 border border-border">
                <div className="text-3xl font-bold text-honey">{beequips.length}</div>
                <div className="text-sm text-muted-foreground">Beequips</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card/50 border border-border">
                <div className="text-3xl font-bold text-honey">{getActiveCodes().length}</div>
                <div className="text-sm text-muted-foreground">Active Codes</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card/50 border border-border col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-honey">6</div>
                <div className="text-sm text-muted-foreground">Powerful Tools</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Powerful Tools for Traders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <Link key={tool.name} href={tool.href}>
                <Card className="h-full transition-all hover:border-honey/50 hover:shadow-lg hover:shadow-honey/10 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`${tool.color} mb-4`}>
                      <tool.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-honey transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Items Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-honey" />
              <h2 className="text-2xl md:text-3xl font-bold">Top Value Stickers</h2>
            </div>
            <Button asChild variant="ghost" className="text-honey hover:text-honey-dark">
              <Link href="/values">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topStickers.map((sticker) => (
              <ItemCard key={sticker.id} item={sticker} type="sticker" />
            ))}
          </div>
        </div>
      </section>

      {/* Beequips Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Beequips</h2>
            <Button asChild variant="ghost" className="text-honey hover:text-honey-dark">
              <Link href="/values?tab=beequips">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {beequips.slice(0, 6).map((beequip) => (
              <ItemCard key={beequip.id} item={beequip} type="beequip" />
            ))}
          </div>
        </div>
      </section>

      {/* Active Codes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Ticket className="h-6 w-6 text-honey" />
              <h2 className="text-2xl md:text-3xl font-bold">Latest Codes</h2>
            </div>
            <Button asChild variant="ghost" className="text-honey hover:text-honey-dark">
              <Link href="/codes">
                All Codes <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCodes.map((code) => (
              <CodeCard key={code.id} code={code} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bees Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-honey" />
              <h2 className="text-2xl md:text-3xl font-bold">Featured Bees</h2>
            </div>
            <Button asChild variant="ghost" className="text-honey hover:text-honey-dark">
              <Link href="/bees">
                All Bees <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredBees.map((bee) => (
              <Link key={bee.id} href={`/bees/${bee.slug}`}>
                <Card className="h-full transition-all hover:border-honey/50 hover:shadow-lg hover:shadow-honey/10 cursor-pointer group overflow-hidden">
                  <div
                    className="p-4 text-center"
                    style={{
                      backgroundColor: bee.rarity === 'mythic' ? '#FFB6C1' : '#40E0D0'
                    }}
                  >
                    {bee.image_url ? (
                      <img
                        src={bee.image_url}
                        alt={bee.name}
                        className="w-16 h-16 mx-auto object-contain"
                      />
                    ) : (
                      <span className="text-4xl">🐝</span>
                    )}
                  </div>
                  <CardContent className="p-3 text-center">
                    <h3 className="font-semibold text-sm group-hover:text-honey transition-colors line-clamp-1">
                      {bee.name}
                    </h3>
                    <p className="text-xs text-muted-foreground capitalize mt-1">
                      {bee.rarity}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Game Tips Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Tips for New Players</h2>
            <p className="text-muted-foreground">Essential strategies to help you progress faster</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameTips.map((tip, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-honey/10 flex items-center justify-center mx-auto mb-4">
                    <tip.icon className="h-6 w-6 text-honey" />
                  </div>
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bee Rarity Breakdown */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Bee Rarity Breakdown</h2>
            <p className="text-muted-foreground">Discover all {beeStats.total} bees across different rarities</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(beeRarities).map(([key, { name }]) => {
              const count = bees.filter(b => b.rarity === key).length
              const colors: Record<string, string> = {
                common: '#CD7F32',
                rare: '#C0C0C0',
                epic: '#FCD34D',
                legendary: '#40E0D0',
                mythic: '#FFB6C1',
                event: '#90EE90',
              }
              return (
                <Link key={key} href={`/bees?rarity=${key}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div
                      className="p-4 text-center"
                      style={{ backgroundColor: colors[key] }}
                    >
                      <div className="text-3xl font-bold text-gray-900">{count}</div>
                      <div className="text-sm font-medium text-gray-800">{name}</div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <HelpCircle className="h-6 w-6 text-honey" />
              <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            <p className="text-muted-foreground">Quick answers to common BSS questions</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-start gap-2">
                    <span className="text-honey">Q:</span>
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground text-sm pl-5">
                    {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Trade Smarter?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of BSS players using our tools to make better trades every day.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-honey text-honey-foreground hover:bg-honey-dark"
            >
              <Link href="/calculator">Try Calculator</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/values">Browse Values</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
