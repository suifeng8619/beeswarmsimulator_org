import { Metadata } from 'next'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { searchAll } from '@/lib/queries'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Search for bees, stickers, and beequips in BSS Nexus.',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Search BSS Nexus</h1>
        <p className="text-muted-foreground">
          Enter a search term to find bees, stickers, and beequips.
        </p>
      </div>
    )
  }

  const results = await searchAll(query)
  const totalResults = results.bees.length + results.stickers.length + results.beequips.length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Search Results for &quot;{query}&quot;
        </h1>
        <p className="text-muted-foreground">
          Found {totalResults} result{totalResults !== 1 ? 's' : ''}
        </p>
      </div>

      {totalResults === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse our collections.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Link href="/bees" className="text-honey hover:underline">
                Browse Bees
              </Link>
              <Link href="/values" className="text-honey hover:underline">
                Browse Values
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Bees Section */}
          {results.bees.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">Bees</h2>
                <Badge variant="secondary">{results.bees.length}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.bees.map((bee) => (
                  <Link key={bee.id} href={`/bees/${bee.slug}`}>
                    <Card className="hover:border-honey transition-colors h-full">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {bee.image_url ? (
                            <img
                              src={bee.image_url}
                              alt={bee.name}
                              className="h-12 w-12 object-contain"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-secondary rounded-lg flex items-center justify-center">
                              <span className="text-2xl">🐝</span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">{bee.name}</h3>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="capitalize text-xs">
                                {bee.rarity}
                              </Badge>
                              <Badge variant="secondary" className="capitalize text-xs">
                                {bee.color}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Stickers Section */}
          {results.stickers.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">Stickers</h2>
                <Badge variant="secondary">{results.stickers.length}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.stickers.map((sticker) => (
                  <Link key={sticker.id} href={`/stickers/${sticker.slug}`}>
                    <Card className="hover:border-honey transition-colors h-full">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {sticker.image_url ? (
                            <img
                              src={sticker.image_url}
                              alt={sticker.name}
                              className="h-12 w-12 object-contain"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-secondary rounded-lg flex items-center justify-center">
                              <span className="text-2xl">🏷️</span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">{sticker.name}</h3>
                            <p className="text-sm text-honey font-semibold">
                              {(sticker.value ?? 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Beequips Section */}
          {results.beequips.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">Beequips</h2>
                <Badge variant="secondary">{results.beequips.length}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.beequips.map((beequip) => (
                  <Link key={beequip.id} href={`/beequips/${beequip.slug}`}>
                    <Card className="hover:border-honey transition-colors h-full">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {beequip.image_url ? (
                            <img
                              src={beequip.image_url}
                              alt={beequip.name}
                              className="h-12 w-12 object-contain"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-secondary rounded-lg flex items-center justify-center">
                              <span className="text-2xl">🎒</span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">{beequip.name}</h3>
                            <p className="text-sm text-honey font-semibold">
                              {(beequip.base_value ?? 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
