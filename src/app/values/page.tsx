import type { Metadata } from 'next'
import ValuesClient from './values-client'
import { fetchStickers, fetchBeequips } from '@/lib/queries'
import { ItemListJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'

// ISR: Value data changes frequently, revalidate every hour
export const revalidate = 3600

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

export default async function ValuesPage() {
  const [stickers, beequips] = await Promise.all([
    fetchStickers(),
    fetchBeequips(),
  ])
  const baseUrl = 'https://beeswarmsimulator.org'

  return (
    <>
      <ItemListJsonLd
        name="BSS Sticker Values"
        description="Complete value list for all Bee Swarm Simulator stickers with current market prices and trends."
        items={stickers.map((sticker, index) => ({
          name: sticker.name,
          url: `${baseUrl}/stickers/${sticker.slug}`,
          image: sticker.image_url,
          position: index + 1,
        }))}
      />
      <ItemListJsonLd
        name="BSS Beequip Values"
        description="Complete value list for all Bee Swarm Simulator beequips with base values and potential multipliers."
        items={beequips.map((beequip, index) => ({
          name: beequip.name,
          url: `${baseUrl}/beequips/${beequip.slug}`,
          image: beequip.image_url,
          position: index + 1,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Values', url: `${baseUrl}/values` },
        ]}
      />
      <ValuesClient initialStickers={stickers} initialBeequips={beequips} />
    </>
  )
}
