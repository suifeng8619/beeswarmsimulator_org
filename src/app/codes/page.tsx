import { Ticket, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeCard } from '@/components/items/code-card'
import { codes, getActiveCodes, getExpiredCodes } from '@/data/codes'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Active Codes',
  description:
    'All working Bee Swarm Simulator codes. Get free honey, tickets, royal jelly, and more rewards!',
  keywords: [
    'BSS codes',
    'Bee Swarm Simulator codes',
    'free honey',
    'Roblox codes',
    'working codes 2024',
  ],
}

export default function CodesPage() {
  const activeCodes = getActiveCodes()
  const expiredCodes = getExpiredCodes()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Ticket className="h-8 w-8 text-honey" />
          <h1 className="text-3xl md:text-4xl font-bold">Active Codes</h1>
        </div>
        <p className="text-muted-foreground">
          Redeem these codes in-game for free rewards! Codes are case-sensitive.
        </p>
      </div>

      {/* How to Redeem */}
      <Card className="mb-8 border-honey/30 bg-honey/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-honey" />
            How to Redeem Codes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Launch Bee Swarm Simulator on Roblox</li>
            <li>Click the &quot;Codes&quot; button in the game menu (cog icon)</li>
            <li>Enter the code exactly as shown (case-sensitive)</li>
            <li>Click &quot;Redeem&quot; to claim your rewards!</li>
          </ol>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
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
      </div>

      {/* Codes Tabs */}
      <Tabs defaultValue="active">
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

      {/* Disclaimer */}
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          Codes are provided by Onett (game developer) and may expire at any time.
          We update this list regularly but cannot guarantee all codes work.
        </p>
      </div>
    </div>
  )
}
