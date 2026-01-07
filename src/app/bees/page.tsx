import type { Metadata } from 'next'
import BeesClient from './bees-client'
import { fetchBees } from '@/lib/queries'
import { ItemListJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'

// ISR: Bee data is stable, revalidate every 24 hours
export const revalidate = 86400

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
  const baseUrl = 'https://beeswarmsimulator.org'

  return (
    <>
      <ItemListJsonLd
        name="Bee Encyclopedia - All Bees in Bee Swarm Simulator"
        description="Complete guide to all bees in Bee Swarm Simulator with stats, abilities, and rarity information."
        items={bees.map((bee, index) => ({
          name: bee.name,
          url: `${baseUrl}/bees/${bee.slug}`,
          image: bee.image_url,
          position: index + 1,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Bees', url: `${baseUrl}/bees` },
        ]}
      />
      <BeesClient initialBees={bees} />
    </>
  )
}
