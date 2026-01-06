import type { Metadata } from 'next'
import BeesClient from './bees-client'
import { fetchBees } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Bee Encyclopedia',
  description: 'Complete guide to all bees in Bee Swarm Simulator. Browse all 46 bees with stats, abilities, rarities, and colors.',
  keywords: ['BSS bees', 'Bee Swarm Simulator bees', 'bee guide', 'bee stats', 'mythic bees', 'event bees'],
  alternates: {
    canonical: 'https://beeswarmsimulator.org/bees',
  },
  openGraph: {
    title: 'Bee Encyclopedia | BSS Nexus',
    description: 'Complete guide to all bees in Bee Swarm Simulator. Browse all 46 bees with stats and abilities.',
    url: 'https://beeswarmsimulator.org/bees',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bee Encyclopedia | BSS Nexus',
    description: 'Complete guide to all bees in Bee Swarm Simulator.',
  },
}

export default async function BeesPage() {
  const bees = await fetchBees()
  return <BeesClient initialBees={bees} />
}
