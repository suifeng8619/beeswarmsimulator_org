import type { Metadata } from 'next'
import CalculatorClient from './calculator-client'

export const metadata: Metadata = {
  title: 'Trade Calculator',
  description: 'Calculate the value of your Bee Swarm Simulator trades. Compare stickers and beequips to see if a trade is fair, a win, or a loss.',
  keywords: ['BSS trade calculator', 'Bee Swarm Simulator trading', 'sticker values', 'beequip values', 'fair trade calculator'],
  alternates: {
    canonical: 'https://beeswarmsimulator.org/calculator',
  },
  openGraph: {
    title: 'Trade Calculator | BSS Nexus',
    description: 'Calculate the value of your Bee Swarm Simulator trades. Compare stickers and beequips to see if a trade is fair.',
    url: 'https://beeswarmsimulator.org/calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trade Calculator | BSS Nexus',
    description: 'Calculate the value of your Bee Swarm Simulator trades.',
  },
}

export default function CalculatorPage() {
  return <CalculatorClient />
}
