import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Search, Scale, Calculator, Grid3X3, Ticket, Bot, ArrowRight, TrendingUp, BookOpen, Zap, Star, HelpCircle, Sparkles, Target, Shield, Sword, Crown, Map, Users, Award, Clock, Gift, Flame, Droplets, Sun, Heart, ChevronRight, CheckCircle, AlertCircle, Lightbulb, Trophy, Gem, Leaf, Megaphone, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ItemCard } from '@/components/items/item-card'
import { CodeCard } from '@/components/items/code-card'
import { stickers, getTopValueStickers } from '@/data/stickers'
import { beequips } from '@/data/beequips'
import { getActiveCodes, getRecentCodes } from '@/data/codes'
import { bees, beeRarities } from '@/data/bees'
import { WebsiteJsonLd, FaqJsonLd, SoftwareAppJsonLd } from '@/components/seo/json-ld'

// ISR: Homepage shows trending data, revalidate every 4 hours
export const revalidate = 14400

// Page-specific metadata with JSON-LD
export const metadata: Metadata = {
  title: 'BSS Nexus - Bee Swarm Simulator Trading Hub | Values, Calculator, Hive Builder',
  description: 'The ultimate Bee Swarm Simulator companion. Track sticker & beequip values, calculate fair trades, build your perfect hive with 46 bees, and get AI-powered trading advice.',
  keywords: ['Bee Swarm Simulator', 'BSS', 'trading', 'value list', 'trade calculator', 'hive builder', 'Roblox', 'stickers', 'beequips', 'codes'],
  alternates: {
    canonical: 'https://beeswarmsimulator.org',
  },
  other: {
    'application-name': 'BSS Nexus',
  },
}

const tools = [
  {
    name: 'Bee Encyclopedia',
    description: 'Complete Bee Swarm Simulator guide to all 46 bees with stats and abilities',
    href: '/bees',
    icon: BookOpen,
    color: 'text-amber-400',
  },
  {
    name: 'Value List',
    description: 'Browse Bee Swarm Simulator stickers and beequips with market values',
    href: '/values',
    icon: Scale,
    color: 'text-emerald-400',
  },
  {
    name: 'Trade Calculator',
    description: 'Calculate if your Bee Swarm Simulator trade is fair or not',
    href: '/calculator',
    icon: Calculator,
    color: 'text-green-400',
  },
  {
    name: 'Hive Builder',
    description: 'Design your perfect Bee Swarm Simulator 50-bee hive',
    href: '/hive-builder',
    icon: Grid3X3,
    color: 'text-orange-400',
  },
  {
    name: 'Active Codes',
    description: 'Get free Bee Swarm Simulator rewards with working codes',
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
    title: 'Gifted Carpenter Bee',
    description: 'Gifted Carpenter Bee now gives x1.25 multiplicative bonus - prioritize getting it gifted!',
  },
  {
    icon: Shield,
    title: 'Balance Your Hive',
    description: 'Mix red, blue, and white bees for a well-rounded pollen collection.',
  },
  {
    icon: Zap,
    title: 'Use Petal Shurikens',
    description: 'Petal Shurikens now spawn Petals when hitting Blooms - great for petal farming!',
  },
]

// Advanced trading tips
const tradingTips = [
  {
    icon: TrendingUp,
    title: 'Know Market Trends',
    description: 'Values fluctuate based on demand. Track prices over time before trading.',
  },
  {
    icon: Scale,
    title: 'Fair Trade First',
    description: 'Build reputation with fair trades. Overpaying sometimes leads to better deals later.',
  },
  {
    icon: AlertCircle,
    title: 'Verify Before Trading',
    description: 'Always double-check item names and values. Scammers use similar-looking items.',
  },
  {
    icon: Gem,
    title: 'Invest in Rarities',
    description: 'Limited event items tend to increase in value. Consider long-term investments.',
  },
]

// Bear NPCs guide
const bearNPCs = [
  {
    name: 'Black Bear',
    description: 'Main questline giver. Complete his quests for steady progression.',
    difficulty: 'Beginner',
    color: '#374151',
  },
  {
    name: 'Brown Bear',
    description: 'Repeatable quests for treats, eggs, and royal jelly.',
    difficulty: 'Beginner',
    color: '#92400E',
  },
  {
    name: 'Mother Bear',
    description: 'Rewards Gifted Basic Bee and valuable treats.',
    difficulty: 'Intermediate',
    color: '#F472B6',
  },
  {
    name: 'Polar Bear',
    description: 'Food-themed quests with great beequip rewards.',
    difficulty: 'Intermediate',
    color: '#E5E7EB',
  },
  {
    name: 'Science Bear',
    description: 'Complex quests rewarding translator and equipment.',
    difficulty: 'Advanced',
    color: '#3B82F6',
  },
  {
    name: 'Spirit Bear',
    description: 'Endgame quests with the best rewards in the game.',
    difficulty: 'Expert',
    color: '#A78BFA',
  },
]

// Field zones guide
const fieldZones = [
  {
    name: 'Starter Fields',
    fields: ['Sunflower', 'Dandelion', 'Mushroom', 'Blue Flower', 'Clover'],
    description: 'Best for beginners. Easy access, no requirements.',
    icon: Leaf,
    color: 'text-green-400',
  },
  {
    name: 'Intermediate Fields',
    fields: ['Spider', 'Bamboo', 'Strawberry', 'Pineapple', 'Cactus'],
    description: 'Requires some progression. Better pollen rates.',
    icon: Target,
    color: 'text-amber-400',
  },
  {
    name: 'Advanced Fields',
    fields: ['Rose', 'Pine Tree', 'Pumpkin', 'Mountain Top', 'Coconut'],
    description: 'Endgame fields with highest rewards.',
    icon: Crown,
    color: 'text-rose-400',
  },
]

// Color type guide
const colorTypes = [
  {
    name: 'Red Bees',
    color: '#EF4444',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    description: 'Boost red pollen collection. Great for strawberry and rose fields.',
    examples: ['Rage Bee', 'Riley Bee', 'Demon Bee', 'Spicy Bee'],
    bonus: '+50% Red Pollen',
  },
  {
    name: 'Blue Bees',
    color: '#3B82F6',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    description: 'Boost blue pollen collection. Ideal for blue flower and pine tree.',
    examples: ['Bubble Bee', 'Bucko Bee', 'Diamond Bee', 'Tadpole Bee'],
    bonus: '+50% Blue Pollen',
  },
  {
    name: 'White Bees',
    color: '#9CA3AF',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    description: 'Versatile bees that work well in all fields. Support abilities.',
    examples: ['Basic Bee', 'Gifted Bee', 'Photon Bee', 'Windy Bee'],
    bonus: 'Balanced Stats',
  },
]

// Progression roadmap
const progressionSteps = [
  {
    stage: 'Beginner',
    icon: Leaf,
    color: 'text-green-400',
    goals: ['Collect 25 bees', 'Unlock all starter areas', 'Complete Black Bear quests'],
    tips: 'Focus on royal jelly to get more bees. Save tickets for event bees.',
  },
  {
    stage: 'Intermediate',
    icon: Target,
    color: 'text-amber-400',
    goals: ['Collect 35 bees', 'Get first event bee', 'Unlock Red/Blue HQ'],
    tips: 'Start specializing in a color. Work on Polar Bear quests for beequips.',
  },
  {
    stage: 'Advanced',
    icon: Crown,
    color: 'text-rose-400',
    goals: ['Collect 45 bees', 'Get mythic bees', 'Complete Spirit Bear quests'],
    tips: 'Focus on gifted bees and hive bonuses. Optimize your hive composition.',
  },
  {
    stage: 'Endgame',
    icon: Trophy,
    color: 'text-honey',
    goals: ['Max all bees', 'Complete all quests', 'Master all fields'],
    tips: 'Perfect your macro setup. Trade for rare collectibles.',
  },
]

// FAQ items - expanded
const faqItems = [
  {
    question: 'How do I get Mythic Bees?',
    answer: 'Mythic bees can be obtained from Mythic Eggs, which are rare drops from certain quests and purchases. You can also get them from specific quest rewards.',
  },
  {
    question: 'What is the best bee for beginners?',
    answer: 'Tabby Bee and Photon Bee are excellent early event bees. For regular bees, focus on getting Gifted versions of Basic Bee, Brave Bee, and Hasty Bee.',
  },
  {
    question: 'How do I calculate trade values?',
    answer: 'Use our Trade Calculator to compare item values. Always verify current market prices before trading. Values are based on community consensus and market activity.',
  },
  {
    question: 'What are Beequips?',
    answer: 'Beequips are equipment items that can be attached to bees to boost their stats and abilities. They come in different rarities and can significantly improve bee performance.',
  },
  {
    question: 'How do I get Gifted Bees?',
    answer: 'Feed bees Star Treats for a guaranteed gifted transformation, or use Sunflower Seeds, Strawberries, Blueberries, and Pineapples for a small chance. Gifted Basic Bee requires completing Mother Bear quests.',
  },
  {
    question: 'What is the best hive composition?',
    answer: 'It depends on your playstyle. Mixed hives are good for beginners. Endgame players often specialize in red, blue, or white hives with specific synergies. Use our Hive Builder to experiment!',
  },
  {
    question: 'How often are codes released?',
    answer: 'Onett releases codes during special events, milestones, and updates. Check our codes page regularly - we update it as soon as new codes are discovered.',
  },
  {
    question: 'What should I spend tickets on?',
    answer: 'Priority order: Event Bees (Tabby, Photon, Gummy) > Mythic Eggs > Star Treats. Avoid spending on basic bees you can get from royal jelly.',
  },
]

// Quick links for navigation
const quickLinks = [
  { name: 'All Bees', href: '/bees', icon: BookOpen },
  { name: 'Sticker Values', href: '/values', icon: TrendingUp },
  { name: 'Beequip Guide', href: '/values?tab=beequips', icon: Gift },
  { name: 'Trade Calculator', href: '/calculator', icon: Calculator },
  { name: 'Hive Builder', href: '/hive-builder', icon: Grid3X3 },
  { name: 'Active Codes', href: '/codes', icon: Ticket },
]

// Latest game updates from official Discord (January 2026)
const latestUpdates = [
  {
    type: 'fix',
    title: 'Permanent Buffs Being Restored',
    description: 'Some permanent buffs were accidentally removed. Onett is working on restoring them - may take a few days. Galentines Shrine is also not working yet.',
    date: 'Jan 26, 2026',
  },
  {
    type: 'new',
    title: 'New Code: DiscordMillion',
    description: 'Celebrate 1 Million Discord members! Get x2 Honeyday buff (48h), Mondo Chick Blessing x10, Marshmallow Bee & Pink Balloon. Expires Jan 31!',
    date: 'Jan 19, 2026',
  },
  {
    type: 'buff',
    title: 'Petal Shurikens Buff',
    description: 'Petal Shurikens now spawn Petals when hitting Blooms, making them more valuable for petal farming strategies.',
    date: 'Jan 17, 2026',
  },
  {
    type: 'new',
    title: 'Star Stickers in Catalog',
    description: 'Star stickers are now available in the Catalog for 10,000 Snowflakes each during the winter event.',
    date: 'Jan 17, 2026',
  },
  {
    type: 'change',
    title: 'Carpenter Bee Rework',
    description: 'Gifted Carpenter Bee hive bonus changed from +25% additive to x1.25 multiplicative - a significant buff!',
    date: 'Jan 17, 2026',
  },
  {
    type: 'fix',
    title: 'Tools Pollen Fix',
    description: 'Fixed a bug where pollen from tools multiplier was being applied twice. Honey rates may feel lower but are now correct.',
    date: 'Jan 17, 2026',
  },
  {
    type: 'new',
    title: 'New Bee Bear Quests',
    description: '5 new Bee Bear quests added, plus the 16th Dapper Bear quest is now available for endgame players.',
    date: 'Jan 17, 2026',
  },
]

// Stats for credibility
const siteStats = [
  { label: 'Daily Users', value: '10K+' },
  { label: 'Trades Calculated', value: '500K+' },
  { label: 'Items Tracked', value: '350+' },
  { label: 'Codes Found', value: '50+' },
]

export default function HomePage() {
  const topStickers = getTopValueStickers(6)
  const activeCodes = getRecentCodes(3)

  // Get featured bees (mythic and legendary)
  const featuredBees = bees.filter(b => b.rarity === 'mythic' || b.rarity === 'legendary').slice(0, 6)

  // Get gifted bees showcase
  const giftedShowcase = bees.filter(b => b.rarity === 'event' || b.rarity === 'mythic').slice(0, 4)

  // Count bees by rarity
  const beeStats = {
    total: bees.length,
    mythic: bees.filter(b => b.rarity === 'mythic').length,
    legendary: bees.filter(b => b.rarity === 'legendary').length,
    epic: bees.filter(b => b.rarity === 'epic').length,
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <WebsiteJsonLd />
      <SoftwareAppJsonLd />
      <FaqJsonLd items={faqItems} />

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
              className="mt-10 flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto"
            >
              <div className="relative flex-1 w-full">
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
                className="h-12 px-6 bg-honey text-honey-foreground hover:bg-honey-dark w-full sm:w-auto"
              >
                Search
              </Button>
            </form>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              <div className="text-center p-3 md:p-4 rounded-xl bg-card/50 border border-border">
                <div className="text-2xl md:text-3xl font-bold text-honey">{beeStats.total}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Total Bees</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-xl bg-card/50 border border-border">
                <div className="text-2xl md:text-3xl font-bold text-honey">{stickers.length}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Stickers</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-xl bg-card/50 border border-border">
                <div className="text-2xl md:text-3xl font-bold text-honey">{beequips.length}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Beequips</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-xl bg-card/50 border border-border">
                <div className="text-2xl md:text-3xl font-bold text-honey">{getActiveCodes().length}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Active Codes</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-xl bg-card/50 border border-border col-span-2 md:col-span-1">
                <div className="text-2xl md:text-3xl font-bold text-honey">6</div>
                <div className="text-xs md:text-sm text-muted-foreground">Powerful Tools</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Bar */}
      <section className="py-4 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {quickLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-honey">
                  <link.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{link.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-12 bg-gradient-to-b from-honey/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Megaphone className="h-6 w-6 text-honey" />
              <h2 className="text-2xl md:text-3xl font-bold">Latest Game Updates</h2>
            </div>
            <Badge variant="outline" className="text-honey border-honey/50">
              Jan 2026
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestUpdates.map((update, index) => {
              const typeStyles: Record<string, { bg: string; text: string; icon: string }> = {
                buff: { bg: 'bg-green-500/10', text: 'text-green-500', icon: 'arrow-up' },
                new: { bg: 'bg-blue-500/10', text: 'text-blue-500', icon: 'plus' },
                change: { bg: 'bg-amber-500/10', text: 'text-amber-500', icon: 'refresh' },
                fix: { bg: 'bg-purple-500/10', text: 'text-purple-500', icon: 'wrench' },
              }
              const style = typeStyles[update.type] || typeStyles.new
              return (
                <Card key={index} className={`${style.bg} border-none`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className={`${style.text} text-xs uppercase`}>
                        {update.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{update.date}</span>
                    </div>
                    <h3 className="font-semibold mb-1">{update.title}</h3>
                    <p className="text-sm text-muted-foreground">{update.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="mt-6 text-center">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/guides">
                View All Tips & Guides <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
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
                      <Image
                        src={bee.image_url}
                        alt={bee.name}
                        width={64}
                        height={64}
                        className="mx-auto object-contain"
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

      {/* Color Type Guide */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Bee Color Types</h2>
            <p className="text-muted-foreground">Understanding red, blue, and white bee synergies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {colorTypes.map((type) => (
              <Card key={type.name} className={`${type.bgColor} ${type.borderColor} border`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                    <h3 className="font-bold text-lg">{type.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {type.bonus}
                    </Badge>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {type.examples.map((bee) => (
                        <Badge key={bee} variant="secondary" className="text-xs">
                          {bee}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Game Tips Section */}
      <section className="py-16 bg-card/50">
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

      {/* Trading Tips Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Scale className="h-6 w-6 text-honey" />
              <h2 className="text-2xl md:text-3xl font-bold">Smart Trading Tips</h2>
            </div>
            <p className="text-muted-foreground">Master the art of trading in BSS</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tradingTips.map((tip, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <tip.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bear NPCs Guide */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Users className="h-6 w-6 text-honey" />
              <h2 className="text-2xl md:text-3xl font-bold">Bear NPC Guide</h2>
            </div>
            <p className="text-muted-foreground">Know your quest givers and their rewards</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bearNPCs.map((bear) => (
              <Card key={bear.name} className="overflow-hidden">
                <div
                  className="h-2"
                  style={{ backgroundColor: bear.color }}
                />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{bear.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {bear.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{bear.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Field Zones Guide */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Map className="h-6 w-6 text-honey" />
              <h2 className="text-2xl md:text-3xl font-bold">Field Guide</h2>
            </div>
            <p className="text-muted-foreground">Know where to farm at every stage</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fieldZones.map((zone) => (
              <Card key={zone.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <zone.icon className={`h-5 w-5 ${zone.color}`} />
                    {zone.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{zone.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {zone.fields.map((field) => (
                      <Badge key={field} variant="secondary" className="text-xs">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Progression Roadmap */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Trophy className="h-6 w-6 text-honey" />
              <h2 className="text-2xl md:text-3xl font-bold">Progression Roadmap</h2>
            </div>
            <p className="text-muted-foreground">Your journey from beginner to endgame</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {progressionSteps.map((step, index) => (
              <Card key={step.stage} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-honey/50 to-honey" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-honey/10 flex items-center justify-center">
                      <step.icon className={`h-4 w-4 ${step.color}`} />
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs">Stage {index + 1}</Badge>
                      <h3 className="font-semibold">{step.stage}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {step.goals.map((goal, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-honey mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{goal}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">{step.tips}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bee Rarity Breakdown */}
      <section className="py-16">
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

      {/* Site Stats */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Trusted by the Community</h2>
            <p className="text-muted-foreground">Join thousands of BSS players using our tools</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {siteStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-honey mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-honey text-honey-foreground hover:bg-honey-dark w-full sm:w-auto"
            >
              <Link href="/calculator">Try Calculator</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/values">Browse Values</Link>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
