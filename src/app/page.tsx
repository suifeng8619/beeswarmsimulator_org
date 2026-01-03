import Link from 'next/link'
import { Search, Scale, Calculator, Grid3X3, Ticket, Bot, ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ItemCard } from '@/components/items/item-card'
import { CodeCard } from '@/components/items/code-card'
import { stickers, getTopValueStickers } from '@/data/stickers'
import { beequips } from '@/data/beequips'
import { getActiveCodes, getRecentCodes } from '@/data/codes'

const tools = [
  {
    name: 'Value List',
    description: 'Browse all stickers and beequips with live market values',
    href: '/values',
    icon: Scale,
    color: 'text-blue-400',
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
    color: 'text-purple-400',
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
    color: 'text-pink-400',
  },
]

export default function HomePage() {
  const topStickers = getTopValueStickers(6)
  const activeCodes = getRecentCodes(3)

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
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your Ultimate{' '}
              <span className="text-honey">BSS Trading</span>{' '}
              Companion
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Track item values, calculate fair trades, build the perfect hive, and get AI-powered
              trading advice for Bee Swarm Simulator.
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
            <div className="mt-12 flex items-center justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-honey">{stickers.length}</div>
                <div className="text-sm text-muted-foreground">Stickers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-honey">{beequips.length}</div>
                <div className="text-sm text-muted-foreground">Beequips</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-honey">{getActiveCodes().length}</div>
                <div className="text-sm text-muted-foreground">Active Codes</div>
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
