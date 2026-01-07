import { MetadataRoute } from 'next'
import { bees } from '@/data/bees'
import { stickers } from '@/data/stickers'
import { beequips } from '@/data/beequips'

// Site launch date as fallback for static pages
const SITE_LAUNCH_DATE = new Date('2025-01-01')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://beeswarmsimulator.org'

  // Get the most recent update date from stickers and beequips for dynamic pages
  const getLatestUpdateDate = () => {
    const dates: Date[] = []
    stickers.forEach(s => dates.push(new Date(s.updated_at)))
    beequips.forEach(b => dates.push(new Date(b.updated_at)))
    return dates.length > 0 ? new Date(Math.max(...dates.map(d => d.getTime()))) : SITE_LAUNCH_DATE
  }

  const latestUpdate = getLatestUpdateDate()

  // Static pages - use latest data update for value-related pages
  const staticPages = [
    { route: '', priority: 1, lastMod: latestUpdate },
    { route: '/bees', priority: 0.9, lastMod: SITE_LAUNCH_DATE },
    { route: '/values', priority: 0.9, lastMod: latestUpdate },
    { route: '/calculator', priority: 0.8, lastMod: latestUpdate },
    { route: '/hive-builder', priority: 0.8, lastMod: SITE_LAUNCH_DATE },
    { route: '/codes', priority: 0.8, lastMod: latestUpdate },
    { route: '/advisor', priority: 0.7, lastMod: SITE_LAUNCH_DATE },
  ].map(({ route, priority, lastMod }) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastMod,
    changeFrequency: 'daily' as const,
    priority,
  }))

  // Bee pages - static content, use site launch date
  const beePages = bees.map((bee) => ({
    url: `${baseUrl}/bees/${bee.slug}`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Sticker pages - use each item's updated_at
  const stickerPages = stickers.map((sticker) => ({
    url: `${baseUrl}/stickers/${sticker.slug}`,
    lastModified: new Date(sticker.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  // Beequip pages - use each item's updated_at
  const beequipPages = beequips.map((beequip) => ({
    url: `${baseUrl}/beequips/${beequip.slug}`,
    lastModified: new Date(beequip.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...beePages, ...stickerPages, ...beequipPages]
}
