'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  HelpCircle,
  Scale,
  Calculator,
  Grid3X3,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
  XCircle,
  MinusCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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

const usageTips = [
  {
    title: 'Be Specific',
    description: 'Include exact item names and quantities for accurate analysis.',
    example: '"Is 2x Festive Bee worth 1x Gummy Bee?" instead of "Is festive good?"',
  },
  {
    title: 'Ask for Comparisons',
    description: 'Compare multiple options to find the best trade.',
    example: '"Which is better: trading my Puppy Bee for Tabby Bee or for Photon Bee?"',
  },
  {
    title: 'Request Explanations',
    description: 'Ask why something is valued a certain way to learn market dynamics.',
    example: '"Why is Gummy Cub Skin more valuable than Diamond Cub Skin?"',
  },
]

const faqs = [
  {
    question: 'How does the AI advisor determine trade values?',
    answer:
      'The AI advisor uses our comprehensive value database, which is regularly updated based on community trading data, market trends, and item rarity. It compares the total value on each side of a trade to determine if it\'s fair.',
  },
  {
    question: 'Is the AI advice always accurate?',
    answer:
      'While our AI provides well-researched recommendations, values can fluctuate based on supply and demand. Always use the advice as a guide and verify with multiple sources before making important trades.',
  },
  {
    question: 'Can I ask about hive builds and strategies?',
    answer:
      'Yes! The advisor can help with general trading questions, item comparisons, and basic strategy advice. For detailed hive planning, we recommend using our Hive Builder tool.',
  },
  {
    question: 'How often is the value data updated?',
    answer:
      'Our value database is updated regularly to reflect current market conditions. Major updates happen weekly, with smaller adjustments made as needed.',
  },
]

export default function AdvisorClient() {
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
            'AI Trade Advisor is coming soon! This feature will provide personalized trading advice based on current market values and trends. In the meantime, you can use our Trade Calculator to compare item values manually.',
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
        <p className="text-muted-foreground max-w-xl mx-auto">
          Get AI-powered trading advice, value analysis, and personalized recommendations
          to make smarter trades in Bee Swarm Simulator.
        </p>
      </div>

      {/* Feature Overview */}
      <Card className="mb-6 border-honey/30 bg-honey/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Sparkles className="h-8 w-8 text-honey shrink-0" />
            <div>
              <h2 className="font-semibold text-lg mb-2">AI-Powered Trading Intelligence</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Our AI advisor analyzes market trends, compares trade values, and provides
                personalized recommendations. Ask any question about trading and get instant feedback!
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Trade Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Value Comparison</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Market Insights</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-honey" />
            Chat with Advisor
          </CardTitle>
          <CardDescription>
            Ask about trades, item values, or market trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <ScrollArea className="h-[350px] pr-4 mb-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <Bot className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h2 className="font-semibold text-lg mb-2">Ask me about trading!</h2>
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
              aria-label="Ask a question"
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

      {/* What You Can Analyze */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-honey" />
          What the AI Can Analyze
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="font-semibold">WIN Trades</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Identify trades where you&apos;re getting more value than you&apos;re giving. The AI calculates total worth on each side.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <MinusCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="font-semibold">FAIR Trades</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Balanced trades where both sides get roughly equal value. Good for getting items you want.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold">LOSE Trades</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Trades where you&apos;re losing value. The AI will warn you and suggest better alternatives.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Usage Tips */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-honey" />
          Tips for Best Results
        </h2>
        <div className="space-y-4">
          {usageTips.map((tip, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">{tip.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
                <div className="text-xs p-2 rounded bg-secondary">
                  <span className="text-muted-foreground">Example: </span>
                  <span className="text-foreground">{tip.example}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-honey" />
          Frequently Asked Questions
        </h2>
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

      {/* Related Tools */}
      <section>
        <h2 className="text-xl font-bold mb-4">Related Tools</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/values">
            <Card className="h-full hover:bg-secondary/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Scale className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">Value List</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Browse all item values
                </p>
                <span className="text-xs text-honey flex items-center gap-1">
                  View Values <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/calculator">
            <Card className="h-full hover:bg-secondary/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calculator className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Trade Calculator</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Calculate trade values
                </p>
                <span className="text-xs text-honey flex items-center gap-1">
                  Calculate <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/hive-builder">
            <Card className="h-full hover:bg-secondary/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Grid3X3 className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold">Hive Builder</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Plan your hive setup
                </p>
                <span className="text-xs text-honey flex items-center gap-1">
                  Build Hive <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  )
}
