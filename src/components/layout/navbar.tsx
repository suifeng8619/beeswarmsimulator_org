'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Scale, Calculator, Grid3X3, Ticket, Bot, Search, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Bees', href: '/bees', icon: BookOpen },
  { name: 'Value List', href: '/values', icon: Scale },
  { name: 'Calculator', href: '/calculator', icon: Calculator },
  { name: 'Hive Builder', href: '/hive-builder', icon: Grid3X3 },
  { name: 'Codes', href: '/codes', icon: Ticket },
  { name: 'AI Advisor', href: '/advisor', icon: Bot },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl">🐝</span>
            </div>
            <span className="hidden font-bold text-lg sm:block">
              <span className="text-honey">BSS</span> Nexus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
                  'text-muted-foreground hover:text-foreground hover:bg-accent',
                  'transition-colors'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden lg:flex lg:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-9 bg-secondary/50 border-none focus-visible:ring-honey"
              />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 pt-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9"
                    />
                  </div>
                </form>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-3',
                        'text-muted-foreground hover:text-foreground hover:bg-accent',
                        'transition-colors'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="border-t pt-4">
                  <Button asChild className="w-full bg-honey text-honey-foreground hover:bg-honey-dark">
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Sign In */}
          <div className="hidden md:block">
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
