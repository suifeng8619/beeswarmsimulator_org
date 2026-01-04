import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  Scale,
  Calculator,
  Grid3X3,
  Ticket,
  Bot,
  ArrowRight,
  Lightbulb,
  Target,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Guides & Tips',
  description:
    'Complete guides for Bee Swarm Simulator - trading tips, hive building strategies, beginner guides, and pro tips to level up your game.',
  alternates: {
    canonical: 'https://beeswarmsimulator.org/guides',
  },
  openGraph: {
    title: 'BSS Guides & Tips | Bee Swarm Simulator',
    description: 'Master Bee Swarm Simulator with our comprehensive guides and trading tips.',
    url: 'https://beeswarmsimulator.org/guides',
  },
}

const toolCards = [
  {
    title: 'Value List',
    description: 'Check current market values for stickers and beequips',
    icon: Scale,
    href: '/values',
    color: 'text-green-500',
  },
  {
    title: 'Trade Calculator',
    description: 'Calculate fair trades and compare item values',
    icon: Calculator,
    href: '/calculator',
    color: 'text-blue-500',
  },
  {
    title: 'Hive Builder',
    description: 'Plan and optimize your hive configuration',
    icon: Grid3X3,
    href: '/hive-builder',
    color: 'text-purple-500',
  },
  {
    title: 'Active Codes',
    description: 'Get free rewards with the latest codes',
    icon: Ticket,
    href: '/codes',
    color: 'text-yellow-500',
  },
  {
    title: 'AI Advisor',
    description: 'Get personalized trading advice',
    icon: Bot,
    href: '/advisor',
    color: 'text-pink-500',
  },
  {
    title: 'Bee Encyclopedia',
    description: 'Learn about all bees and their abilities',
    icon: BookOpen,
    href: '/bees',
    color: 'text-orange-500',
  },
]

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Guides & Tips</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master Bee Swarm Simulator with our comprehensive guides. From beginner basics to advanced trading strategies.
        </p>
      </div>

      {/* Beginner Guide */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold">Beginner&apos;s Guide</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Essential tips for new players</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">1. Focus on quests first.</strong> Complete quests from bears
                to unlock new areas and earn rewards. Start with Black Bear and Brown Bear.
              </p>
              <p>
                <strong className="text-foreground">2. Don&apos;t rush to buy bees.</strong> Save your honey for
                important upgrades. Basic bees are fine for early game.
              </p>
              <p>
                <strong className="text-foreground">3. Use all your codes.</strong> Free rewards can give you a
                huge early boost. Check our <Link href="/codes" className="text-honey hover:underline">codes page</Link>.
              </p>
              <p>
                <strong className="text-foreground">4. Join the community.</strong> Trading and tips from
                experienced players can accelerate your progress.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Early Game Priorities</CardTitle>
              <CardDescription>What to focus on in your first week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Unlock all fields.</strong> More fields = more pollen variety
                and quest options.
              </p>
              <p>
                <strong className="text-foreground">Get 25 bees.</strong> This unlocks important game features
                and should be your first major goal.
              </p>
              <p>
                <strong className="text-foreground">Complete Spirit Bear quests.</strong> These provide excellent
                rewards and guide your progression.
              </p>
              <p>
                <strong className="text-foreground">Save tickets.</strong> Don&apos;t spend tickets randomly.
                Save for event bees or specific goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trading Guide */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold">Trading Tips</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Know Your Values
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                Always check current market values before trading. Prices change frequently based on supply and demand.
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/values">
                  Check Value List
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-500" />
                Calculate Trades
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                Use our calculator to compare total values on both sides of a trade. Aim for fair or slightly advantageous trades.
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/calculator">
                  Use Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                Avoid Scams
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3">
                Never trust &quot;too good to be true&quot; offers. Always verify values and trade through official in-game systems only.
              </p>
              <ul className="text-xs space-y-1">
                <li>- Verify items before confirming</li>
                <li>- Don&apos;t share account info</li>
                <li>- Use multiple value sources</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Hive Building */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Grid3X3 className="h-5 w-5 text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold">Hive Building Strategies</h2>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Color Specialization
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  As you progress, consider specializing in a color (Red, Blue, or White). This lets you stack
                  bonuses and become more efficient in specific fields.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li><strong className="text-red-400">Red Hive:</strong> High attack, good for fighting mobs</li>
                  <li><strong className="text-blue-400">Blue Hive:</strong> Efficient pollen collection</li>
                  <li><strong className="text-gray-300">White Hive:</strong> Balanced, good for all fields</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Essential Bees to Keep</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Some bees are valuable regardless of your hive color:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- <strong>Vicious Bee:</strong> Mob fighting</li>
                  <li>- <strong>Tabby Bee:</strong> Scratch stacking</li>
                  <li>- <strong>Photon Bee:</strong> Beamstorm ability</li>
                  <li>- <strong>Gummy Bee:</strong> Goo coverage</li>
                  <li>- <strong>Digital Bee:</strong> Map control</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <Button asChild>
                <Link href="/hive-builder">
                  <Grid3X3 className="mr-2 h-4 w-4" />
                  Plan Your Hive
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Links to Tools */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Our Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolCards.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full hover:bg-secondary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-lg bg-secondary flex items-center justify-center ${tool.color}`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
