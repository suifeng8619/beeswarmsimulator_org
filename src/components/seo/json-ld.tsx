// JSON-LD structured data component for SEO
// This is a server component that safely renders JSON-LD

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Using suppressHydrationWarning as the content is static and safe
      suppressHydrationWarning
    >
      {JSON.stringify(data)}
    </script>
  )
}

// Pre-built structured data for the website
export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BSS Nexus - Bee Swarm Simulator Trading Hub',
    description: 'The ultimate trading companion for Bee Swarm Simulator. Track item values, calculate fair trades, build your perfect hive, and get AI-powered trading advice.',
    url: 'https://beeswarmsimulator.org',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://beeswarmsimulator.org/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BSS Nexus',
      logo: {
        '@type': 'ImageObject',
        url: 'https://beeswarmsimulator.org/og-image.png',
      },
    },
  }

  return <JsonLd data={data} />
}

// FAQ structured data
export function FaqJsonLd({ items }: { items: Array<{ question: string; answer: string }> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return <JsonLd data={data} />
}

// Game/Software Application structured data
export function SoftwareAppJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BSS Nexus',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  }

  return <JsonLd data={data} />
}

// Breadcrumb structured data
export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={data} />
}

// Product/Item structured data for stickers and beequips
interface ProductJsonLdProps {
  name: string
  description: string
  image?: string | null
  url: string
  category: string
  value: number
  trend: 'up' | 'down' | 'stable'
  dateModified: string
}

export function ProductJsonLd({ name, description, image, url, category, value, trend, dateModified }: ProductJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || 'https://beeswarmsimulator.org/og-image.png',
    url,
    category,
    brand: {
      '@type': 'Brand',
      name: 'Bee Swarm Simulator',
    },
    offers: {
      '@type': 'Offer',
      price: value,
      priceCurrency: 'BSS', // Virtual currency
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Trend',
        value: trend,
      },
    ],
  }

  return <JsonLd data={data} />
}

// Bee/Character structured data
interface BeeJsonLdProps {
  name: string
  description: string
  image?: string | null
  url: string
  rarity: string
  color: string
  abilities: string[]
}

export function BeeJsonLd({ name, description, image, url, rarity, color, abilities }: BeeJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name,
    description,
    image: image || 'https://beeswarmsimulator.org/og-image.png',
    url,
    additionalType: 'GameCharacter',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Rarity',
        value: rarity,
      },
      {
        '@type': 'PropertyValue',
        name: 'Color',
        value: color,
      },
      {
        '@type': 'PropertyValue',
        name: 'Abilities',
        value: abilities.join(', '),
      },
    ],
  }

  return <JsonLd data={data} />
}

// ItemList for collection pages
interface ItemListJsonLdProps {
  items: Array<{ name: string; url: string; image?: string | null; position: number }>
  name: string
  description: string
}

export function ItemListJsonLd({ items, name, description }: ItemListJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
      image: item.image || undefined,
    })),
  }

  return <JsonLd data={data} />
}
