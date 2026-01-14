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
  Gift,
  Sparkles,
  Cog,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Users,
  TestTube,
  Award,
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

        {/* Trading Status Banner */}
        <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="font-semibold text-green-500">Trading Fully Re-enabled</span>
            <span className="text-xs text-muted-foreground ml-2">as of January 6, 2026</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            After the December 19 player file rework, trading was limited to Hive Hub only. Full trading is now restored in all areas.
          </p>
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

        {/* Trading Rules from Official Discord */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-purple-500" />
              Official Trading Rules
            </CardTitle>
            <CardDescription>Rules from the official BSS Discord server</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-sm">What&apos;s NOT Allowed:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span><strong className="text-foreground">No real-world trading</strong> - Never trade in-game items for real money</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span><strong className="text-foreground">No cross-trading</strong> - BSS items only, no trading for items from other games</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span><strong className="text-foreground">No value lists (Rule 8)</strong> - Official Discord prohibits posting value lists</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sm">Important Info:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span><strong className="text-foreground">2-minute cooldown</strong> - Shared across all trade channels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span><strong className="text-foreground">@Quest Hotshot role required</strong> - Needed to access trade channels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span>Join the{' '}
                      <a href="https://www.roblox.com/groups/3982592/Bee-Swarm-Simulator" target="_blank" rel="noopener noreferrer" className="text-honey hover:underline">
                        official Roblox group
                      </a>{' '}for full access</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-500" />
                Safety Tips:
              </h4>
              <div className="grid md:grid-cols-3 gap-3 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-amber-500">⚠</span>
                  <span>Never click suspicious links</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500">⚠</span>
                  <span>Don&apos;t download any files</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500">⚠</span>
                  <span>Never scan QR codes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Hive Building */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Grid3X3 className="h-5 w-5 text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold">Hive Building Strategies</h2>
        </div>

        {/* Hive Size Debate */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>29 Bees vs 38 Bees</CardTitle>
            <CardDescription>Community discussion from #game-discussion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-semibold text-blue-400 mb-2">29 Bees Strategy</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">+</span>
                    <span>More focused hive bonuses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">+</span>
                    <span>Easier to manage bee abilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">+</span>
                    <span>Better for specialized color builds</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <h4 className="font-semibold text-purple-400 mb-2">38 Bees Strategy</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">+</span>
                    <span>More versatile for different fields</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">+</span>
                    <span>Can maintain more buffs simultaneously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">+</span>
                    <span>Better coverage with event bees</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong className="text-foreground">Community Insight:</strong> Both strategies work. Choose based on your playstyle: 29 for min-maxing, 38 for flexibility.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Color Specialization Guide
              </CardTitle>
              <CardDescription>Community-recommended progression path</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="font-semibold text-purple-400 mb-2">📍 Community Consensus:</p>
                  <p className="text-xs"><strong>Keep a diverse "bomb" hive until you get SSA (Supreme Star Amulet)</strong>. Only commit to a color specialization AFTER obtaining SSA.</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Early Game (Before SSA):</p>
                  <p className="text-xs"><strong className="text-blue-400">Blue is the best choice</strong> - Most efficient for early pollen collection and field coverage. Maintain diversity across all colors for maximum flexibility.</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Color Options (After SSA):</p>
                  <ul className="space-y-2 text-xs">
                    <li><strong className="text-red-400">Red Hive:</strong> High attack, excellent for mob farming and combat-focused fields</li>
                    <li><strong className="text-blue-400">Blue Hive:</strong> Superior pollen collection efficiency, ideal for field grinding</li>
                    <li><strong className="text-gray-300">White Hive:</strong> Balanced versatility, requires Gummy Baller (~50B honey investment)</li>
                  </ul>
                </div>

                <p className="text-xs text-amber-500"><strong>Note:</strong> Your final color choice should be based on your playstyle and available resources, not just meta recommendations.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Essential Bees to Keep</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>

        {/* Bee Positioning Tips */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Bee Positioning Tips</CardTitle>
            <CardDescription>Community-tested configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p className="font-semibold text-foreground">Tabby Bee Positioning</p>
                  <p>Place Tabby Bee in the middle row for optimal scratch coverage across your hive. This maximizes the scratch bonus spread.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p className="font-semibold text-foreground">Tadpole Bee Placement</p>
                  <p>Keep Tadpole near other water-affinity bees (like Bubble Bee) to stack moisture bonuses effectively.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p className="font-semibold text-foreground">Gifted Bee Priority</p>
                  <p>Always keep at least one gifted bee of each color for the permanent hive bonuses. Don&apos;t replace gifted bees unless you have a duplicate.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Button asChild>
              <Link href="/hive-builder">
                <Grid3X3 className="mr-2 h-4 w-4" />
                Plan Your Hive
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Equipment Guide */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Award className="h-5 w-5 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold">Equipment Guide</h2>
        </div>

        {/* Equipment Priority Path */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Equipment Upgrade Priority</CardTitle>
            <CardDescription>Community-recommended upgrade path from Discord discussions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p className="font-semibold text-foreground">Petal Wand → Petal Belt</p>
                  <p className="text-sm text-muted-foreground">Prioritize Petal Belt first for the significant passive bonuses. Petal Wand can wait.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p className="font-semibold text-foreground">Diamond Mask (Recommended)</p>
                  <p className="text-sm text-muted-foreground">Community consensus: Diamond Mask outperforms Gummy Mask even without macros. Better for active play.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p className="font-semibold text-foreground">Focus on Beequips</p>
                  <p className="text-sm text-muted-foreground">Beequips provide massive Hive Bonuses. Match your hive color for maximum efficiency.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Diamond Mask vs Gummy Mask</CardTitle>
              <CardDescription>Community recommendation from #game-discussion</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="font-semibold text-blue-400 mb-1">Diamond Mask Recommended</p>
                <p className="text-xs">Players report Diamond Mask outperforms Gummy Mask even without macro usage</p>
              </div>
              <p>The Diamond Mask provides better overall performance for most playstyles, especially for active players.</p>
              <p className="text-xs text-muted-foreground">Note: Gummy Mask may still be viable for specific strategies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Beequips Importance</CardTitle>
              <CardDescription>Significant honey boost via Hive Bonuses</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p><strong className="text-foreground">Beequips provide major boosts</strong> to your honey production through Hive Bonuses system.</p>
              <div className="mt-3 p-3 rounded-lg bg-secondary/50">
                <p className="text-xs font-mono text-honey">Example Impact:</p>
                <p className="text-xs mt-1">Good beequips can multiply your honey rate significantly when combined with proper amulets</p>
              </div>
              <p className="text-xs">Focus on beequips that match your hive color for maximum efficiency</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SSA (Supreme Star Amulet)</CardTitle>
              <CardDescription>Game-changing endgame item</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="font-semibold text-purple-400 mb-1">4x Earnings Increase</p>
                <p className="text-xs">Community reports show SSA can quadruple your honey production</p>
              </div>
              <p>The Supreme Star Amulet is one of the most impactful items in the game. It represents a major milestone in your progression.</p>

              <div>
                <p className="font-semibold text-foreground mb-2">Strategic Importance:</p>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Before SSA:</strong> Keep your hive diverse with all colors for maximum versatility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>After SSA:</strong> Choose your color specialization (Red/Blue/White) for focused optimization</span>
                  </li>
                </ul>
              </div>

              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs text-amber-400"><strong>Acquisition Tips:</strong> Focus on Star Jelly collection, complete Star Journey quests, and save for Star Treats. Many players report 2-4 weeks of dedicated farming to obtain SSA.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reference Values */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Reference Values & Stats</CardTitle>
            <CardDescription>Community-reported benchmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-sm">Shower Permanent Passive:</h4>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Zap className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-mono text-honey">1.25x Capacity Bonus</p>
                    <p className="text-xs text-muted-foreground">Permanent boost from Shower ability</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sm">Level 11 Hive Example:</h4>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-2">With good amulets + beequips:</p>
                  <p className="font-mono text-lg text-honey">~50B/hour</p>
                  <p className="text-xs text-muted-foreground mt-1">Production rate varies by playstyle and field</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Beesmas 2025 */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <Gift className="h-5 w-5 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold">Beesmas 2025</h2>
        </div>

        {/* Timeline Banner */}
        <Card className="mb-6 border-red-500/30 bg-red-500/5">
          <CardContent className="py-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Update Timeline
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
              <div className="bg-background/50 rounded p-2">
                <div className="font-mono text-honey">Dec 19</div>
                <div className="text-muted-foreground">Player File Rework</div>
              </div>
              <div className="bg-background/50 rounded p-2">
                <div className="font-mono text-honey">Dec 24</div>
                <div className="text-muted-foreground">Offline Voucher Added</div>
              </div>
              <div className="bg-background/50 rounded p-2">
                <div className="font-mono text-honey">Dec 26</div>
                <div className="text-muted-foreground">Soft Launch</div>
              </div>
              <div className="bg-background/50 rounded p-2">
                <div className="font-mono text-honey">Dec 28</div>
                <div className="text-muted-foreground">Bee Bear Quest Fixes</div>
              </div>
              <div className="bg-background/50 rounded p-2">
                <div className="font-mono text-honey">v588-v589</div>
                <div className="text-muted-foreground">Bug Fixes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Offline Voucher</CardTitle>
              <CardDescription>New feature from 14th Gift Box</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Allows offline progress accumulation for up to 24 hours:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Planters continue growing</li>
                <li>Blender keeps processing</li>
                <li>Gingerbread House produces items</li>
              </ul>

              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 mt-3">
                <p className="font-semibold text-blue-400 mb-1 text-xs">🔄 Refresh Cycle:</p>
                <p className="text-xs">Free Offline Voucher refreshes every <strong>24 hours</strong> in Gift Box 14. Can also be purchased from the shop for 2 Gingerbread Bears.</p>
              </div>

              <div className="p-2 rounded bg-green-500/10 border border-green-500/20 mt-2">
                <p className="text-xs"><strong className="text-green-400">How It Works:</strong> Activate the voucher, then go offline. When you return (within 24 hours), your Planters and Blender will have progressed as if you were playing!</p>
              </div>

              <p className="text-xs text-amber-500"><strong>Pro Tip:</strong> Activate before long offline sessions. Community reports getting planters + blender progress overnight!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>New Features</CardTitle>
              <CardDescription>Soft launched December 26, 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Decoration Quests</strong> - New seasonal quest line</p>
              <p><strong className="text-foreground">Gift Boxes</strong> - Daily rewards including Offline Voucher</p>
              <p><strong className="text-foreground">Blooms</strong> - New field mechanic</p>
              <p><strong className="text-foreground">Catalog</strong> - Browse seasonal items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quest Requirements</CardTitle>
              <CardDescription>Unlock prerequisites</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Spirit Bear&apos;s Beesmas Quest</p>
                <p className="text-xs">Complete Spirit Bear&apos;s first normal quest</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Honey Bee&apos;s Beesmas Quest</p>
                <p className="text-xs">Complete Black Bear&apos;s Beesmas Quest + Own Honey Mask</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sticker System */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-pink-500" />
          </div>
          <h2 className="text-2xl font-bold">Sticker System</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Stickers</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Hidden Stickers:</strong> Found stuck to surfaces around the map</p>
              <ul className="list-disc list-inside text-xs space-y-1 mt-2">
                <li>0 bees = 1 sticker spawns</li>
                <li>40 bees = 7 stickers spawn</li>
                <li>Max 7 on map at once</li>
                <li>Despawn after 1 week</li>
              </ul>
              <p className="mt-3"><strong className="text-foreground">Sticker Sprouts:</strong> Spawn every 3 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Using Stickers</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>Three options for each sticker:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Apply to hive</strong> - Cosmetic only, no stat bonus</li>
                <li><strong>Trade</strong> - Exchange with other players</li>
                <li><strong>Submit to Sticker Stack</strong> - Get permanent boosts</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sticker Stack</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Base Boosts:</strong></p>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>+20% Convert Rate</li>
                <li>+10% Capacity</li>
                <li>+5% Pollen</li>
              </ul>
              <p className="mt-2 text-xs">Each sticker type can only be submitted once. Stack Boosts accumulate. Duration builds from 15 min to 1 hour max.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Tips */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold">Advanced Tips</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Mutation Farming Guide</CardTitle>
              <CardDescription>Efficient ways to get mutated bees</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p><strong className="text-foreground">Best Methods (Community-tested):</strong></p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">1.</span>
                  <div>
                    <strong className="text-foreground">Royal Jelly Method</strong>
                    <p>Use Royal Jelly on low-rarity bees for higher mutation chance</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">2.</span>
                  <div>
                    <strong className="text-foreground">Star Jelly Strategy</strong>
                    <p>Save Star Jellies for event bees - they have unique mutations worth keeping</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">3.</span>
                  <div>
                    <strong className="text-foreground">Beesmas Gift Method</strong>
                    <p>During Beesmas, gift boxes can drop special mutation items</p>
                  </div>
                </li>
              </ul>
              <div className="mt-3 p-2 rounded bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs text-amber-400"><strong>Tip:</strong> Don&apos;t waste rare jellies on common bees. Focus on gifted + mutated combos for event bees.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stick Bug Quest Strategy</CardTitle>
              <CardDescription>Community tips for this challenging quest</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-semibold text-red-400 mb-1">Community Consensus:</p>
                <p className="text-xs">Many players find Stick Bug quest extremely difficult. Don&apos;t feel bad if you struggle!</p>
              </div>
              <p><strong className="text-foreground">Tips from #game-help:</strong></p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Bring friends or use private server for easier spawns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Use high-attack bees (Vicious, Lion, etc.) for faster kills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Stock up on healing items before attempting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Learn the attack patterns to dodge effectively</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Q&A */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Users className="h-5 w-5 text-cyan-500" />
          </div>
          <h2 className="text-2xl font-bold">Community Q&amp;A</h2>
        </div>

        <p className="text-muted-foreground mb-6">
          Hot topics and frequently asked questions from the official BSS Discord community (updated January 14, 2026).
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>How do I get a Mythic Bee?</CardTitle>
              <CardDescription>Acquisition methods and probabilities</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="font-semibold text-purple-400 mb-1">📊 Official Probability:</p>
                <p className="text-xs font-mono text-honey text-lg">1 in 25,000</p>
                <p className="text-xs mt-1">Applies to both Royal Jelly and Star Eggs</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Acquisition Methods:</p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">1.</span>
                    <div>
                      <strong className="text-foreground">Royal Jelly</strong>
                      <p>Use on any bee slot. Very low chance but costs less</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">2.</span>
                    <div>
                      <strong className="text-foreground">Star Eggs</strong>
                      <p>Same 1/25,000 odds. More expensive but provides Star Treats as consolation</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">3.</span>
                    <div>
                      <strong className="text-foreground">Mythic Egg (Guaranteed)</strong>
                      <p>Complete the egg hunt or obtain from special events</p>
                    </div>
                  </li>
                </ul>
              </div>

              <p className="text-xs text-amber-500"><strong>Community Tip:</strong> Don&apos;t burn all your resources chasing Mythics. Focus on progression and they&apos;ll come naturally over time.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Is Windy Bee grinding worth it?</CardTitle>
              <CardDescription>Community perspectives from #game-help</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p className="font-semibold text-foreground mb-2">Short Answer: Depends on your stage</p>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-semibold text-green-400 mb-1 text-xs">✓ Worth it if:</p>
                  <ul className="text-xs space-y-1">
                    <li>• You&apos;re in mid-late game (lvl 12+)</li>
                    <li>• You have good field coverage</li>
                    <li>• You need cloud vials for quests</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="font-semibold text-red-400 mb-1 text-xs">✗ Not worth if:</p>
                  <ul className="text-xs space-y-1">
                    <li>• You&apos;re early game (focus on bees first)</li>
                    <li>• You have limited cloud vials</li>
                    <li>• Other progression paths are more urgent</li>
                  </ul>
                </div>
              </div>

              <p className="text-xs"><strong>Community Consensus:</strong> Windy Bee is a long-term investment. The tornado ability is useful but not game-changing compared to SSA or proper hive configuration.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What defines &quot;late game&quot;?</CardTitle>
              <CardDescription>Community benchmarks</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="font-semibold text-amber-400 mb-2">Community Standard:</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span><strong>Level 17+ Hive</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span><strong>Dark Scythe</strong> (unlocked from Spirit Bear)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span><strong>Coco Belt</strong> (requires Coconut Field access)</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2 text-xs">Optional but Common:</p>
                <ul className="space-y-1 text-xs">
                  <li>• SSA (Supreme Star Amulet)</li>
                  <li>• Petal Belt and matching Petal Wand</li>
                  <li>• Gummy Boots or better</li>
                  <li>• Diamond/Demon Mask</li>
                  <li>• Full set of high-potential beequips</li>
                </ul>
              </div>

              <p className="text-xs text-muted-foreground">Most late game players have 40B+ honey and are working on endgame quests like Spirit Bear&apos;s final challenges.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Do Violet Blooms spawn naturally?</CardTitle>
              <CardDescription>Bloom mechanics clarification</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="font-semibold text-purple-400 mb-1">Yes, but rarely</p>
                <p className="text-xs">Violet Blooms can spawn naturally in Clover Field, but the spawn rate is very low.</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2 text-xs">Best Ways to Get Violet Blooms:</p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">1.</span>
                    <div>
                      <strong className="text-foreground">Field Dice</strong>
                      <p>Use in Clover Field for guaranteed Violet Bloom</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">2.</span>
                    <div>
                      <strong className="text-foreground">Nectar Boost</strong>
                      <p>Some nectar types increase bloom spawn rates</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">3.</span>
                    <div>
                      <strong className="text-foreground">Natural Spawn</strong>
                      <p>Wait and hope - very rare but possible</p>
                    </div>
                  </li>
                </ul>
              </div>

              <p className="text-xs text-amber-500"><strong>Tip:</strong> Save your Field Dice for when you really need specific blooms. Don&apos;t waste them on common blooms that spawn frequently.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Should I use Ginger Breads now?</CardTitle>
              <CardDescription>Hot topic from #game-discussion (Jan 2026)</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="font-semibold text-amber-400 mb-1">Community Split:</p>
                <p className="text-xs">Opinions vary on whether to use Ginger Breads immediately or save them for later</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Arguments for Using Now:</p>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Immediate stat boost helps current progression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>More Ginger Breads can be earned during Beesmas</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Arguments for Saving:</p>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">⏳</span>
                    <span>Limited-time item, may have future uses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">⏳</span>
                    <span>Wait for community to discover optimal strategies</span>
                  </li>
                </ul>
              </div>

              <p className="text-xs"><strong>Recommendation:</strong> Use some now if you need the boost, but keep a reserve for potential future updates.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amulet Keep or Replace?</CardTitle>
              <CardDescription>Hot topic from #game-help (Jan 2026)</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="font-semibold text-purple-400 mb-1">Common Question:</p>
                <p className="text-xs">Should I keep my current amulet or replace it?</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Key Factors to Consider:</p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">1.</span>
                    <div>
                      <strong className="text-foreground">Check Your Hive Color</strong>
                      <p>Match amulet bonuses to your hive specialization for maximum benefit</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">2.</span>
                    <div>
                      <strong className="text-foreground">Compare Total Stats</strong>
                      <p>Sometimes a lower-tier amulet with perfect stats beats a higher-tier with bad rolls</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">3.</span>
                    <div>
                      <strong className="text-foreground">Star Saw vs Pop Star</strong>
                      <p>Star Saw for attack builds, Pop Star for pollen-focused builds. Neither is universally better</p>
                    </div>
                  </li>
                </ul>
              </div>

              <p className="text-xs text-amber-500"><strong>Tip:</strong> Screenshot your current amulet before rolling. You cannot get it back once replaced!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best way to get Royal Jelly?</CardTitle>
              <CardDescription>Frequently asked in #game-help</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div>
                <p className="font-semibold text-foreground mb-2">Top Methods (Early-Mid Game):</p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">1.</span>
                    <div>
                      <strong className="text-foreground">Sprouts</strong>
                      <p>Pop sprouts in any field - guaranteed RJ drops</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">2.</span>
                    <div>
                      <strong className="text-foreground">Royal Jelly Shop</strong>
                      <p>Buy directly with honey (becomes more affordable as you progress)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">3.</span>
                    <div>
                      <strong className="text-foreground">Mob Drops</strong>
                      <p>Kill mobs like Ladybugs, Rhino Beetles for occasional RJ</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">4.</span>
                    <div>
                      <strong className="text-foreground">Quest Rewards</strong>
                      <p>Complete bear quests for bulk RJ rewards</p>
                    </div>
                  </li>
                </ul>
              </div>

              <p className="text-xs text-amber-500"><strong>Pro Tip:</strong> Moon sprouts and night memory matches are especially good for RJ farming.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Puffshroom Strategy?</CardTitle>
              <CardDescription>Hot topic from #game-help (Jan 14)</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="font-semibold text-green-400 mb-1">Community Consensus:</p>
                <p className="text-xs">Puffshrooms are one of the best ways to farm materials and honey in mid-late game.</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Optimal Strategy:</p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">1.</span>
                    <div>
                      <strong className="text-foreground">Use Planters Strategically</strong>
                      <p>Plant in fields with high mob spawn rates for combo bonuses</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">2.</span>
                    <div>
                      <strong className="text-foreground">Stack with Events</strong>
                      <p>Activate during x2 pollen events for maximum efficiency</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">3.</span>
                    <div>
                      <strong className="text-foreground">High-Level Bees Help</strong>
                      <p>Bring attack bees like Vicious and Lion for faster kills</p>
                    </div>
                  </li>
                </ul>
              </div>

              <p className="text-xs text-amber-500"><strong>Tip:</strong> Don&apos;t ignore small puffshrooms - they add up quickly!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backpack Capacity Tips</CardTitle>
              <CardDescription>Discussed in #game-ideas (Jan 14)</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="font-semibold text-blue-400 mb-1">Key Insight:</p>
                <p className="text-xs">Backpack capacity directly affects your farming efficiency. Higher capacity = fewer trips to hive.</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Upgrade Priority:</p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">1.</span>
                    <div>
                      <strong className="text-foreground">Port-O-Hive → Mondo Belt Bag</strong>
                      <p>The jump from Port-O-Hive to Mondo Belt Bag is game-changing</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">2.</span>
                    <div>
                      <strong className="text-foreground">Beequips with Capacity</strong>
                      <p>Look for beequips that boost capacity percentage</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">3.</span>
                    <div>
                      <strong className="text-foreground">Amulet Rolls</strong>
                      <p>Capacity bonuses on amulets are highly valued</p>
                    </div>
                  </li>
                </ul>
              </div>

              <p className="text-xs"><strong>Community Note:</strong> Some players suggest capacity is more important than convert rate in early-mid game.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Beesmas 2025 Event Tips</CardTitle>
              <CardDescription>Active discussion from #game-discussion (Jan 14)</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="font-semibold text-red-400 mb-1">Event Still Active!</p>
                <p className="text-xs">Beesmas 2025 is ongoing. Make sure to complete all quests before the event ends.</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Priority Checklist:</p>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Collect all Gift Boxes daily (especially #14 for Offline Voucher)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Complete Bee Bear quests for exclusive rewards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Participate in Blooms events for extra materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Check Catalog for limited-time items</span>
                  </li>
                </ul>
              </div>

              <p className="text-xs text-amber-500"><strong>Reminder:</strong> Gingerbread Bears offer expires February 28th!</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Game Mechanics */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
            <Cog className="h-5 w-5 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold">Game Mechanics</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-cyan-500" />
                Test Realm
              </CardTitle>
              <CardDescription>Official testing environment</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>Try out new features and updates before they go live in the main game.</p>
              <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-xs font-semibold text-cyan-400 mb-2">Access Test Realm:</p>
                <a
                  href="https://www.roblox.com/games/3719762683/Bee-Swarm-Simulator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-honey hover:underline text-xs block"
                >
                  → Open Test Realm Game
                </a>
              </div>
              <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
                <p className="text-xs"><strong className="text-green-400">Currently Testing:</strong> File saving improvements and trading system changes</p>
              </div>
              <ul className="text-xs space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Free private servers available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">!</span>
                  <span>Discord staff NOT affiliated with Test Realm</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Golden Cogmowers Schedule</CardTitle>
              <CardDescription>When they spawn in Robo Bear Challenge</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-3"><strong className="text-foreground">Spawn Rounds:</strong></p>
              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div className="bg-secondary/50 rounded p-2">3, 4, 6</div>
                <div className="bg-secondary/50 rounded p-2">12, 13, 16</div>
                <div className="bg-secondary/50 rounded p-2">21, 22, 23, 24</div>
              </div>
              <p className="text-xs"><strong className="text-red-400">NOT</strong> on Miniboss rounds: 5, 10, 15, 20, 25</p>
              <p className="text-xs"><strong className="text-red-400">NOT</strong> in 35 Bee Zone</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voucher Prices</CardTitle>
              <CardDescription>Reference for trading</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Bear Bee Voucher</span>
                  <span className="font-mono text-honey">800 honey</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cub Buddy Voucher</span>
                  <span className="font-mono text-honey">600 honey</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                <strong>Gingerbread Bears:</strong> Limited offer, expires February 28th
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Nectar Types</CardTitle>
              <CardDescription>All 5 types and their boosts</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="text-xs mb-2">All types give x1.01 - x1.05 Honey Per Pollen. Stack up to 24 hours.</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <strong className="text-cyan-400">Refreshing:</strong>
                  <span>Blue Convert, Red Pollen, Bee Ability Pollen</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <strong className="text-blue-400">Comforting:</strong>
                  <span>Blue Pollen, Convert At Hive, Colorless Convert</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <strong className="text-amber-400">Satisfying:</strong>
                  <span>Honey At Hive, Red Convert, White Pollen</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  <strong className="text-green-400">Motivating:</strong>
                  <span>Blue Pollen, Convert Rate, Bee Ability Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  <strong className="text-red-400">Invigorating:</strong>
                  <span>Red Pollen, Convert Rate, Bee Attack</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold">Troubleshooting</h2>
        </div>

        {/* Macro Issues - Hot Topic from Discord */}
        <Card className="mb-6 border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-red-500" />
              Macro Not Working / Pathing Issues
            </CardTitle>
            <CardDescription>Most common issues from #game-help</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="font-semibold text-amber-400 mb-2">⚠ Common Problems:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Macro stops working after update</li>
                  <li>• Character gets stuck or takes wrong path</li>
                  <li>• Macro doesn&apos;t respond to field changes</li>
                  <li>• Conversion timing issues</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Quick Fixes:</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">1.</span>
                    <div>
                      <p className="font-semibold text-foreground">Update Your Macro</p>
                      <p className="text-xs">Game updates often break old macro paths. Download the latest version from trusted sources.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">2.</span>
                    <div>
                      <p className="font-semibold text-foreground">Reset Character Position</p>
                      <p className="text-xs">If stuck, reset by dying or rejoining. Some macros need a specific starting position.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">3.</span>
                    <div>
                      <p className="font-semibold text-foreground">Check Hive Configuration</p>
                      <p className="text-xs">Some macros require specific bee positions or hive setups to work properly.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">4.</span>
                    <div>
                      <p className="font-semibold text-foreground">Verify Field Access</p>
                      <p className="text-xs">Make sure you have unlocked all required fields and items for the macro route.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-xs"><strong className="text-red-400">Important:</strong> Use macros at your own risk. Only download from trusted sources. The game developer does not officially support macros.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Lock Error</CardTitle>
              <CardDescription>Cannot rejoin after disconnecting</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>If you see &quot;session locked&quot; or &quot;PostLoadVersion error&quot; when trying to rejoin:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-foreground">Wait at least 5 minutes</strong> - The lock needs time to resolve</li>
                <li><strong className="text-foreground">Don&apos;t spam rejoin</strong> - This can extend the lock duration</li>
                <li><strong className="text-foreground">Try a different server</strong> - Join a new server version if available</li>
              </ul>
              <p className="text-xs text-amber-500 mt-3">Note: This is a known issue being actively fixed by the developer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Server Version Issues</CardTitle>
              <CardDescription>Old server problems and fixes</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>If you&apos;re on an older server version (below 574), you may experience:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-foreground">Bubbles not working</strong></li>
                <li><strong className="text-foreground">Blender losing progress</strong> when you leave</li>
                <li><strong className="text-foreground">Some quests not available</strong></li>
              </ul>
              <p className="text-xs text-green-500 mt-3">Solution: Join a newer server version (576+) or wait for automatic server update</p>
            </CardContent>
          </Card>

          <Card className="border-amber-500/30">
            <CardHeader>
              <CardTitle>Error 267 - Save Error / Session Locked</CardTitle>
              <CardDescription>Known issue since Beesmas 2025 update (from official Discord FAQ)</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="font-semibold text-amber-400 mb-2">What This Error Means:</p>
                <p className="text-xs">Your save file could not be saved properly, and the server kicked you to prevent further bugs and data corruption. This issue has been present since the Beesmas update.</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Solutions (from Onett via #game-news):</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">1.</span>
                    <div>
                      <strong className="text-foreground">Wait at least 5 minutes</strong>
                      <p className="text-xs">The issue often resolves itself after a short wait</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">2.</span>
                    <div>
                      <strong className="text-foreground">Use a fresh private server</strong>
                      <p className="text-xs">Create a new private server with no one else inside to ensure you have the newest server version</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">3.</span>
                    <div>
                      <strong className="text-foreground">Join Hive Hub Server first</strong>
                      <p className="text-xs">Some players report success by joining the Hive Hub and then returning to the main game</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs"><strong className="text-blue-400">Developer Note:</strong> Onett is aware of this issue. Discord moderators cannot help with in-game issues. If the problem persists after trying all solutions, it may be related to a previous file reset (potentially from exploitation).</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Not Working</CardTitle>
              <CardDescription>Why codes might fail to redeem</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-foreground">Case-sensitive</strong> - Enter codes exactly as shown</li>
                <li><strong className="text-foreground">Already used</strong> - Each code works only once per account</li>
                <li><strong className="text-foreground">Expired</strong> - Codes can expire without notice</li>
                <li><strong className="text-foreground">Group required</strong> - Some codes (like 15MMembers) need you to{' '}
                  <a href="https://www.roblox.com/groups/3982592/Bee-Swarm-Simulator" target="_blank" rel="noopener noreferrer" className="text-honey hover:underline">join the Roblox group</a> first
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
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
