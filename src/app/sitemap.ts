import { MetadataRoute } from 'next'
import { bees } from '@/data/bees'
import { stickers } from '@/data/stickers'
import { beequips } from '@/data/beequips'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://beeswarmsimulator.org'

  // Static pages
  const staticPages = [
    '',
    '/bees',
    '/values',
    '/calculator',
    '/hive-builder',
    '/codes',
    '/advisor',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Bee pages
  const beePages = bees.map((bee) => ({
    url: `${baseUrl}/bees/${bee.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Sticker pages
  const stickerPages = stickers.map((sticker) => ({
    url: `${baseUrl}/stickers/${sticker.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  // Beequip pages
  const beequipPages = beequips.map((beequip) => ({
    url: `${baseUrl}/beequips/${beequip.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...beePages, ...stickerPages, ...beequipPages]
}
