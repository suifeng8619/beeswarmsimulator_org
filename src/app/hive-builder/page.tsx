import type { Metadata } from 'next'
import { Suspense } from 'react'
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

// Loading skeleton for the hive builder
function HiveBuilderSkeleton() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #B8860B 0%, #8B7355 50%, #6B5344 100%)' }}>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-4xl">🐝</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">Hive Builder</h1>
          </div>
          <p className="text-sm lg:text-base text-yellow-100/80">Loading...</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="h-[500px] bg-yellow-900/40 rounded-lg animate-pulse" />
          <div className="h-[500px] bg-yellow-900/40 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default function HiveBuilderPage() {
  return (
    <Suspense fallback={<HiveBuilderSkeleton />}>
      <HiveBuilderClient />
    </Suspense>
  )
}
