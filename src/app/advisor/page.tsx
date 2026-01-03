'use client'

import { useState } from 'react'
import { Bot, Send, Loader2, Sparkles, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const exampleQuestions = [
  'Is Gummy Cub Skin worth 2 Diamond Hive Skins?',
  'What are the best beequips for a blue hive?',
  'Should I trade my Festive Bee for Puppy Bee?',
  'What items are increasing in value right now?',
]

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate AI response (placeholder)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'AI Trade Advisor is coming soon! This feature will provide personalized trading advice based on current market values and trends. Stay tuned for updates.',
        },
      ])
      setIsLoading(false)
    }, 1500)
  }

  const handleExampleClick = (question: string) => {
    setInput(question)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Bot className="h-8 w-8 text-honey" />
          <h1 className="text-3xl md:text-4xl font-bold">AI Trade Advisor</h1>
          <Badge variant="secondary" className="bg-honey/20 text-honey">
            Coming Soon
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Get AI-powered trading advice, value analysis, and recommendations.
        </p>
      </div>

      {/* Info Banner */}
      <Card className="mb-6 border-honey/30 bg-honey/5">
        <CardContent className="p-4 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-honey shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="text-foreground">AI-Powered Trading Intelligence</strong>
            <p className="text-muted-foreground mt-1">
              Our AI advisor will analyze market trends, compare trade values, and provide
              personalized recommendations. The AI model is being configured and will be available
              soon.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-honey" />
            Chat with Advisor
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <ScrollArea className="h-[400px] pr-4 mb-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <Bot className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Ask me about trading!</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  I can help you evaluate trades, suggest items to invest in, and answer questions
                  about Bee Swarm Simulator trading.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {exampleQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleExampleClick(question)}
                      className="text-xs"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className="h-8 w-8 rounded-full bg-honey/20 flex items-center justify-center shrink-0">
                        <Bot className="h-5 w-5 text-honey" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg px-4 py-2',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <span className="text-xs text-primary-foreground font-medium">You</span>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-honey/20 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-honey" />
                    </div>
                    <div className="bg-secondary rounded-lg px-4 py-2">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a trade or item..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Features Coming */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-semibold mb-1">Trade Analysis</h3>
            <p className="text-xs text-muted-foreground">
              Instant WIN/LOSE/FAIR analysis with detailed breakdown
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="font-semibold mb-1">Investment Tips</h3>
            <p className="text-xs text-muted-foreground">
              Recommendations on items likely to increase in value
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-1">Market Trends</h3>
            <p className="text-xs text-muted-foreground">
              Real-time insights on price movements and trends
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
