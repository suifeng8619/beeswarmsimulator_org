import Link from 'next/link'
import { Ticket, Info, HelpCircle, Gift } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CodeCard } from '@/components/items/code-card'
import { fetchActiveCodes, fetchExpiredCodes } from '@/lib/queries'
import { RecommendedTools, recommendedToolsConfig } from '@/components/recommended-tools'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Active Codes',
  description:
    'All working Bee Swarm Simulator codes for 2026. Get free honey, tickets, royal jelly, boosts, and more rewards! Updated regularly.',
  keywords: [
    'BSS codes',
    'Bee Swarm Simulator codes',
    'free honey',
    'Roblox codes',
    'working codes 2026',
    'BSS free tickets',
    'bee swarm codes today',
  ],
  alternates: {
    canonical: 'https://beeswarmsimulator.org/codes',
  },
  openGraph: {
    title: 'All Working BSS Codes | Bee Swarm Simulator',
    description: 'Redeem free honey, tickets, royal jelly, and more with active codes!',
    url: 'https://beeswarmsimulator.org/codes',
  },
}

const rewardTypes = [
  { name: 'Honey', description: 'In-game currency for buying bees and upgrades', color: 'text-yellow-500' },
  { name: 'Tickets', description: 'Premium currency for event items and special bees', color: 'text-blue-500' },
  { name: 'Royal Jelly', description: 'Transform bees into random new bees', color: 'text-purple-500' },
  { name: 'Boosts', description: 'Temporary buffs for pollen, honey, or luck', color: 'text-green-500' },
  { name: 'Treats', description: 'Feed bees to level them up', color: 'text-orange-500' },
  { name: 'Gumdrops', description: 'Summon gummy sprouts and boost goo', color: 'text-pink-500' },
]

const faqs = [
  {
    question: 'Why is my code not working?',
    answer:
      'Codes are case-sensitive, so make sure you enter them exactly as shown. Also, codes can expire at any time without notice. If a code was working earlier but not now, it may have been deactivated by the developer.',
  },
  {
    question: 'How often are new codes released?',
    answer:
      'New codes are typically released during special events, game updates, milestone celebrations (like player count achievements), and holidays. Follow Onett on social media for announcements.',
  },
  {
    question: 'Can I use the same code twice?',
    answer:
      'No, each code can only be redeemed once per account. If you try to use a code you\'ve already redeemed, it will show an error message.',
  },
  {
    question: 'Where do I find the code input in-game?',
    answer:
      'Click the gear/cog icon in the top-right corner of your screen, then look for the "Codes" button. Enter your code in the text box and click "Redeem".',
  },
  {
    question: 'Are these codes safe to use?',
    answer:
      'Yes! All codes listed here are official codes released by Onett, the game developer. Never trust codes from unofficial sources or anyone asking for your Roblox password.',
  },
]

export default async function CodesPage() {
  const [activeCodes, expiredCodes] = await Promise.all([
    fetchActiveCodes(),
    fetchExpiredCodes(),
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Ticket className="h-8 w-8 text-honey" />
          <h1 className="text-3xl md:text-4xl font-bold">Active Codes</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Redeem these codes in-game for free rewards! Codes are case-sensitive and can expire at any time.
          We update this list regularly to bring you the latest working codes.
        </p>
      </div>

      {/* How to Redeem - Detailed */}
      <Card className="mb-8 border-honey/30 bg-honey/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-honey" />
            How to Redeem Codes
          </CardTitle>
          <CardDescription>Step-by-step guide to claim your free rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-honey mb-2">1</div>
              <p className="text-sm text-muted-foreground">Launch <strong>Bee Swarm Simulator</strong> on Roblox</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-honey mb-2">2</div>
              <p className="text-sm text-muted-foreground">Click the <strong>gear icon</strong> (Settings) in top-right</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-honey mb-2">3</div>
              <p className="text-sm text-muted-foreground">Click <strong>&quot;Codes&quot;</strong> button in the menu</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50">
              <div className="text-2xl font-bold text-honey mb-2">4</div>
              <p className="text-sm text-muted-foreground">Enter code <strong>exactly</strong> and click Redeem</p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              <strong>Pro Tip:</strong> Copy the code directly from this page to avoid typos. Codes are case-sensitive!
            </p>
          </div>
          <div className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              <strong>Note:</strong> Some codes (like 15MMembers) require you to join the official Roblox group first.{' '}
              <a
                href="https://www.roblox.com/groups/3982592/Bee-Swarm-Simulator"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Join the group here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-green-500">{activeCodes.length}</div>
            <div className="text-sm text-muted-foreground">Active Codes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-muted-foreground">{expiredCodes.length}</div>
            <div className="text-sm text-muted-foreground">Expired Codes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-honey">{activeCodes.length + expiredCodes.length}</div>
            <div className="text-sm text-muted-foreground">Total Tracked</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-500">Daily</div>
            <div className="text-sm text-muted-foreground">Update Frequency</div>
          </CardContent>
        </Card>
      </div>

      {/* Codes Tabs */}
      <Tabs defaultValue="active" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="active" className="gap-2">
            Active
            <Badge variant="secondary" className="bg-green-500/20 text-green-500">
              {activeCodes.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="expired" className="gap-2">
            Expired
            <Badge variant="secondary">{expiredCodes.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCodes.map((code) => (
              <CodeCard key={code.id} code={code} />
            ))}
          </div>
          {activeCodes.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No active codes available right now. Check back later!
            </div>
          )}
        </TabsContent>

        <TabsContent value="expired">
          <p className="text-sm text-muted-foreground mb-4">
            These codes are no longer working but are kept here for historical reference.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expiredCodes.map((code) => (
              <CodeCard key={code.id} code={code} />
            ))}
          </div>
          {expiredCodes.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No expired codes recorded.
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Reward Types Explanation */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="h-6 w-6 text-honey" />
          <h2 className="text-2xl font-bold">Code Rewards Explained</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {rewardTypes.map((reward) => (
            <Card key={reward.name}>
              <CardContent className="p-4">
                <h3 className={`font-semibold mb-1 ${reward.color}`}>{reward.name}</h3>
                <p className="text-sm text-muted-foreground">{reward.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-6 w-6 text-honey" />
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Recommended Tools - Optimized for conversion */}
      <RecommendedTools
        title="Got your codes? Try these next:"
        tools={recommendedToolsConfig.afterCodes}
      />

      {/* Disclaimer */}
      <div className="text-center text-sm text-muted-foreground border-t border-border pt-8">
        <p className="mb-2">
          Codes are provided by Onett (game developer) and may expire at any time without notice.
        </p>
        <p>
          We update this list regularly but cannot guarantee all codes work. If you find a broken code,
          it may have just expired.
        </p>
      </div>
    </div>
  )
}
