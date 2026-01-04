import type { Metadata } from 'next'
import ValuesClient from './values-client'

export const metadata: Metadata = {
  title: 'Value List',
  description: 'Complete value list for all Bee Swarm Simulator stickers and beequips. Check current market prices, trends, and trading values.',
  keywords: ['BSS value list', 'sticker values', 'beequip values', 'Bee Swarm Simulator prices', 'trading values'],
  alternates: {
    canonical: 'https://beeswarmsimulator.org/values',
  },
  openGraph: {
    title: 'Value List | BSS Nexus',
    description: 'Complete value list for all Bee Swarm Simulator stickers and beequips. Check current market prices and trends.',
    url: 'https://beeswarmsimulator.org/values',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Value List | BSS Nexus',
    description: 'Complete value list for all BSS stickers and beequips.',
  },
}

export default function ValuesPage() {
  return <ValuesClient />
}
