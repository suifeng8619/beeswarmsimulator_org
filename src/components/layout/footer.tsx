import Link from 'next/link'

const footerLinks = {
  tools: [
    { name: 'Value List', href: '/values' },
    { name: 'Trade Calculator', href: '/calculator' },
    { name: 'Hive Builder', href: '/hive-builder' },
    { name: 'Active Codes', href: '/codes' },
    { name: 'AI Advisor', href: '/advisor' },
  ],
  resources: [
    { name: 'Stickers', href: '/values?tab=stickers' },
    { name: 'Beequips', href: '/values?tab=beequips' },
    { name: 'Bees', href: '/bees' },
    { name: 'Guides', href: '/guides' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl">🐝</span>
              </div>
              <span className="font-bold text-lg">
                <span className="text-honey">BSS</span> Nexus
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              The ultimate trading companion for Bee Swarm Simulator. Track values, calculate trades, and build the perfect hive.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Tools</h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-honey transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-honey transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-honey transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} BSS Nexus. Not affiliated with Roblox or Onett.
            </p>
            <p className="text-xs text-muted-foreground">
              Bee Swarm Simulator is a trademark of Onett. All game content belongs to their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
