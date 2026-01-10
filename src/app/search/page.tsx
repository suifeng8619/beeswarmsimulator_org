import { Metadata } from 'next'
import Image from 'next/image'
import { Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { searchAll } from '@/lib/queries'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Force dynamic rendering for search page with query parameters
export const dynamic = 'force-dynamic'

type FilterType = 'all' | 'bees' | 'stickers' | 'beequips'

interface SearchPageProps {
  searchParams: Promise<{ q?: string; type?: FilterType }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams
  const query = params.q || ''
  const filterType = params.type || 'all'

  if (!query) {
    return {
      title: 'Search',
      description: 'Search for bees, stickers, and beequips in BSS Nexus.',
    }
  }

  const typeLabel = filterType === 'all' ? 'items' : filterType
  return {
    title: `Search: ${query}`,
    description: `Search results for "${query}" - Find ${typeLabel} in Bee Swarm Simulator.`,
    robots: { index: false }, // Don't index search result pages
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''
  const filterType = (params.type || 'all') as FilterType

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

  // Apply type filter
  const filteredResults = {
    bees: filterType === 'all' || filterType === 'bees' ? results.bees : [],
    stickers: filterType === 'all' || filterType === 'stickers' ? results.stickers : [],
    beequips: filterType === 'all' || filterType === 'beequips' ? results.beequips : [],
  }

  const totalResults = filteredResults.bees.length + filteredResults.stickers.length + filteredResults.beequips.length
  const allTotalResults = results.bees.length + results.stickers.length + results.beequips.length

  // Filter options with counts
  const filterOptions: { type: FilterType; label: string; count: number }[] = [
    { type: 'all', label: 'All', count: allTotalResults },
    { type: 'bees', label: 'Bees', count: results.bees.length },
    { type: 'stickers', label: 'Stickers', count: results.stickers.length },
    { type: 'beequips', label: 'Beequips', count: results.beequips.length },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Search Results for &quot;{query}&quot;
        </h1>
        <p className="text-muted-foreground">
          Found {totalResults} result{totalResults !== 1 ? 's' : ''}
          {filterType !== 'all' && ` in ${filterType}`}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Filter className="h-5 w-5 text-muted-foreground self-center mr-1" />
        {filterOptions.map((option) => (
          <Link
            key={option.type}
            href={`/search?q=${encodeURIComponent(query)}${option.type !== 'all' ? `&type=${option.type}` : ''}`}
          >
            <Button
              variant={filterType === option.type ? 'default' : 'outline'}
              size="sm"
              className={filterType === option.type ? 'bg-honey text-honey-foreground hover:bg-honey-dark' : ''}
            >
              {option.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {option.count}
              </Badge>
            </Button>
          </Link>
        ))}
      </div>

      {totalResults === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground">
              {filterType !== 'all'
                ? `No ${filterType} found for "${query}". Try removing the filter or adjusting your search.`
                : 'Try adjusting your search terms or browse our collections.'}
            </p>
            <div className="flex justify-center gap-4 mt-6">
              {filterType !== 'all' && (
                <Link href={`/search?q=${encodeURIComponent(query)}`} className="text-honey hover:underline">
                  Show All Results
                </Link>
              )}
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
          {filteredResults.bees.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">Bees</h2>
                <Badge variant="secondary">{filteredResults.bees.length}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredResults.bees.map((bee) => (
                  <Link key={bee.id} href={`/bees/${bee.slug}`}>
                    <Card className="hover:border-honey transition-colors h-full">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {bee.image_url ? (
                            <Image
                              src={bee.image_url}
                              alt={bee.name}
                              width={48}
                              height={48}
                              className="object-contain"
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
          {filteredResults.stickers.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">Stickers</h2>
                <Badge variant="secondary">{filteredResults.stickers.length}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredResults.stickers.map((sticker) => (
                  <Link key={sticker.id} href={`/stickers/${sticker.slug}`}>
                    <Card className="hover:border-honey transition-colors h-full">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {sticker.image_url ? (
                            <Image
                              src={sticker.image_url}
                              alt={sticker.name}
                              width={48}
                              height={48}
                              className="object-contain"
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
          {filteredResults.beequips.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">Beequips</h2>
                <Badge variant="secondary">{filteredResults.beequips.length}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredResults.beequips.map((beequip) => (
                  <Link key={beequip.id} href={`/beequips/${beequip.slug}`}>
                    <Card className="hover:border-honey transition-colors h-full">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {beequip.image_url ? (
                            <Image
                              src={beequip.image_url}
                              alt={beequip.name}
                              width={48}
                              height={48}
                              className="object-contain"
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
