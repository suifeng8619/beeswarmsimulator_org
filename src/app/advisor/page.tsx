import type { Metadata } from 'next'
import AdvisorClient from './advisor-client'

export const metadata: Metadata = {
  title: 'AI Trade Advisor',
  description: 'Get AI-powered trading advice for Bee Swarm Simulator. Analyze trades, get investment tips, and track market trends.',
  keywords: ['BSS trade advisor', 'AI trading', 'Bee Swarm Simulator trading tips', 'trade analysis'],
  alternates: {
    canonical: 'https://beeswarmsimulator.org/advisor',
  },
  openGraph: {
    title: 'AI Trade Advisor | BSS Nexus',
    description: 'Get AI-powered trading advice for Bee Swarm Simulator. Analyze trades and get investment tips.',
    url: 'https://beeswarmsimulator.org/advisor',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Trade Advisor | BSS Nexus',
    description: 'Get AI-powered trading advice for Bee Swarm Simulator.',
  },
}

export default function AdvisorPage() {
  return <AdvisorClient />
}
