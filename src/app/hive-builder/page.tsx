import type { Metadata } from 'next'
import HiveBuilderClient from './hive-builder-client'

export const metadata: Metadata = {
  title: 'Hive Builder',
  description: 'Plan and optimize your Bee Swarm Simulator hive. Build custom hives with 25 slots, calculate stats, and explore different bee combinations.',
  keywords: ['BSS hive builder', 'Bee Swarm Simulator hive', 'hive planner', 'bee combinations', 'hive optimizer'],
  alternates: {
    canonical: 'https://beeswarmsimulator.org/hive-builder',
  },
  openGraph: {
    title: 'Hive Builder | BSS Nexus',
    description: 'Plan and optimize your Bee Swarm Simulator hive. Build custom hives with 25 slots and calculate stats.',
    url: 'https://beeswarmsimulator.org/hive-builder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hive Builder | BSS Nexus',
    description: 'Plan and optimize your Bee Swarm Simulator hive.',
  },
}

export default function HiveBuilderPage() {
  return <HiveBuilderClient />
}
